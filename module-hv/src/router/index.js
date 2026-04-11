import { createRouter, createWebHistory } from 'vue-router'
import HvView from '../views/HvView.vue'

// Pagina de Error 404
import NotFoundView from '@/views/404/404.vue'

import DefaultView from '@/views/login/defaultView.vue'

import createUserView from '@/views/register/createUserView.vue'

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
      path: '/createUser',
      name: 'createUserView',
      component: createUserView,
    },
    {
      path: '/hv',
      name: 'hv',
      component: HvView,
    },
  ],
})

export default router
