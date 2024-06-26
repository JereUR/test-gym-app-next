'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import bcrypt from 'bcrypt'

import { supabase } from './supabase'

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData)

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const { error } = await supabase
      .from('users')
      .insert([
        {
          username,
          email,
          password: hashedPassword,
          phone,
          address,
          isAdmin,
          isActive
        }
      ])
      .select()
    if (error) throw new Error(error)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create user!')
  }

  revalidatePath('/dashboard/users')
  redirect('/dashboard/users')
}

export const updateUser = async (formData) => {
  const {
    id,
    username,
    email,
    password,
    originalPassword,
    phone,
    address,
    isAdmin,
    isActive
  } = Object.fromEntries(formData)

  if (password != originalPassword) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      await supabase
        .from('users')
        .update({
          username,
          email,
          password: hashedPassword,
          phone,
          address,
          isAdmin,
          isActive
        })
        .eq('id', id)
        .select()
    } catch (error) {
      console.log(error)
      throw new Error('Failed to update user!')
    }
  } else {
    try {
      await supabase
        .from('users')
        .update({
          username,
          email,
          phone,
          address,
          isAdmin,
          isActive
        })
        .eq('id', id)
        .select()
    } catch (error) {
      console.log(error)
      throw new Error('Failed to update user!')
    }
  }

  revalidatePath('/dashboard/users')
  revalidatePath(`/dashboard/users/${id}`)
  redirect('/dashboard/users')
}

export const deleteUser = async (email) => {
  try {
    await supabase.from('users').delete().eq('email', email)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to delete user!')
  }

  revalidatePath('/dashboard/users')
}

export const userSignUp = async (email, password) => {
  const { error } = await supabase.auth.signUp({ email, password })
  console.log(error)

  if (!error) {
    redirect('/dashboard')
  } else {
    return { error }
  }
}

export const authenticate = async (email, password) => {
  try {
    await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    return { redirect: { destination: '/dashboard', permanent: false } }
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

export const addCustomRoutine = async (routineData) => {
  const { name, days, description } = routineData

  try {
    await supabase
      .from('custom_routines')
      .insert([{ name, days, description }])
      .select()
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create custom routine!')
  }

  revalidatePath('/dashboard/routines')
  redirect('/dashboard/routines')
}

export const deleteCustomRoutine = async (id) => {
  try {
    await supabase.from('custom_routines').delete().eq('id', id)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to delete custom routine!')
  }

  revalidatePath('/dashboard/routines')
}

export const updateCustomRoutine = async (data) => {
  const { id, name, days, description } = data

  try {
    const { data, error } = await supabase
      .from('custom_routines')
      .update({ name: name, days: days, description: description })
      .eq('id', id)
      .select()
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update custom routine!')
  }

  revalidatePath('/dashboard/routines')
  revalidatePath(`/dashboard/routines/${id}`)
  redirect('/dashboard/routines')
}
