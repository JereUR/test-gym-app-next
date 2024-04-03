'use client'

import { useState } from 'react'
import { userSignUp } from '@/app/services/actions'
import { supabase } from '@/app/services/supabase'

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorSignUp, setErrorSignUp] = useState(null)

  const handleSignUp = async (e) => {
    e.preventDefault()

    const { error } = await userSignUp(email, password)

    if (error) {
      setErrorSignUp(error.message)
    }
  }

  return (
    <form
      onSubmit={handleSignUp}
      className="form-login bg-gray-800 p-12 rounded-lg flex flex-col justify-center gap-8 items-center"
    >
      <h1 className="text-3xl font-bold">Registrate</h1>
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={({ target }) => setEmail(target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button className="p-7 bg-teal-700 text-white border-none cursor-pointer rounded-md w-full">
        Registrarse
      </button>
      {errorSignUp && (
        <div className="error-message">
          <p>{errorSignUp}</p>
        </div>
      )}
    </form>
  )
}

export default SignUpForm
