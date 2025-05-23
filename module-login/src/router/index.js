import { createRouter, createWebHistory } from 'vue-router'
import DefaultView from '../views/login/defaultView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'defaultView',
      component: DefaultView,
    },
  ],
})

export default router
