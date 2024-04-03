// middleware/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const createMiddlewareSupabaseClient = ({ req }) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    headers: {
      cookie: req.headers.cookie
    }
  })

  return supabase
}

export const supabase = createClient(supabaseUrl, supabaseKey)
