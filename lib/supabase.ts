import { createClient } from '@supabase/supabase-js'

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabaseUrl = envUrl || 'https://placeholder.supabase.co'
const supabaseAnonKey = envKey || 'placeholder-key'

// true فقط إذا المفاتيح الحقيقية موجودة بـ Vercel. الصفحات تستخدمها حتى ما تحول المستخدم لـ placeholder.
export const isSupabaseConfigured = Boolean(envUrl && envKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

export default supabase
