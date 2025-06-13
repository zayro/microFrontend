import { createRouter, createWebHistory } from 'vue-router'

import DefaultView from '../views/login/defaultView.vue'
import themeView from '@/views/theme/themeView.vue'
import welcomeView from '@/views/welcome/welcomeView.vue'
import liquidView from '@/views/login/liquidView.vue'
import mainView from '@/views/main/mainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      meta: { transition: 'fade' },
      children: [
        {
          // Ruta por defecto para /main/
          path: '/',
          name: 'mainWelcome',
          component: welcomeView,
          meta: { transition: 'fade' },
        },
        {
          path: '/theme',
          name: 'mainThemeView',
          component: themeView,
        },
      ],
    },
    {
      path: '/welcome',
      name: 'welcomeView',
      component: welcomeView,
    },
    {
      path: '/liquid',
      name: 'liquidView',
      component: liquidView,
    },
  ],
})

export default router
