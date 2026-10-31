export const SUPABASE_URL = 'https://yeijmqntdditskhptgbl.supabase.co';

export const SUPABASE_ANON_KEY = 'sb_publishable_PU19hw0CGh8nHlaa8NX8rg_VtNirLQU';

export const isSupabaseConfigured =
  SUPABASE_URL.startsWith('http') && SUPABASE_ANON_KEY.length > 20;
