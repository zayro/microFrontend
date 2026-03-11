import { createRouter, createWebHistory } from 'vue-router'

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
    },
    {
      path: '/theme',
      name: 'themeView',
      component: themeView,
    },

    // Modulos
    {
      path: '/main',
      name: 'main',
      component: mainView,
      meta: { label: 'Inicio', transition: 'fade' },
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
          meta: { label: 'Bienvenido', transition: 'fade' },
        },
        {
          path: '/theme',
          name: 'mainThemeView',
          component: themeView,
          meta: { label: 'Tema', transition: 'fade' },
        },
        {
          path: '/firmaElectronica',
          name: 'firmaElectronica',
          component: firmaElectronicaView,
          meta: { label: 'Documentos Firma Electrónica', transition: 'fade' },
          children: [
            {
              path: '/',
              name: 'politicasView',
              component: politicasView,
              meta: { transition: 'fade' },
            },
            {
              path: '',
              name: 'politicasView',
              component: politicasView,
              meta: { transition: 'fade' },
            },
            {
              path: 'verificarFirma',
              name: 'verificarView',
              component: verificarView,
              meta: { transition: 'fade' },
            },
          ],
        },
      ],
    },
    {
      path: '/welcome',
      name: 'welcomeView',
      component: welcomeView,
    },
    {
      path: '/liquid/',
      name: 'liquidView',
      component: liquidView,
    },
  ],
})

export default router
