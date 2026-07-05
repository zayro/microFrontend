import { createRouter, createWebHistory } from 'vue-router'
import { useConfigStoreRef } from '@/stores/config'
import HvView from '../views/HvView.vue'

// Pagina de Error 404
import NotFoundView from '@/views/404/404.vue'

import DefaultView from '@/views/login/defaultView.vue'

import createUserView from '@/views/register/createUserView.vue'
import restorePasswordUserView from '@/views/register/restorePasswordUserView.vue'

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
      path: '/restorePassword',
      name: 'restorePasswordUserView',
      component: restorePasswordUserView,
    },
    {
      path: '/hv',
      name: 'hv',
      component: HvView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const configStore = useConfigStoreRef()
    const token = configStore.getToken

    if (!token) {
      // Si no hay token en el store (que persiste en localStorage), redirigir al login
      next({ name: 'defaultView' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
