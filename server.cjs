// server.js
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const path = require('path')

const app = express()

// 1. Habilitar CORS (opcional si es para testing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// 2. Proxy EXACTAMENTE solo para las URLs que inicien con /api
app.use(
  '/web/hv/api',
  createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: { '^/web/hv/api': '' }, // Recorta el /api de la URL
  }),
)

// 3. Servir los archivos estáticos de la carpeta dist
app.use(express.static('dist'))

// 4. Soporte para el SPA (Vue Router)
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'))
})

app.listen(4000, () => {
  console.log('Servidor corriendo en http://localhost:4000')
})
