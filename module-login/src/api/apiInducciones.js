import { CONSTANT } from '@/env/index.js'

const URL = CONSTANT.URL.API
const API_V2 = CONSTANT.URL.API_V2
const SERVER = CONSTANT.URL.SERVER

export function ApiInducciones() {
  // Ejemplo de postLogin en apiUser.js
  async function fetchInducciones(identificacion) {
    try {
      const response = await fetch(SERVER + '/v2/general/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'vista_inducciones',
          fields: '*',
          where: { nroidentificacion: identificacion },
          db_name: 'accessgu',
        }),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Error al obtener las inducciones')
      } else {
        return await response.json()
      }
    } catch (error) {
      console.error('Error en fetchInducciones:', error)
      throw error
    }
  }

  async function getFileInducciones(FILE) {
    try {
      const response = await fetch(SERVER + '/v1/pdf/getFile?file_name=' + FILE, {
        method: 'GET',
        headers: { 'Content-Type': 'application/pdf' },
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Error al obtener las inducciones')
      } else {
        return await response.json()
      }
    } catch (error) {
      console.error('Error en fetchInducciones:', error)
      throw error
    }
  }
  return {
    fetchInducciones,
    getFileInducciones,
  }
}
