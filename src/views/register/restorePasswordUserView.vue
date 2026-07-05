<script setup>
import { ref, onMounted, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useMutation } from '@tanstack/vue-query'

import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'

import Message from 'primevue/message'
import { Form } from '@primevue/forms'

import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'


import avatar_create from '@/assets/img/profile/avatar/user_256x256.png'
import { ApiUser } from '@/api/apiUser'

const { getRecoveryPassword } = ApiUser()

const toast = useToast()


const schema = yup.object({
  email: yup.string().required().email().label('Email address'),
})

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema,
})


const [email] = defineField('email')

const router = useRouter()

const goRouteLogin = () => {
  router.push({ name: 'defaultView' })
}

const onSubmit = handleSubmit(
  (values) => {
    console.log('Submitted with', values)
    const payload = {
      email: email.value
    }
    mutateGetRecoveryPassword(payload)
  },
  ({ errors }) => {
    Object.values(errors).forEach((message) => {
      toast.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail: message,
        life: 4000,
      })
    })
  }
)

const {
  mutate: mutateGetRecoveryPassword,
  data,
  error,
  isPending,
  isError,
  isSuccess,
  isLoading,
} = useMutation({
  mutationFn: getRecoveryPassword,
})

watch(isSuccess, (val) => {
  if (val) {
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Se envió el correo de recuperación exitosamente!', life: 3000 })
    router.push({ name: 'defaultView' })
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
  document.title = 'Recuperar Clave - GenteUtil'
  document.documentElement.style.setProperty('--animate-duration', '.9s')
  //document.body.style.background = `url(${imgBodyBackGround})`
})
</script>

<template>
  <div class="flex flex-col min-h-screen items-center justify-between background-main transition-colors duration-300">
    <div class="flex items-center justify-center flex-1 w-full">
      <Card
        class="flex flex-col text-center py-8 px-6 rounded-2xl w-full max-w-md shadow-lg backdrop-blur-md bg-[var(--p-surface-card)] transition-colors duration-300">
        <template #content>
          <div class="text-center mb-5">
            <Avatar :image="avatar_create" size="xlarge" />
            <div class="text-900 text-3xl font-medium mb-3">Recuperar clave</div>

            <Button label="Volver a Iniciar Sesión" variant="outlined" icon="pi pi-arrow-left"
              @click="goRouteLogin()" />
          </div>
          <Form id="createUser" name="createUser" autocomplete="on" v-slot="$form" :resolver="resolver"
            @submit="onSubmit">

            <div class="flex flex-col gap-2 mb-3">
              <IconField icon-position="left" class="w-full Message">
                <InputIcon id="email" class="pi pi-envelope"> </InputIcon>
                <InputText v-model.trim="email" type="email" class="flex-auto w-full" placeholder="Email"
                  variant="filled" aria-describedby="email-help" />
              </IconField>
              <Message v-if="errors.email" id="email-help" class="p-error">{{ errors.email }}</Message>
            </div>


            <div class="flex gap-2 mb-3">
              <div class="flex w-full Message">
                <Button type="submit" label="Enviar" class="w-full"></Button>
              </div>
            </div>

          </Form>
        </template>
      </Card>
    </div>
  </div>
</template>
<style>
.p-avatar {
  width: 120px;
  height: 120px;
}

.p-password-input {
  width: 25rem;
  padding-left: 2.5rem;
}

p-avatar {
  width: 200px;
  height: 200px;
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

.p-avatar {
  width: 100px;
  height: 100px;
}

body {
  backdrop-filter: blur(4px);
}
</style>
