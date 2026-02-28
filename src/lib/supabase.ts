import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xryduyeyrpzyphlmsaza.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ItvM5xbitJWggLu4Y2q4Og_Md4uYJI5'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
