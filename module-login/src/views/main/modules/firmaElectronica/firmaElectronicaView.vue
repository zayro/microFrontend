<script setup>
import { ref, watch } from "vue";
import { RouterView } from 'vue-router'
import Sidebar from 'primevue/sidebar';


const visible = ref(false)

function handlerSidebar(ruta) {
  console.log('Recibido del hijo:', ruta);
  visible.value = ruta;
  // Aquí podrías actualizar la ruta usando $router o alguna otra lógica
}




watch(visible, (v) => {
  console.log('Visible Sidebar changed (watch):', v)
})

</script>

<template>

  <div class="welcome-container">
    <div class="card flex justify-content-center">
      <Sidebar v-model:visible="visible" header="Sidebar">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.</p>
      </Sidebar>

    </div>

    <div class="cards-container">

      <router-view v-slot="{ Component }">
        <!-- Pasamos la prop visibleSidebar (vía proxy) y un setter para que el componente hijo pueda actualizarla -->
        <component :is="Component" @enviar-sidebar="handlerSidebar" />
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
