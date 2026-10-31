import { createClient } from '@supabase/supabase-js';

import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  isSupabaseConfigured,
} from '../config/supabase';

const url = isSupabaseConfigured ? SUPABASE_URL : 'http://localhost:54321';

const key = isSupabaseConfigured ? SUPABASE_ANON_KEY : 'placeholder-anon-key';

export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, m => `\\${m}`);
}
