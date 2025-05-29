<script setup>
import { RouterView } from 'vue-router'
import { watch, onMounted } from 'vue'
import { useAppStoreRef } from '@/stores/config'
import { updatePrimaryPalette, updateSurfacePalette } from '@primeuix/themes'

const appStore = useAppStoreRef()

// Función para aplicar el tema globalmente
const applyTheme = () => {
  if (appStore.themeColor) {
    updatePrimaryPalette({
      50: `{${appStore.themeColor}.50}`,
      100: `{${appStore.themeColor}.100}`,
      200: `{${appStore.themeColor}.200}`,
      300: `{${appStore.themeColor}.300}`,
      400: `{${appStore.themeColor}.400}`,
      500: `{${appStore.themeColor}.500}`,
      600: `{${appStore.themeColor}.600}`,
      700: `{${appStore.themeColor}.700}`,
      800: `{${appStore.themeColor}.800}`,
      900: `{${appStore.themeColor}.900}`,
      950: `{${appStore.themeColor}.950}`,
    })
  }
  if (appStore.themeSurfaces) {
    updateSurfacePalette({
      50: `{${appStore.themeSurfaces}.50}`,
      100: `{${appStore.themeSurfaces}.100}`,
      200: `{${appStore.themeSurfaces}.200}`,
      300: `{${appStore.themeSurfaces}.300}`,
      400: `{${appStore.themeSurfaces}.400}`,
      500: `{${appStore.themeSurfaces}.500}`,
      600: `{${appStore.themeSurfaces}.600}`,
      700: `{${appStore.themeSurfaces}.700}`,
      800: `{${appStore.themeSurfaces}.800}`,
      900: `{${appStore.themeSurfaces}.900}`,
      950: `{${appStore.themeSurfaces}.950}`,
    })
  }

  if (appStore.themeDark) {
    document.documentElement.classList.add('my-app-dark');
  } else {
    document.documentElement.classList.remove('my-app-dark');
  }
}

// Aplica el tema al cargar la app
onMounted(() => {
  applyTheme()
})

// Observa cambios en el store y aplica el tema automáticamente
watch(
  () => [appStore.themeColor, appStore.themeSurfaces],
  applyTheme
)

// Eventos globales (como tenías antes)
window.addEventListener('offline', () => {
  console.log('offline')
})
window.addEventListener('visibilitychange', () => {
  console.log('visibilitychange')
})
window.addEventListener('focus', () => {
  console.log('focus')
})
window.addEventListener('blur', () => {
  console.log('blur')
})
window.addEventListener('online', () => {
  console.log('online')
})
window.addEventListener('resize', () => {
  console.log('innerWidth', window.innerWidth, 'innerHeight', window.innerHeight)
})
window.onload = function () {
  console.log(' window.onload ')
}
</script>

<template>
  <div>
    <!-- ROUTE -->
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>
