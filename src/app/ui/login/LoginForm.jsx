'use client'

import { useState } from 'react'

import { authenticate } from '@/app/services/actions'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorLogin, setErrorLogin] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    await authenticate(email, password)

    /*  if (data) {
      //Actualizar Middleware
      window.location.replace('dashboard')
    } */
  }

  return (
    <div>
      <form
        onSubmit={handleLogin}
        className="form-login bg-gray-800 p-12 rounded-lg flex flex-col justify-center gap-8 items-center"
      >
        <h1 className="text-3xl font-bold">Inicio de Sesion</h1>
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
          Iniciar Sesion
        </button>
        {errorLogin && (
          <div className="error-message">
            <p>{errorLogin}</p>
          </div>
        )}
        <p>
          No tienes una cuenta?{' '}
          <a className="text-teal-500" href="/signup">
            Regístrate!
          </a>
        </p>
      </form>
    </div>
  )
}

export default LoginForm
