import { CONSTANT } from '@/env/index.js'

const API = CONSTANT.URL.TARGET

export function ApiUser() {
  async function postLoginMb({ username, password }) {
    // Aquí puedes usar fetch o axios
    const response = await fetch(API + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!response.ok) {
      throw new Error('Login fallido')
    }
    return await response.json()
  }

  async function postRegisterUser({ identificacion, email, password, username }) {
    // Aquí puedes usar fetch o axios
    const response = await fetch(API + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identificacion, email, password, username }),
    })
    if (!response.ok) {
      throw new Error('Registro fallido')
    }
    return await response.json()
  }

  return {
    postLoginMb,
    postRegisterUser,
  }
}
