import { supabase } from '../services/supabase'

export async function getSession() {
  const { session } = await supabase.auth.getSession()

  if (!session) {
    return {
      isLoggedIn: false
    }
  }

  return {
    isLoggedIn: true,
    user: session.user
  }
}
