<script setup>
import { computed, reactive, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStoreRef } from '@/stores/config'
import { useMutation } from '@tanstack/vue-query'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Image from 'primevue/image'
import { ApiUser } from '@/api/apiUser'

import login from '@/assets/img/login/logo_gu.png'

const form = reactive({ username: '', password: '' })
const confStore = useConfigStoreRef()
const router = useRouter()
const toast = useToast()

const showSessionPrompt = ref(false)
const currentUser = computed(() => confStore.getUser?.value?.username || confStore.getUser?.username || '')

const continueSession = () => {
  router.push({ name: 'hv' })
}

const closeSession = () => {
  confStore.resetAll()
  confStore.setUser({})
  showSessionPrompt.value = false
}

const validateForm = computed(() => form.username !== '' && form.password !== '')
const { postLoginMb } = ApiUser()

const {
  mutate: mutateLogin,
  data,
  error,
  isPending,
  isError,
  isSuccess,
  isLoading,
} = useMutation({
  mutationFn: postLoginMb,
})

const handleLogin = () => {
  mutateLogin({ ...form })
}

const goRouteCreate = () => {
  router.push({ name: 'createUserView' })
}

watch(data, (val) => {
  if (val) {
    console.log('Data changed:', val)
    confStore.setToken(val.token)
    confStore.setUser({
      username: val.username,
      identificacion: val.identificacion,
      email: val.email,
    })
  }
})

watch(isSuccess, (val) => {
  if (val) {
    toast.add({ severity: 'success', summary: 'Éxito', detail: '¡Ingreso exitoso!', life: 3000 })
    router.push({ name: 'hv' })
  }
})

watch(isError, (val) => {
  if (val) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.value?.message || 'Error desconocido',
      life: 4000,
    })
  }
})

onMounted(() => {
  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'
  document.title = 'Login'
  document.documentElement.style.setProperty('--animate-duration', '.9s')
  //document.body.style.background = `url(${imgBodyBackGround})`

  if (confStore.getToken) {
    showSessionPrompt.value = true
  }
})
</script>

<template>
  <div class="flex flex-col min-h-screen items-center justify-between background-main transition-colors duration-300">
    <div class="flex items-center justify-center flex-1 w-full">
      <Card
        class="flex flex-col text-center py-8 px-6 rounded-2xl w-full max-w-md shadow-lg backdrop-blur-md bg-[var(--p-surface-card)] transition-colors duration-300"
      >
        <template #content>
          <div v-if="showSessionPrompt">
            <div class="text-center mb-6">
              <div class="flex items-center justify-center">
                <Image :src="login" alt="Image" width="250" class="mx-auto mb-2" />
              </div>
              <h2 class="text-xl font-semibold mb-2 text-[var(--p-text-color)]">Hola, {{ currentUser }}</h2>
              <p class="mb-5 text-gray-500">
                Detectamos una sesión activa. ¿Deseas continuar en ella o cerrar tu sesión actual?
              </p>

              <div class="flex flex-col gap-3">
                <Button label="Continuar en sesión" icon="pi pi-arrow-right" class="w-full" @click="continueSession" />
                <Button
                  label="Cerrar sesión"
                  icon="pi pi-sign-out"
                  severity="secondary"
                  outlined
                  class="w-full"
                  @click="closeSession"
                />
              </div>
            </div>
          </div>

          <div v-else>
            <div class="text-center mb-6">
              <div class="flex items-center justify-center">
                <Image :src="login" alt="Image" width="250" class="mx-auto mb-2" />
              </div>
              <!-- <Avatar :image="avatar" class="mx-auto mb-2 " shape="circle" />
              <div class="text-3xl font-semibold mb-2 text-[var(--p-text-color)]">Gente Util</div> -->
              <!-- <span class="font-medium leading-6 text-[var(--p-text-secondary)]">Don't have an account?</span>
              <a class="font-medium no-underline ml-2 cursor-pointer text-[var(--p-primary-600)] hover:underline"
                @click="goRouteCreate()">Create today!</a> -->
            </div>

            <div class="flex items-center justify-center gap-3 mb-4">
              <IconField icon-position="left" class="w-full">
                <InputIcon id="username" class="pi pi-user" />
                <InputText
                  v-model.trim="form.username"
                  type="text"
                  class="flex-auto w-full"
                  placeholder="Username"
                  variant="filled"
                />
              </IconField>
            </div>

            <div class="flex items-center justify-center gap-3 mb-4">
              <IconField icon-position="left" class="w-full">
                <InputIcon class="pi pi-lock" />
                <InputText
                  v-model.trim="form.password"
                  type="password"
                  class="flex-auto w-full"
                  placeholder="Password"
                  variant="filled"
                />
              </IconField>
            </div>

            <div class="flex items-center justify-center gap-3 mb-4">
              <Button
                type="button"
                label="Ingresar"
                class="w-full"
                :disabled="!validateForm"
                @click="handleLogin(form)"
              />
            </div>

            <div class="text-center mb-5">
              <span class="font-medium text-600">
                Crear un usuario si no tienes cuenta de acceso
                <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="goRouteCreate()"
                  >Click Aqui</a
                >
              </span>
            </div>

            <!-- <div class="flex items-center justify-center gap-2 mb-2">
              <span class="font-medium text-[var(--p-text-secondary)]">
                Did you forget your
                <a class="font-semibold cursor-pointer hover:text-[var(--p-primary-500)] transition-colors duration-300"
                  @click="goRouteRecovery()">
                  password?
                </a>
              </span>
            </div> -->
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.p-avatar {
  width: 100px;
  height: 100px;
  border: none !important;
  box-shadow:
    0 8px 32px rgba(31, 38, 135, 0.25),
    0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
}

.p-avatar:hover {
  transform: translateY(-2px);
  box-shadow:
    0 12px 40px rgba(31, 38, 135, 0.35),
    0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Elimina fondo y color fijos, usa variables de PrimeVue */
.p-card {
  background: var(--p-card-background);
  color: var(--p-text-color);
  border-radius: 1.25rem;
  box-shadow: var(--p-card-shadow);
  transition:
    background 0.3s,
    color 0.3s;
}

.p-overflow-hidden {
  filter: blur(6px) grayscale(40%);
  height: 100vh;
}

.p-avatar {
  width: 100px;
  height: 100px;
}

body {
  backdrop-filter: blur(4px);
}
</style>
