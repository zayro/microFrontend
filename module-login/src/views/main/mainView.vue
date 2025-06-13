<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'

import MacDock from '@/components/MacDock.vue'
import ModernMenubar from '@/components/ModernMenubar.vue'


console.groupCollapsed('info Vite')
console.log('----------------------', import.meta.env.BASE_URL)
console.log('----------------------', import.meta.env.VITE_DEBUG)
console.groupEnd()

const blocked = ref(true)

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
  <div>

    <ModernMenubar :title="'Bienvenido'" :currentTime="currentTime" />

    <!-- ROUTING con transición -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Footer moderno -->
    <MacDock />
  </div>
</template>

<style scoped>
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
