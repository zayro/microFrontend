<template>
  <div>
    <!-- Dock fijo abajo -->
    <div :class="containerClass">
      <Dock :model="items" :position="primePosition" class="dock-mac">
        <template #item="{ item }">
          <button class="dock-btn-mac group" @click="onDockItemClick($event, item)">
            <span class="  group-hover:scale-125 transition-transform duration-200">
              <v-icon :name="item.icon" scale="2" :fill="item.color" />
            </span>
            <span class="dock-label">{{ item.label }} </span>
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
import { ref, computed } from 'vue'
import Dock from 'primevue/dock'
import Dialog from 'primevue/dialog'
import ThemeView from '@/views/theme/themeView.vue'
import { useRouter } from 'vue-router'


const showInicio = ref(false)
const showPerfil = ref(false)
const showConfiguracion = ref(false)
const showSalir = ref(false)

const fullscreenInicio = ref(false)
const fullscreenPerfil = ref(false)
const fullscreenConfiguracion = ref(false)
const fullscreenSalir = ref(false)

const router = useRouter()

const goRouteMain = () => router.push({ name: 'mainWelcome' })
const goRoute = () => router.push({ name: 'mainThemeView' })



const items = ref([
  {
    label: 'Inicio',
    icon: 'fa-windows',
    color: '#3b82f6',
    command: () => {
      goRouteMain();
    }
  },
  {
    label: 'Perfil',
    icon: 'fa-user',
    color: 'gray',
    command: () => {
      goRoute();
    }
  },
  {
    label: 'Conctacto',
    icon: 'fa-mail-bulk',
    color: 'gray',
    command: () => {
      showConfiguracion.value = true;
    }
  },
  {
    label: 'Salir',
    icon: 'fa-power-off',
    color: 'gray',
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
// Prop para controlar la posición del dock.
// Valores aceptados: 'bottom-center' (default), 'bottom-left', 'bottom-right', 'left', 'right'
const props = defineProps({
  dockPosition: { type: String, default: 'bottom-center' }
})

const containerClass = computed(() => {
  switch (props.dockPosition) {
    case 'left':
      return 'dock-fixed-left'
    case 'right':
      return 'dock-fixed-right'
    case 'bottom-left':
      return 'dock-fixed-bottom dock-left'
    case 'bottom-right':
      return 'dock-fixed-bottom dock-right'
    default:
      return 'dock-fixed-bottom'
  }
})

const primePosition = computed(() => {
  if (props.dockPosition === 'left') return 'left'
  if (props.dockPosition === 'right') return 'right'
  return 'bottom'
})

function toggleFullscreen(dialog) {
  if (dialog === 'inicio') fullscreenInicio.value = !fullscreenInicio.value
  if (dialog === 'perfil') fullscreenPerfil.value = !fullscreenPerfil.value
  if (dialog === 'configuracion') fullscreenConfiguracion.value = !fullscreenConfiguracion.value
  if (dialog === 'salir') fullscreenSalir.value = !fullscreenSalir.value
}
</script>

<style scoped>
/* Copia aquí los estilos relacionados con el Dock y los Dialogs */

/* estilos para .dock-mac pueden añadirse aquí si se requieren */

/* Reemplaza el estilo actual de .p-dock-list-container */
:deep(.p-dock-list-container) {
  background: transparent;
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 8px;
  box-shadow:
    0 8px 32px rgba(31, 38, 135, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease-in-out;
}

/* Añade el efecto hover */
:deep(.p-dock-list-container:hover) {
  background: rgba(255, 255, 255, 0.15);
  box-shadow:
    0 12px 40px rgba(31, 38, 135, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

/* Asegúrate de que el contenedor principal tenga el estilo correcto */
:deep(.p-dock) {
  background: transparent;
  border: none;
}

/* Ajusta también el contenedor de la lista */
:deep(.p-dock-list) {
  padding: 0;
  background: transparent;
}

.dock-fixed-bottom {
  position: fixed;
  left: 0;
  bottom: 30px;
  width: 100vw;
  z-index: 1200;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.dock-fixed-left {
  position: fixed;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1200;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
}

.dock-fixed-right {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1200;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
}

.dock-fixed-bottom.dock-left {
  left: 30px;
  justify-content: flex-start;
  width: auto;
}

.dock-fixed-bottom.dock-right {
  right: 30px;
  left: auto;
  justify-content: flex-end;
  width: auto;
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
  transition: all 0.3s ease-in-out;
  position: relative;
  pointer-events: auto;
}



.dock-btn-mac:hover {
  transform: scale(1.1);
}

.dock-btn-mac:active {
  transform: scale(0.95);
}


.dock-label {
  font-size: 0.85rem;
  color: #334155;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease-in-out;
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  backdrop-filter: blur(8px);
  padding: 0.4rem 1rem;
  border-radius: 12px;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  white-space: nowrap;
}

.dock-btn-mac:hover .dock-label {
  opacity: 1;
  bottom: -2.5rem;
}
</style>
