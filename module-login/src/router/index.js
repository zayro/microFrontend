import { createRouter, createWebHistory } from 'vue-router'
import liquidView from '@/views/login/liquidView.vue'
import themeView from '@/views/theme/themeView.vue'
import NotFoundView from '@/views/404/404.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: ['/default', '/liquid'],
      name: 'defaultView',
      component: liquidView,
      meta: { label: 'Login' },
    },
    { path: '/theme', name: 'themeView', component: themeView, meta: { label: 'Tema' } },
    { path: '/:catchAll(.*)', name: 'NotFound', component: NotFoundView },
  ],
})
