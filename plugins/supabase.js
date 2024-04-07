import { createClient } from '@supabase/supabase-js'

export default (context, inject) => {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    inject('supabase', supabase)
  }