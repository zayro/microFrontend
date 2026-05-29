import { createRouter, createWebHistory } from 'vue-router'
import { useConfigStoreRef } from '@/stores/config'

import DefaultView from '../views/login/defaultView.vue'
import themeView from '@/views/theme/themeView.vue'
import welcomeView from '@/views/welcome/welcomeView.vue'
import liquidView from '@/views/login/liquidView.vue'
import mainView from '@/views/main/mainView.vue'

// Pagina de Error 404
import NotFoundView from '@/views/404/404.vue'

// Modulo Firma Electronica
import firmaElectronicaView from '@/views/main/modules/firmaElectronica/firmaElectronicaView.vue'
import politicasView from '@/views/main/modules/firmaElectronica/politicas/politicasView.vue'
import verificarView from '@/views/main/modules/firmaElectronica/verificar/verificarView.vue'

// Rutas públicas que no requieren autenticación
const PUBLIC_ROUTES = ['defaultView', 'liquidView', 'themeView']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView,
    },
    {
      path: '/',
      name: 'defaultView',
      component: DefaultView,
      meta: { requiresAuth: false, label: 'Login' },
    },
    {
      path: '/theme',
      name: 'themeView',
      component: themeView,
      meta: { requiresAuth: false, label: 'Tema' },
    },

    // Modulos
    {
      path: '/main',
      name: 'main',
      component: mainView,
      meta: { requiresAuth: true, transition: 'fade', label: 'Principal' },
      children: [
        {
          // Ruta por defecto para /main/
          path: '/',
          name: 'mainWelcome',
          component: welcomeView,
          meta: { transition: 'fade' },
        },
        {
          // Ruta por defecto para /main/
          path: '',
          name: 'mainWelcome',
          component: welcomeView,
          meta: { transition: 'fade' },
        },
        {
          path: '/theme',
          name: 'mainThemeView',
          component: themeView,
        },
        {
          path: '/firmaElectronica',
          name: 'firmaElectronica',
          component: firmaElectronicaView,
          meta: { label: 'Firma Electrónica', transition: 'fade' },
          children: [
            {
              path: '/',
              name: 'politicasView',
              component: politicasView,
              meta: { label: 'Políticas', transition: 'fade' },
            },
            {
              path: '',
              name: 'politicasView',
              component: politicasView,
              meta: { label: 'Políticas', transition: 'fade' },
            },
            {
              path: 'verificarFirma',
              name: 'verificarView',
              component: verificarView,
              meta: { label: 'Verificar Firma', transition: 'fade' },
            },
          ],
        },
      ],
    },
    {
      path: '/welcome',
      name: 'welcomeView',
      component: welcomeView,
      meta: { requiresAuth: false, label: 'Bienvenida' },
    },
    {
      path: '/liquid/',
      name: 'liquidView',
      component: liquidView,
      meta: { requiresAuth: false, label: 'Liquid' },
    },
  ],
})

// Guard global para validar autenticación
router.beforeEach((to, from, next) => {
  const configStore = useConfigStoreRef()
  const isAuthenticated = !!configStore.getToken
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // Si la ruta requiere autenticación y no está autenticado
  if (requiresAuth && !isAuthenticated) {
    console.warn(`Acceso denegado a ${to.path}: Autenticación requerida`)
    return next({ name: 'defaultView' })
  }

  // Si está autenticado y trata de ir a login, déjalo pasar
  if (isAuthenticated && to.name === 'defaultView') {
    return next()
  }

  next()
})

export default router
