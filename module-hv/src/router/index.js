import { createRouter, createWebHistory } from 'vue-router'
import { useConfigStoreRef } from '@/stores/config'
import HvView from '../views/HvView.vue'

// Pagina de Error 404
import NotFoundView from '@/views/404/404.vue'

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
      redirect: { name: 'hv' },
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
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const configStore = useConfigStoreRef()
    const token = configStore.getToken

    if (!token) {
      window.location.replace('/web/login/?module=hv')
      next(false)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
