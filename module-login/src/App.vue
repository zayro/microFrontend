<script setup>
import { RouterView } from 'vue-router'


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
      <!-- Use any custom transition and fallback to `fade` <transition :name="route.meta.transition || 'fade'">  -->

      <component :is="Component" />

      <!-- ROUTE END  -->
    </router-view>


  </div>
</template>
