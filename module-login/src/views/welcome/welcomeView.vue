<script setup>
import { onMounted } from 'vue'
import Card from 'primevue/card'
import MacDock from '@/components/MacDock.vue'
import ModernMenubar from '@/components/ModernMenubar.vue'




onMounted(() => {

  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'

  document.title = 'Welcome'

})


</script>

<template>
  <div>
    <!--Header Menubar -->

    <ModernMenubar :title="'Bienvenido'" :currentTime="currentTime" />


    <!--Content Main -->
    <div class="welcome-container">


      <div class="cards-container">
        <Card
          class="flex flex-col text-center py-6 px-4 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl shadow-lg backdrop-blur-sm mx-2">
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
        <Card
          class="flex flex-col text-center py-6 px-4 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl shadow-lg backdrop-blur-sm mx-2">
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
        <Card
          class="flex flex-col text-center py-6 px-4 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl shadow-lg backdrop-blur-sm mx-2">
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

    </div>

    <!-- Footer moderno -->
    <MacDock />

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
  background: var(--p-surface-card, #fff);
  box-shadow: 0 8px 32px rgba(60, 72, 88, 0.14), 0 1.5px 8px rgba(59, 130, 246, 0.10);
  border: 1px solid var(--p-surface-border, #e5e7eb);
  margin-bottom: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  color: var(--p-text-color, #2c5185);
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
  background: linear-gradient(135deg, var(--p-primary-500) 0%, var(--p-primary-500) 100%);
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
