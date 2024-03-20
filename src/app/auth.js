import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { authConfig } from './authconfig'
import bcrypt from 'bcrypt'
import { supabase } from './services/supabase'

const login = async (credentials) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single()
  console.log(user)

  if (!user) throw new Error('Wrong credentials!')

  const isPasswordCorrect = await bcrypt.compare(
    credentials.password,
    user.password
  )
  if (!isPasswordCorrect) throw new Error('Wrong credentials!')

  if (error) {
    console.log(err)
    throw new Error('Failed to login!')
  }

  return user
}

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials)
          console.log(user)
          return user
        } catch (err) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username
        token.img = user.img
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username
        session.user.img = token.img
      }
      return session
    }
  }
})
