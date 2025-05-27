<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Dock from 'primevue/dock'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import Menubar from 'primevue/menubar'



const showInicio = ref(false)
const showPerfil = ref(false)
const showConfiguracion = ref(false)
const showSalir = ref(false)

// Variables para fullscreen
const fullscreenInicio = ref(false)
const fullscreenPerfil = ref(false)
const fullscreenConfiguracion = ref(false)
const fullscreenSalir = ref(false)


const currentTime = ref('')

function updateTime() {
  const now = new Date()
  const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' }
  currentTime.value = now.toLocaleTimeString('es-ES', options).replace('.', ':')
}

let intervalId



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

onMounted(() => {

  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'


  document.title = 'Welcome'

  updateTime()
  intervalId = setInterval(updateTime, 1000 * 60) // Actualiza cada minuto

})

onUnmounted(() => {
  clearInterval(intervalId)
})

</script>

<template>
  <div>
    <!-- Menubar moderno -->
    <Menubar class="modern-menubar">
      <template #start>
        <div class="menu-traffic-lights">
          <span class="red"></span>
          <span class="yellow"></span>
          <span class="green"></span>
        </div>
        <div>
          <span><Strong>Bienvenido</Strong></span>
        </div>
      </template>

      <template #end>

        <i class="pi pi-wifi px-2" />
        <i class="pi pi-volume-up px-2" />
        <span class="px-2">{{ currentTime }}</span>
        <!-- <i class="pi pi-search px-2" /> -->
        <!-- <i class="pi pi-bars px-2" /> -->
      </template>
    </Menubar>

    <div class="welcome-container">


      <div class="cards-container">
        <Card class="custom-card">
          <template #header>
            <div class="card-icon">
              <i class="pi pi-users"></i>
            </div>
          </template>
          <template #title> <span class="block text-center font-semibold text-lg">Monitoreo de Usuarios</span>
          </template>
          <template #content>
            <p class="text-justify">
              Supervisa la actividad y el estado de los usuarios en tiempo real. Accede a estadísticas, alertas y
              reportes
              de uso para una gestión eficiente.
            </p>
          </template>
        </Card>
        <Card class="custom-card">
          <template #header>
            <div class="card-icon">
              <i class="pi pi-cog"></i>
            </div>
          </template>
          <template #title> <span class="block text-center font-semibold text-lg">Configuración de Usuario</span>
          </template>
          <template #content>
            <p class="text-justify">
              Personaliza la información y preferencias de cada usuario. Administra roles, permisos y datos personales
              de
              manera sencilla y segura.
            </p>
          </template>
        </Card>
        <Card class="custom-card">
          <template #header>
            <div class="card-icon">
              <i class="pi pi-file"></i>
            </div>
          </template>
          <template #title> <span class="block text-center font-semibold text-lg">Reporte de Auditoría</span>
          </template>
          <template #content>
            <p class="text-justify">
              Genera y consulta reportes detallados de auditoría. Visualiza el historial de acciones y cumple con los
              estándares de seguridad y control.
            </p>
          </template>
        </Card>
      </div>


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
            <button class="ml-auto text-blue-600 hover:text-blue-800" @click="toggleFullscreen('inicio')">
              <i :class="fullscreenInicio ? 'pi pi-window-minimize' : 'pi pi-window-maximize'"></i>
            </button>
          </div>
        </template>
        <p>Bienvenido al inicio.</p>
      </Dialog>

      <Dialog v-model:visible="showPerfil" modal
        :style="fullscreenPerfil ? { width: '100vw', height: '100vh', maxWidth: '100vw', top: '0', left: '0', margin: '0', padding: '0' } : { width: '350px' }"
        :contentStyle="fullscreenPerfil ? { height: 'calc(100vh - 4rem)', overflow: 'auto' } : {}"
        :draggable="!fullscreenPerfil" :closable="true">
        <template #header>
          <div class="flex justify-between items-center w-full">
            <span>Perfil</span>
            <button class="ml-auto text-blue-600 hover:text-blue-800" @click="toggleFullscreen('perfil')">
              <i :class="fullscreenPerfil ? 'pi pi-window-minimize' : 'pi pi-window-maximize'"></i>
            </button>
          </div>
        </template>
        <p>Aquí puedes ver y editar tu perfil de usuario.</p>
      </Dialog>

      <Dialog v-model:visible="showConfiguracion" modal
        :style="fullscreenConfiguracion ? { width: '100vw', height: '100vh', maxWidth: '100vw', top: '0', left: '0', margin: '0', padding: '0' } : { width: '350px' }"
        :contentStyle="fullscreenConfiguracion ? { height: 'calc(100vh - 4rem)', overflow: 'auto' } : {}"
        :draggable="!fullscreenConfiguracion" :closable="true">
        <template #header>
          <div class="flex justify-between items-center w-full">
            <span>Configuración</span>
            <button class="ml-auto text-blue-600 hover:text-blue-800" @click="toggleFullscreen('configuracion')">
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
            <button class="ml-auto text-blue-600 hover:text-blue-800" @click="toggleFullscreen('salir')">
              <i :class="fullscreenSalir ? 'pi pi-window-minimize' : 'pi pi-window-maximize'"></i>
            </button>
          </div>
        </template>
        <p>¿Estás seguro que deseas salir?</p>
      </Dialog>

    </div>
  </div>
