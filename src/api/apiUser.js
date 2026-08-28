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
      let errorMsg = 'Error al registrar usuario'
      try {
        const errorData = await response.json()
        if (errorData) {
          if (Array.isArray(errorData.message)) {
            errorMsg = errorData.message.join(', ')
          } else if (typeof errorData.message === 'string') {
            errorMsg = errorData.message
          } else if (typeof errorData.error === 'string') {
            errorMsg = errorData.error
          }
        }
      } catch (e) {
        errorMsg = response.statusText || errorMsg
      }
      throw new Error(errorMsg)
    }
    return await response.json()
  }

  async function getRecoveryPassword({ email }) {
    // Aquí puedes usar fetch o axios
    const response = await fetch(API + `/auth/recovery-password/${email}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error('Usuario no encontrado')
    }
    return await response.json()
  }

  async function getUpdatePassword({ identificacion, password, newPassword }) {
    // Aquí puedes usar fetch o axios
    const response = await fetch(API + `/auth/update-password/${identificacion}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, newPassword }),
    })
    if (!response.ok) {
      throw new Error('Usuario no encontrado')
    }
    return await response.json()
  }
  return {
    postLoginMb,
    postRegisterUser,
    getRecoveryPassword,
    getUpdatePassword,
  }
}
