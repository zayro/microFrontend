<script setup>

import { computed, reactive, onMounted, watch } from 'vue'

import { useRouter } from 'vue-router'

import { useConfigStoreRef } from '@/stores/config'

import { useMutation } from '@tanstack/vue-query'
import { useToast } from 'primevue/usetoast';

// import swal from 'sweetalert'

import Card from 'primevue/card';

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';

import { ApiUser } from '@/api/apiUser'

import imgBodyBackGround from '@/assets/img/background/pattern5_black.png'
import avatar from '@/assets/img/profile/avatar/user_256x256.png'

const form = reactive({ username: '', password: '' })

//const avatar = '/img/profile/avatar/user_256x256.png'

const conf = useConfigStoreRef(); // Instancia de ConfigStore
const router = useRouter(); // Instancia de Router
const toast = useToast(); // Instancia de Toast

// check if both password and email have been set for enabling login button
const validateForm = computed(() => {
  return form.username !== '' && form.password !== ''
})


const { postLogin } = ApiUser()

const goRouteCreate = () => {
  router.push({ name: 'createUserView' })
}

const goRouteRecovery = () => {
  router.push({ name: 'recoveryPass' })
}



// Cambia useQuery por useMutation
const { mutate: mutateLogin, data, error, isPending, isError, isSuccess, isLoading } = useMutation({
  mutationFn: postLogin,
})

const handleLogin = () => {
  mutateLogin({ ...form }) // Ejecuta postLogin solo al hacer clic
}



watch(data, (val) => {
  console.log('response', val.data)
  if (val) {
    conf.setToken(val.data.token)
  }
})


watch(isSuccess, (val) => {
  if (val) {
    toast.add({ severity: 'success', summary: 'Éxito', detail: '¡Ingreso exitoso!', life: 3000 })
    // Puedes redirigir aquí si lo deseas
    router.push({ name: 'welcomeView' })
  }
})

watch(isError, (val) => {
  if (val) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.value?.message || 'Error desconocido', life: 4000 })
  }
})


onMounted(() => {

  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'


  document.title = 'Login'
  document.documentElement.style.setProperty('--animate-duration', '.9s')
  document.body.style.background = `url(${imgBodyBackGround})`


})
</script>

<template>




  <div class="flex flex-col min-h-screen items-center justify-between ">
    <div class="flex items-center justify-center flex-1 w-full">
      <Card class="flex flex-col text-center py-6 px-4 rounded-lg w-full md:w-1/4 lg:w-1/2 shadow-lg backdrop-blur-sm">
        <template #content>
          <div class="text-center mb-5">
            <Avatar :image="avatar" class="mr-2" />
            <div class=" text-3xl font-medium mb-3">Welcome Back</div>
            <span class=" font-medium leading-6">Don't have an account?</span>
            <a class="font-medium no-underline ml-2   cursor-pointer" @click="goRouteCreate()">Create
              today!</a>
          </div>

          <div class="flex items-center justify-center gap-3 mb-3">
            <IconField icon-position="left" class="w-full md:max-w-md">
              <InputIcon id="username" class="pi pi-user"></InputIcon>
              <InputText v-model.trim="form.username" type="text" class="flex-auto w-full" placeholder="Username"
                variant="filled" />
            </IconField>
          </div>

          <div class="flex items-center justify-center gap-3 mb-3">
            <IconField icon-position="left" class="w-full md:max-w-md">
              <InputIcon class="pi pi-lock"></InputIcon>
              <InputText v-model.trim="form.password" type="password" class="flex-auto w-full" placeholder="Password"
                variant="filled" />
            </IconField>
          </div>

          <div class="flex items-center justify-center gap-3 mb-3">
            <div class="flex w-full md:max-w-md">
              <Button type="button" label="Sign Up" class="w-full" :disabled="!validateForm"
                @click="handleLogin(form)"></Button>
            </div>
          </div>

          <div class="flex items-center justify-center gap-2 mb-3">
            <span class="font-medium text-gray-600">
              Did you forget your
              <a class="font-semibold cursor-pointer hover:text-primary transition-colors duration-300"
                severity="secondary" @click="goRouteRecovery()">
                password ?
              </a>
            </span>
          </div>
        </template>
      </Card>
    </div>
  </div>





</template>

<style scoped="css">
.p-avatar {
  width: 120px;
  height: 120px;
}

body {
  backdrop-filter: blur(4px);
}
</style>
