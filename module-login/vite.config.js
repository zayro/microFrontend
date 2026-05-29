import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables del .env correspondiente al modo (mode = 'development' | 'production' | ...)
  // El tercer argumento '' devuelve todas las variables, no solo las que tienen prefijo.
  const env = loadEnv(mode, process.cwd(), '')

  // Ejemplo: leer VITE_TARGET (prefijo VITE_ recomendado para variables cliente)
  const URLTARGET = env.VITE_TARGET || env.VITE_API_URL || 'http://localhost:3000'

  // Si necesitas pasar una variable al código cliente que no sea VITE_*:
  // define: { __MY_CUSTOM_ENV__: JSON.stringify(env.MY_CUSTOM) }
  // En el cliente la leerías como __MY_CUSTOM_ENV__ (global definido en tiempo de build)

  return {
    //base: '/web/firmaDigital/',
    plugins: [vue(), vueDevTools(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: URLTARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
      },
    },
    // opcional: exponer algo en tiempo de build
    define: {
      // ejemplo para exponer una variable string al código cliente
      __VITE_TARGET__: JSON.stringify(URLTARGET),
    },
  }
})
