import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { PropsWithChildren } from 'react';

import type { Session, User } from '@supabase/supabase-js';

import { supabase } from '../lib/supabase';

import { getMyProfile, type Profile } from '../services/profileService';

type AuthResult = { error: string | null };

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  initializing: boolean;
  profile: Profile | null;
  isAdmin: boolean;
  profileLoading: boolean;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {

  const [session, setSession] = useState<Session | null>(null);

  const [initializing, setInitializing] = useState(true);

  const [profile, setProfile] = useState<Profile | null>(null);

  const [profileLoading, setProfileLoading] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setInitializing(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  useEffect(() => {

    const userId = session?.user?.id;
    if (!userId) {
      setProfile(null);
      return;
    }

    let active = true;
    setProfileLoading(true);
    getMyProfile(userId)
      .then(p => {
        if (active) {
          if (!p) {
            supabase.auth.signOut();
            setSession(null);
            setProfile(null);
          } else {
            setProfile(p);
          }
        }
      })
      .catch(() => {
        if (active) {
          supabase.auth.signOut();
          setSession(null);
          setProfile(null);
        }
      })
      .finally(() => {
        if (active) setProfileLoading(false);
      });
    return () => {
      active = false;
    };
  }, [session?.user?.id]);
  useEffect(() => {

    const userId = session?.user?.id;
    if (!userId) return;

    let failCount = 0;

    const MAX_FAILS = 3;

    const heartbeat = setInterval(async () => {
      try {

        const p = await getMyProfile(userId);
        if (!p) {
          failCount++;
          if (failCount >= MAX_FAILS) {
            console.warn('Account deleted by Admin. Logging out...');
            await supabase.auth.signOut();
            setSession(null);
            setProfile(null);
          }
        } else {
          failCount = 0;
        }
      } catch {
        failCount++;
        if (failCount >= MAX_FAILS) {
          console.warn('Profile check failed repeatedly. Logging out...');
          await supabase.auth.signOut();
          setSession(null);
          setProfile(null);
        }
      }
    }, 4000);
    return () => clearInterval(heartbeat);
  }, [session?.user?.id]);

  const signUp = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {

      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });
      return { error: error?.message ?? null };
    },
    [],
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      return { error: error?.message ?? null };
    },
    [],
  );

  const signInWithGoogle = useCallback(async (): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  }, []);

  const value: AuthContextValue = {
    user: session?.user ?? null,
    session,
    initializing,
    profile,
    isAdmin: profile?.role === 'admin',
    profileLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {

  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside an <AuthProvider>');
  }
  return ctx;
}
