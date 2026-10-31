import { supabase } from '../lib/supabase';

export type Role = 'user' | 'admin';

export type Profile = {
  id: string;
  email: string | null;
  role: Role;
  created_at: string;
};

export async function getMyProfile(userId: string): Promise<Profile | null> {

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Profile) ?? null;
}
