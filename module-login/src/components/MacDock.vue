<template>
  <div>
    <!-- Dock fijo abajo -->
    <div class="dock-fixed-bottom">
      <Dock :model="items" position="bottom">
        <template #item="{ item }">
          <button class="dock-btn-mac group" @click="onDockItemClick($event, item)">
            <span class="dock-icon-wrapper group-hover:scale-125 transition-transform duration-200">
              <i :class="item.icon"></i>
            </span>
            <span class="dock-label">{{ item.label }}</span>
          </button>
        </template>
      </Dock>
    </div>

    <!-- Dialogs -->
    <Dialog v-model:visible="showInicio" modal
      :style="fullscreenInicio ? { width: '100vw', height: '100vh', maxWidth: '100vw', top: '0', left: '0', margin: '0', padding: '0' } : { width: '350px' }"
      :contentStyle="fullscreenInicio ? { height: 'calc(100vh - 4rem)', overflow: 'auto' } : {}"
      :draggable="!fullscreenInicio" :closable="true">
      <template #header>
        <div class="flex justify-between items-center w-full">
          <span>Inicio</span>
          <button class="ml-auto cursor-pointer" @click="toggleFullscreen('inicio')">
            <i :class="fullscreenInicio ? 'pi pi-window-minimize' : 'pi pi-window-maximize'"></i>
          </button>
        </div>
      </template>
      <p>Bienvenido al inicio.</p>
    </Dialog>

    <Dialog v-model:visible="showPerfil" modal
      :style="fullscreenPerfil ? { width: '100vw', height: '100vh', maxWidth: '100vw', top: '0', left: '0', margin: '0', padding: '0' } : { width: 'calc(50vw - 4rem)' }"
      :contentStyle="fullscreenPerfil ? { height: 'calc(100vh - 4rem)', overflow: 'auto' } : {}"
      :draggable="!fullscreenPerfil" :closable="true" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <template #header>
        <div class="flex justify-between items-center w-full">
          <span class="font-bold whitespace-nowrap">Perfil</span>
          <button class="ml-auto cursor-pointer" @click="toggleFullscreen('perfil')">
            <i :class="fullscreenPerfil ? 'pi pi-window-minimize' : 'pi pi-window-maximize'"></i>
          </button>

        </div>
      </template>
      <ThemeView></ThemeView>
    </Dialog>

    <Dialog v-model:visible="showConfiguracion" modal
      :style="fullscreenConfiguracion ? { width: '100vw', height: '100vh', maxWidth: '100vw', top: '0', left: '0', margin: '0', padding: '0' } : { width: '350px' }"
      :contentStyle="fullscreenConfiguracion ? { height: 'calc(100vh - 4rem)', overflow: 'auto' } : {}"
      :draggable="!fullscreenConfiguracion" :closable="true">
      <template #header>
        <div class="flex justify-between items-center w-full">
          <span>Configuración</span>
          <button class="ml-auto cursor-pointer" @click="toggleFullscreen('configuracion')">
            <i :class="fullscreenConfiguracion ? 'pi pi-window-minimize' : 'pi pi-window-maximize'"></i>
          </button>
        </div>
      </template>
      <p>Configura las opciones y preferencias de tu cuenta.</p>
    </Dialog>

    <Dialog v-model:visible="showSalir" modal
      :style="fullscreenSalir ? { width: '100vw', height: '100vh', maxWidth: '100vw', top: '0', left: '0', margin: '0', padding: '0' } : { width: '350px' }"
      :contentStyle="fullscreenSalir ? { height: 'calc(100vh - 4rem)', overflow: 'auto' } : {}"
      :draggable="!fullscreenSalir" :closable="true">
      <template #header>
        <div class="flex justify-between items-center w-full">
          <span>Salir</span>
          <button class="ml-auto cursor-pointer" @click="toggleFullscreen('salir')">
            <i :class="fullscreenSalir ? 'pi pi-window-minimize' : 'pi pi-window-maximize'"></i>
          </button>
        </div>
      </template>
      <p>¿Estás seguro que deseas salir?</p>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dock from 'primevue/dock'
import Dialog from 'primevue/dialog'
import ThemeView from '@/views/theme/themeView.vue'

const showInicio = ref(false)
const showPerfil = ref(false)
const showConfiguracion = ref(false)
const showSalir = ref(false)

const fullscreenInicio = ref(false)
const fullscreenPerfil = ref(false)
const fullscreenConfiguracion = ref(false)
const fullscreenSalir = ref(false)

const items = ref([
  {
    label: 'Inicio',
    icon: 'pi pi-home',
    command: () => {
      showInicio.value = true;
    }
  },
  {
    label: 'Perfil',
    icon: 'pi pi-user',
    command: () => {
      showPerfil.value = true;
    }
  },
  {
    label: 'Configuración',
    icon: 'pi pi-cog',
    command: () => {
      showConfiguracion.value = true;
    }
  },
  {
    label: 'Salir',
    icon: 'pi pi-sign-out',
    command: () => {
      showSalir.value = true;
    }
  }
])

const onDockItemClick = (event, item) => {
  if (item.command) {
    item.command();
  }
  event.preventDefault();
}

function toggleFullscreen(dialog) {
  if (dialog === 'inicio') fullscreenInicio.value = !fullscreenInicio.value
  if (dialog === 'perfil') fullscreenPerfil.value = !fullscreenPerfil.value
  if (dialog === 'configuracion') fullscreenConfiguracion.value = !fullscreenConfiguracion.value
  if (dialog === 'salir') fullscreenSalir.value = !fullscreenSalir.value
}
</script>

<style scoped>
/* Copia aquí los estilos relacionados con el Dock y los Dialogs */
.dock-fixed-bottom {
  position: fixed;
  left: 0;
  bottom: 10px;
  width: 100vw;
  z-index: 1200;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.dock-btn-mac {
  background: transparent;
  border: none;
  outline: none;
  margin: 0 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.18s;
  position: relative;
}

.dock-btn-mac:active {
  transform: scale(0.95);
}

.dock-icon-wrapper {
  background: linear-gradient(135deg, var(--p-primary-400) 0%, var(--p-primary-600) 100%);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.7rem;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
  margin-bottom: 0.3rem;
  transition: transform 0.18s;
}

.dock-label {
  font-size: 0.85rem;
  color: #334155;
  margin-top: 0.1rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s;
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 0.15rem 0.7rem;
  border-radius: 0.7rem;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.10);
  white-space: nowrap;
}

.dock-btn-mac:hover .dock-label {
  opacity: 1;
}
</style>
