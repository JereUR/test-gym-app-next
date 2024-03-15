import { supabase } from './supabase'

export const fetchUsers = async (q = null, page) => {
  const ITEM_PER_PAGE = 4
  let users = []

  try {
    const { data, error } = await supabase.from('users').select('*')

    if (q) {
      users = data.filter((user) =>
        user.username.toLowerCase().startsWith(q.toLowerCase())
      )
    } else {
      users = data
    }

    users = users.sort((a, b) => (a.username > b.username ? 1 : -1))
    users = users.slice((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE)

    if (error) {
      throw new Error('Failed to fetch users!')
    }

    const count = users.length
    return { users, count }
  } catch (error) {
    throw error
  }
}

export const fetchUser = async (id) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error('Failed to fetch user!')
    }

    return { user: data }
  } catch (error) {
    throw error
  }
}

export const filterUser = async (column, value) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq(column, value)
      .single()

    if (error) {
      throw new Error('Failed to fetch user!')
    }

    return { user: data }
  } catch (error) {
    throw error
  }
}

export const fetchCustomRoutines = async (q = null, page) => {
  const ITEM_PER_PAGE = 4
  let customRoutines = []
  try {
    const { data, error } = await supabase.from('custom_routines').select('*')

    if (q) {
      customRoutines = data.filter((routine) =>
        routine.name.toLowerCase().startsWith(q.toLowerCase())
      )
    } else {
      customRoutines = data
    }

    customRoutines = customRoutines.sort((a, b) =>
      a.username > b.username ? 1 : -1
    )
    customRoutines = customRoutines.slice(
      (page - 1) * ITEM_PER_PAGE,
      page * ITEM_PER_PAGE
    )

    if (error) {
      throw new Error('Failed to fetch custom routines!')
    }

    const count = customRoutines.length
    return { customRoutines, count }
  } catch (error) {
    throw error
  }
}

export const fetchCustomRoutine = async (id) => {
  try {
    const { data, error } = await supabase
      .from('custom_routines')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error('Failed to fetch custom routine!')
    }

    return { customRoutine: data }
  } catch (error) {
    throw error
  }
}
