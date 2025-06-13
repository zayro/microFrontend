import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'

import router from './router'

import PrimeVue from 'primevue/config'

import ToastService from 'primevue/toastservice'

// Icons
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import * as FaIcons from 'oh-vue-icons/icons/fa'

const Fa = Object.values({ ...FaIcons })

// Themes
import Aura from '@primeuix/themes/aura'
import Material from '@primeuix/themes/material'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
    },
    zIndex: {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
      toast: 1100,
    },
    locale: {
      startsWith: 'Empieza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina con',
      equals: 'Igual a',
      notEquals: 'No igual a',
      noFilter: 'Sin filtro',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que',
      dateIs: 'Es',
      dateIsNot: 'No es',
      dateBefore: 'Antes de',
      dateAfter: 'Después de',
    },
    filterMatchModeOptions: {
      text: [
        { label: 'Empieza con', value: 'startsWith' },
        { label: 'Contiene', value: 'contains' },
        { label: 'No contiene', value: 'notContains' },
        { label: 'Termina con', value: 'endsWith' },
        { label: 'Igual a', value: 'equals' },
        { label: 'No igual a', value: 'notEquals' },
      ],
      numeric: [
        { label: 'Menor que', value: 'lt' },
        { label: 'Menor o igual que', value: 'lte' },
        { label: 'Mayor que', value: 'gt' },
        { label: 'Mayor o igual que', value: 'gte' },
      ],
      date: [
        { label: 'Es', value: 'dateIs' },
        { label: 'No es', value: 'dateIsNot' },
        { label: 'Antes de', value: 'dateBefore' },
        { label: 'Después de', value: 'dateAfter' },
      ],
    },
    filterOperatorOptions: [
      { label: 'AND', value: 'and' },
      { label: 'OR', value: 'or' },
    ],
    emptyFilterMessage: 'No se encontraron resultados',
    emptyMessage: 'No hay datos para mostrar',
    invalidFilterMessage: 'Filtro no válido',
    clear: 'Limpiar',
    apply: 'Aplicar',
    showFilterMenu: 'Mostrar menú de filtro',
    hideFilterMenu: 'Ocultar menú de filtro',
    filter: 'Filtrar',
    filterPlaceholder: 'Buscar...',
    filterApplyLabel: 'Aplicar',
    filterMatchModeAll: 'Todos',
    filterMatchModeAny: 'Cualquiera',
  },
})

addIcons(...Fa)

app.component('v-icon', OhVueIcon)

app.use(VueQueryPlugin, {
  enableDevtoolsV6Plugin: true,
})

app.use(pinia)
app.use(VueQueryPlugin)
app.use(router)
app.use(ToastService)

app.mount('#app')
