<template>
  <Menubar class="modern-menubar">
    <template #start>
      <div class="menu-traffic-lights">
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span>
      </div>
      <div>
        <span><strong>{{ title }}</strong></span>
      </div>
    </template>
    <template #end>
      <i class="pi pi-wifi px-2" />
      <i class="pi pi-volume-up px-2" />
      <span class="px-2">{{ currentTime }}</span>
    </template>
  </Menubar>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted } from 'vue'
import Menubar from 'primevue/menubar'

const currentTime = ref('')

function updateTime() {
  const now = new Date()
  const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' }
  currentTime.value = now.toLocaleTimeString('es-ES', options).replace('.', ':')
}

let intervalId

onMounted(() => {
  updateTime()
  intervalId = setInterval(updateTime, 1000 * 60) // Actualiza cada minuto
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const props = defineProps({
  title: {
    type: String,
    default: 'Bienvenido'
  },

})
</script>
<style scoped>
.modern-menubar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  /* Usa variables de PrimeVue para fondo y sombra */
  background: var(--p-card-background, #fff);
  color: var(--p-text-color, #212121);
  backdrop-filter: blur(10px);
  box-shadow: var(--p-shadow-2, 0 2px 8px rgba(60, 72, 88, 0.1));
  border-radius: var(--p-border-radius, 2px);
  transition: background 0.3s, color 0.3s;
}

.menu-traffic-lights {
  display: flex;
  gap: 0.4rem;
  margin-right: 1.2rem;
  align-items: center;
}

.menu-traffic-lights span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid var(--p-border-color, #e5e7eb);
  box-shadow: 0 1px 2px rgba(60, 72, 88, 0.10);
}

.menu-traffic-lights .red {
  background: #ff5f56;
  border-color: #e0443e;
}

.menu-traffic-lights .yellow {
  background: #ffbd2e;
  border-color: #dea123;
}

.menu-traffic-lights .green {
  background: #27c93f;
  border-color: #13a10e;
}
</style>
