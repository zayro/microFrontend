// Ejemplo: leer VITE_TARGET (prefijo VITE_ recomendado para variables cliente)
// const URLTARGET = 'https://app2.genteutil.net/web/firmaDigitalBack/public'
const URLTARGET = '/web/hv/apiHv' // Redirige el tráfico mediante el proxy de Vite

export const CONSTANT = Object.freeze({
  URL: {
    TARGET: `${URLTARGET}`,
    API: `${URLTARGET}/apiHv/v1`,
    API_V1: `${URLTARGET}/apiHv/v1`,
    API_V2: `${URLTARGET}/apiHv/v2`,
    SERVER: `/apiHv`,
    PUBLIC: `${URLTARGET}/public/`,
    UPLOAD: `${URLTARGET}/public/uploads/`,
    SOCKET: `ws://localhost:4000`,
    COUCHDB: `http://admin:zayro1989@localhost:5984/developer`,
  },
})
