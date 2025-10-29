import { CONSTANT } from '@/env/index.js'

const URL = CONSTANT.URL.API
const API_V2 = CONSTANT.URL.API_V2

export function ApiUser() {
  // Ejemplo de postLogin en apiUser.js
  async function postLogin({ username, password }) {
    // Aquí puedes usar fetch o axios
    const response = await fetch(URL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!response.ok) {
      throw new Error('Login fallido')
    }
    return await response.json()
  }

  async function postLoginMb({ username, password }) {
    // Aquí puedes usar fetch o axios
    const response = await fetch(API_V2 + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!response.ok) {
      throw new Error('Login fallido')
    }
    return await response.json()
  }

  return {
    postLogin,
    postLoginMb,
  }
}
