<script setup>
import { ref, onMounted } from 'vue'
import Dock from 'primevue/dock'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Dialog from 'primevue/dialog'
import imgBodyBackGround from '@/assets/img/background/pattern3_black.png'

const showInicio = ref(false)
const showPerfil = ref(false)
const showConfiguracion = ref(false)
const showSalir = ref(false)


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

  },
  {
    label: 'Configuración',
    icon: 'pi pi-cog',

  },
  {
    label: 'Salir',
    icon: 'pi pi-sign-out',
  }
])

const onDockItemClick = (event, item) => {
  console.log('Dock item clicked:', item);
  if (item.command) {
    item.command();
  }

  event.preventDefault();
};

onMounted(() => {




  document.title = 'Login'
  document.documentElement.style.setProperty('--animate-duration', '.9s')




})
</script>
<template>
  <div class="welcome-container">
    <h1>¡Bienvenido!</h1>
    <Divider />
    <div class="cards-container">
      <Card class="custom-card">
        <template #header>
          <div class="card-icon">
            <i class="pi pi-users"></i>
          </div>
        </template>
        <template #title> <span class="block text-center font-semibold text-lg">Monitoreo de Usuarios</span> </template>
        <template #content>
          <p class="text-justify">
            Supervisa la actividad y el estado de los usuarios en tiempo real. Accede a estadísticas, alertas y reportes
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
            Personaliza la información y preferencias de cada usuario. Administra roles, permisos y datos personales de
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
        <template #title> <span class="block text-center font-semibold text-lg">Reporte de Auditoría</span> </template>
        <template #content>
          <p class="text-justify">
            Genera y consulta reportes detallados de auditoría. Visualiza el historial de acciones y cumple con los
            estándares de seguridad y control.
          </p>
        </template>
      </Card>
    </div>
    <Divider />



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
    <Dialog v-model:visible="showInicio" header="Inicio" modal :style="{ width: '350px' }">
      <p>Bienvenido al inicio.</p>
    </Dialog>
    <Dialog v-model:visible="showPerfil" header="Perfil" modal :style="{ width: '350px' }">
      <p>Aquí puedes ver y editar tu perfil de usuario.</p>
    </Dialog>
    <Dialog v-model:visible="showConfiguracion" header="Configuración" modal :style="{ width: '350px' }">
      <p>Configura las opciones y preferencias de tu cuenta.</p>
    </Dialog>
    <Dialog v-model:visible="showSalir" header="Salir" modal :style="{ width: '350px' }">
      <p>¿Estás seguro que deseas salir?</p>
    </Dialog>
  </div>
</template>

<style scoped>
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
  background: linear-gradient(120deg, #d1d1d1 0%, #e4edf8 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2.5rem 1rem 7rem 1rem;
  position: relative;
  overflow-x: hidden;
}

.cards-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.custom-card {
  min-width: 260px;
  max-width: 320px;
  flex: 1 1 260px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 32px rgba(60, 72, 88, 0.14), 0 1.5px 8px rgba(59, 130, 246, 0.10);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(200, 220, 255, 0.18);
  margin-bottom: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
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
