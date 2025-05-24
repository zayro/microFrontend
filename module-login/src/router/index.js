import { createRouter, createWebHistory } from 'vue-router'

import DefaultView from '../views/login/defaultView.vue'
import themeView from '@/views/theme/themeView.vue'
import welcomeView from '@/views/welcome/welcomeView.vue'

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
    {
      path: '/welcome',
      name: 'welcomeView',
      component: welcomeView,
    },
  ],
})

export default router
