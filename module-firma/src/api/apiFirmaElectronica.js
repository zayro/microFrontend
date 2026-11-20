import { CONSTANT } from '@/env/index.js'

const API_V1 = CONSTANT.URL.API_V1
const API_V2 = CONSTANT.URL.API_V2
const SERVER = CONSTANT.URL.SERVER

export function ApiFirmaElectronica() {
  // Ejemplo de postLogin en apiUser.js
  async function sendVerificationEmail({ email, identificacion }) {
    // Nota: Los encabezados Access-Control-Allow-* no deben enviarse desde el cliente.
    // Deben ser devueltos por el servidor en la respuesta. Aquí enviamos sólo los
    // headers necesarios y, si se requieren cookies, habilitamos credentials.
    try {
      const response = await fetch(API_V1 + '/email/send-verification-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, identificacion }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Error al enviar el correo de verificación')
      }

      return await response.json()
    } catch (error) {
      console.error('Error en sendVerificationEmail:', error)
      throw new Error(error.message || 'Error al enviar el correo de verificación')
    }
  }

  async function verificationEmail({ email, code, ip, identificacion, token }) {
    // Evitar cache en esta petición de verificación: usar cache: 'no-store'
    // y headers Cache-Control/Pragma. Mantener mode:'cors' y credentials
    // sólo si el servidor soporta Access-Control-Allow-Credentials.
    try {
      const response = await fetch(API_V1 + '/email/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, code, ip, identificacion, token }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Error al verificar el correo/código')
      }

      return await response.json()
    } catch (error) {
      console.error('Error en verificationEmail:', error)
      throw new Error(error.message || 'Error al verificar el correo/código')
    }
  }

  async function consultarDocumentos(identificacion) {
    // Aquí puedes usar fetch o axios
    const response = await fetch(API_V2 + '/general/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      body: JSON.stringify({
        db_name: 'astgu',
        query: 'vista_contratos',
        fields: '*',
        where: { nroidentificacion: identificacion },
      }),
    })
    if (!response.ok) {
      throw new Error('Error al consultar documentos')
    }
    return await response.json()
  }

  async function validarRostro(file) {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(API_V1 + '/rostro/validar-rostro/', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Error al validar el rostro')
    }
    return await response.json()
  }

  return {
    sendVerificationEmail,
    verificationEmail,
    consultarDocumentos,
    validarRostro,
  }
}
