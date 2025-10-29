<script setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <div class="welcome-container">


    <div class="cards-container">

      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>

    </div>
  </div>
</template>


<style scoped>
.welcome-container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Cambiado de flex-start a center */
  padding: 0 1rem;
  /* Quitado el padding-top y padding-bottom */
  position: relative;
  overflow-x: hidden;
  flex: 1;
  /* Asegura que ocupe todo el alto */
}

.welcome-container::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url('@/assets/img/background/pattern3_black.png');
  background-color: var(--my-custom-bg, --p-surface-500, #f8fafc);
  background-blend-mode: overlay;
  /* Hace la imagen de fondo opaca, la capa de color se mezcla */
  pointer-events: none;
}
</style>
