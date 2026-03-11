<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';


import ModernMenubar from '@/components/ModernMenubar.vue'

const router = useRouter();

console.groupCollapsed('info Vite Main')
console.log('----------------------', import.meta.env.BASE_URL)
console.log('----------------------', import.meta.env.VITE_DEBUG)
console.log('----------------------', import.meta.env.VITE_APP_TITLE)
console.log('----------------------', import.meta.env.VITE_APP_VERSION)
console.log('----------------------', import.meta.env.VITE_APP_AUTHOR)
console.log('ruta actual', router.currentRoute.value.fullPath)
console.groupEnd()

const blocked = ref(true)

const itemsBreadcrumb = ref([
  { label: router.currentRoute.value.meta.label, route: router.currentRoute.value.fullPath }
]);

onBeforeMount(() => {
  blocked.value = true
})

onMounted(() => {
  /*
  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'
  document.body.style.backgroundImage = `url(${imgBody})`
  */
})
</script>

<template>


  <header>
    <ModernMenubar :title="'Bienvenido'" :currentTime="currentTime" :itemsBreadcrumb="itemsBreadcrumb" />
  </header>


  <section>
    <!-- ROUTING con transición -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>


  <footer>
    <!-- Footer moderno -->
  </footer>


</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

section {
  top: 60px;
}


footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
}

.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Transiciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
