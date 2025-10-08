import { createClient } from '@supabase/supabase-js'

// Supabase project URL and public anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// For now, use the main Supabase URL until custom domain is configured
export const customAuthDomain = supabaseUrl

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

// Create the main Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit'
  }
})

// Create a custom OAuth client (if using custom domain)
export const createCustomOAuthClient = () => {
  if (customAuthDomain && customAuthDomain !== supabaseUrl) {
    return createClient(customAuthDomain, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  }
  return supabase
}

export default supabase