</template>

<style scoped>
/* Menubar estilo Mac/Windows */

.modern-menubar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.1);
  border-radius: 2px;
}

.mac-menubar {

  left: 0;
  top: 0;
  background: var(--surface-ground, rgba(255, 255, 255, 0.85));
  backdrop-filter: blur(16px);
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 24px rgba(60, 72, 88, 0.10);
  border-bottom: 1px solid var(--surface-border, #e5e7eb);
  padding: 0.2rem 2.5rem 0.2rem 1.2rem;
  font-size: 1.08rem;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 1300;
}

.mac-menubar .p-menubar-root,
.mac-menubar .p-menubar {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
}

.mac-menubar .p-menuitem-link {
  border-radius: 12px;
  transition: background 0.18s, color 0.18s;
  padding: 0.45rem 1.1rem;
  color: #334155;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mac-menubar .p-menuitem-link:hover,
.mac-menubar .p-menuitem-link.p-menuitem-active {
  background: linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%);
  color: #fff;
}

.mac-menubar .pi {
  margin-right: 0.5rem;
  font-size: 1.15rem;
  opacity: 0.85;
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
  border: 1.5px solid #e5e7eb;
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


/*
* DOCK STYLES
*/
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
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
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

  pointer-events: none;
}

.cards-container {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;
  /* Cambiado de stretch a center */
  margin: 0;
  /* Elimina el margen vertical */
  flex-wrap: wrap;
}

.custom-card {
  min-width: 260px;
  max-width: 320px;
  flex: 1 1 260px;
  border-radius: 20px;
  background: var(--surface-card, #fff);
  box-shadow: 0 8px 32px rgba(60, 72, 88, 0.14), 0 1.5px 8px rgba(59, 130, 246, 0.10);
  border: 1px solid var(--surface-border, #e5e7eb);
  margin-bottom: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  color: var(--text-color, #334155);
  position: relative;
  z-index: 1;
}


.custom-card:hover {
  transform: translateY(-10px) scale(1.04);
  box-shadow: 0 12px 32px rgba(60, 72, 88, 0.22);
}

.card-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  border-radius: 50%;
  width: 64px;
  height: 64px;
  margin: 1.5rem auto 0.5rem auto;
  font-size: 2rem;
  color: #fff;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}

h1 {
  margin-bottom: 0.5rem;
  color: #2563eb;
  font-weight: 800;
  text-align: center;
  font-size: 3.3rem;
  letter-spacing: -1px;
  text-shadow: 0 2px 8px rgba(59, 130, 246, 0.08);
}

p {
  margin-bottom: 2rem;
  color: #64748b;
  font-size: 1.1rem;
  text-align: center;
}

.cards-container {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  align-items: stretch;
  margin: 2.5rem 0;
  flex-wrap: wrap;
}
</style>
