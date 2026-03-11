<template>
  <Menubar class="modern-menubar">
    <template #start>
      <div class="menu-traffic-lights">
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span>
      </div>

      <!--         <Button label="Primary" variant="text" raised @click="visible = true">
          <span class="pi pi-fw pi-bars" />
        </Button>
 -->



      <Breadcrumb :home="home" :model="itemsBreadcrumb">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']" />
              <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>



    </template>
    <template #end>


      <Button :label="confStore.getUser.value.nombrecompleto" variant="text" />


      <!-- <Button icon="pi pi-wifi" variant="text" severity="success" rounded aria-label="Wifi" /> -->


      <Button icon="pi pi-power-off" variant="text" severity="danger" rounded aria-label="Power Off"
        @click="closeSession" />

      <Button :label="currentTime" severity="secondary" variant="text" />

    </template>
  </Menubar>

  <div class="card flex justify-content-center">
    <Sidebar v-model:visible="visible" header="Menu">


      <div class="card flex justify-center">
        <Menu :model="items" class="full-menu w-full">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </template>
        </Menu>
      </div>

    </Sidebar>

  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted } from 'vue'
import Menubar from 'primevue/menubar'
import { useConfigStoreRef } from '@/stores/config'
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import Breadcrumb from 'primevue/breadcrumb';

import { useRouter } from 'vue-router';

const home = ref({
  icon: 'pi pi-home',
  route: '/main'
});
const router = useRouter();

const items = ref([
  {
    label: 'Router Link',
    icon: 'pi pi-palette',
    route: '/theming/unstyled'
  },
  {
    label: 'Programmatic',
    icon: 'pi pi-link',
    command: () => {
      router.push('/introduction');
    }
  },
  {
    label: 'External',
    icon: 'pi pi-home',
    url: 'https://vuejs.org/'
  }
]);

const closeSession = () => {
  console.log('Cerrar sesión')
  sessionStorage.clear() // Limpia el almacenamiento de sesión
  localStorage.clear() // Limpia el almacenamiento local

  // Aquí puedes agregar la lógica para cerrar sesión, como limpiar tokens, redirigir, etc.
  router.push('/') // Redirige al login después de cerrar sesión
}

const confStore = useConfigStoreRef()

console.log('Usuario en Menubar:', confStore.getUser.value)

const currentTime = ref('')

const visible = ref(false)

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
  itemsBreadcrumb: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.full-menu a {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--p-text-color, #212121);
}

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
