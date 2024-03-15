import { supabase } from './supabase'

export const fetchUsers = async (q = null, page) => {
  const ITEM_PER_PAGE = 4

  if (q) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .ilike('username', q)
        .order('username', { ascending: true })
        .range((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE - 1)

      if (error) {
        throw new Error('Failed to fetch users!')
      }

      const count = data.length
      return { users: data, count }
    } catch (error) {
      throw error
    }
  } else {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('username', { ascending: true })
        .range((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE - 1)

      if (error) {
        throw new Error('Failed to fetch users!')
      }

      const count = data.length
      return { users: data, count }
    } catch (error) {
      throw error
    }
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
  const regex = `ilike '%${q}%'`
  if (q) {
    try {
      const { data, error } = await supabase
        .from('custom_routines')
        .select('*')
        .ilike('name', regex)
        .order('name', { ascending: true })
        .range((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE - 1)

      if (error) {
        throw new Error('Failed to fetch custom routines!')
      }

      const count = data.length
      return { customRoutines: data, count }
    } catch (error) {
      throw error
    }
  } else {
    try {
      const { data, error } = await supabase
        .from('custom_routines')
        .select('*')
        .order('name', { ascending: true })
        .range((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE - 1)

      if (error) {
        throw new Error('Failed to fetch custom routines!')
      }

      const count = data.length
      return { customRoutines: data, count }
    } catch (error) {
      throw error
    }
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
