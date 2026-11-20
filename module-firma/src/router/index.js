import { createRouter, createWebHistory } from 'vue-router'
import { useConfigStoreRef } from '@/stores/config'
import themeView from '@/views/theme/themeView.vue'
import welcomeView from '@/views/welcome/welcomeView.vue'
import mainView from '@/views/main/mainView.vue'
import firmaElectronicaView from '@/views/main/modules/firmaElectronica/firmaElectronicaView.vue'
import politicasView from '@/views/main/modules/firmaElectronica/politicas/politicasView.vue'
import verificarView from '@/views/main/modules/firmaElectronica/verificar/verificarView.vue'
import NotFoundView from '@/views/404/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'defaultView', redirect: { name: 'mainWelcome' } },
    { path: '/default', redirect: { name: 'mainWelcome' } },
    { path: '/liquid', redirect: { name: 'mainWelcome' } },
    { path: '/welcome', name: 'welcomeView', redirect: { name: 'mainWelcome' } },
    { path: '/theme', name: 'themeView', redirect: { name: 'mainThemeView' } },
    {
      path: '/main',
      name: 'main',
      component: mainView,
      meta: { requiresAuth: true, transition: 'fade', label: 'Principal' },
      children: [
        { path: '', name: 'mainWelcome', component: welcomeView, meta: { transition: 'fade' } },
        { path: 'theme', name: 'mainThemeView', component: themeView },
        {
          path: '/firmaElectronica',
          name: 'firmaElectronica',
          component: firmaElectronicaView,
          meta: { label: 'Firma Electrónica', transition: 'fade' },
          children: [
            { path: '', name: 'politicasView', component: politicasView, meta: { label: 'Políticas', transition: 'fade' } },
            { path: 'verificarFirma', name: 'verificarView', component: verificarView, meta: { label: 'Verificar Firma', transition: 'fade' } },
          ],
        },
      ],
    },
    { path: '/:catchAll(.*)', name: 'NotFound', component: NotFoundView },
  ],
})

router.beforeEach((to) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !useConfigStoreRef().getToken) {
    window.location.replace('/web/login/?module=firma')
    return false
  }
})

export default router
