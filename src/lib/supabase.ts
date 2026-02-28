import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xryduyeyrpzyphlmsaza.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyeWR1eWV5cnB6eXBobG1zYXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNzI4NDQsImV4cCI6MjA4Nzg0ODg0NH0.FpjDFOGkUCjWx8VPW-dNs4Lp6D9Cibagj3T3pMheORU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
