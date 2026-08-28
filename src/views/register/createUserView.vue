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
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'
import { Form } from '@primevue/forms'
import swal from 'sweetalert'

import { useRouter } from 'vue-router'

import { http } from '@/services/http-axios'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

import avatar_create from '@/assets/img/profile/avatar/user_256x256.png'
import { ApiUser } from '@/api/apiUser'

const { postRegisterUser } = ApiUser()

const toast = useToast()
const resolver = ref(
  zodResolver(
    z.object({
      password: z
        .string()
        .min(6, { message: 'Minimo 6 caracteres.' })
        .max(20, { message: 'Maximo 20 caracteres.' })
        .refine((value) => /[a-z]/.test(value), {
          message: 'Debe tener una minuscula.',
        })
        .refine((value) => /[A-Z]/.test(value), {
          message: 'Debe tener una mayuscula.',
        })
        .refine((value) => /\d/.test(value), {
          message: 'Debe tener un numero.',
        }),
    }),
  ),
)

const schema = yup.object({
  email: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('Debe ser un correo electrónico válido')
    .label('Dirección de email'),
  username: yup
    .string()
    .required('El nombre de usuario es obligatorio')
    .label('Nombre de usuario'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .label('Contraseña'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('La confirmación de contraseña es obligatoria')
    .label('Confirmación de contraseña'),
  terms: yup
    .boolean()
    .required('Debe aceptar los términos y condiciones')
    .isTrue('Debe aceptar los términos y condiciones')
    .label('Aceptación de términos y condiciones'),
})

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema,
})

const [username] = defineField('username')
const [email] = defineField('email')
const [password] = defineField('password')
const [passwordConfirm] = defineField('passwordConfirm')
const [terms] = defineField('terms')

// const form = reactive({ username: '', password: '', email: '', repeat: '' })

const router = useRouter()

const goRouteLogin = () => {
  router.push({ name: 'defaultView' })
}



const onSubmit = handleSubmit(
  (values) => {
    console.log('Submitted with', values)
    const payload = {
      identificacion: username.value,
      email: email.value,
      password: password.value,
      username: username.value,
    }
    mutatePostRegisterUser(payload)
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
  mutate: mutatePostRegisterUser,
  data,
  error,
  isPending,
  isError,
  isSuccess,
  isLoading,
} = useMutation({
  mutationFn: postRegisterUser,
})

watch(isSuccess, (val) => {
  if (val) {
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Se creo usuario exitosamente!', life: 3000 })
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
  document.title = 'Crear Usuario'
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
            <Avatar :image="avatar_create" size="xlarge" class="mr-2" />
            <div class="text-900 text-3xl font-medium mb-3">Crear Usuario</div>

            <Button label="Volver a Iniciar Sesión" variant="outlined" icon="pi pi-arrow-left"
              @click="goRouteLogin()" />

          </div>
          <Form id="createUser" name="createUser" autocomplete="on" v-slot="$form" :resolver="resolver"
            @submit="onSubmit">
            <div class="flex flex-col gap-2 mb-3">
              <IconField icon-position="left" class="w-full Message">
                <InputIcon id="username" class="pi pi-user"> </InputIcon>
                <InputText v-model.trim="username" type="text" class="flex-auto w-full"
                  placeholder="Numero Identificacion" variant="filled" aria-describedby="username-help" />
              </IconField>
              <Message v-if="errors.username" aria-describedby="username-help" class="p-error">{{
                errors.username
                }}</Message>
            </div>

            <div class="flex flex-col gap-2 mb-3">
              <IconField icon-position="left" class="w-full Message">
                <InputIcon id="email" class="pi pi-envelope"> </InputIcon>
                <InputText v-model.trim="email" type="email" class="flex-auto w-full" placeholder="Email"
                  variant="filled" aria-describedby="email-help" />
              </IconField>
              <Message v-if="errors.email" id="email-help" class="p-error">{{ errors.email }}</Message>
            </div>

            <!-- Password -->

            <div class="flex flex-col gap-2 mb-3">
              <IconField icon-position="left" class="w-full Message">
                <InputIcon class="pi pi-lock"> </InputIcon>

                <Password name="password" v-model="password" placeholder="Password" class="flex-auto w-full"
                  variant="filled" :feedback="false" toggle-mask />
              </IconField>
              <template v-if="$form.password?.invalid">
                <Message v-for="(error, index) of $form.password.errors" :key="index" severity="error" size="small"
                  variant="simple">{{ error.message }}</Message>
              </template>
            </div>

            <!-- Repeat -->

            <div class="flex flex-col gap-2 mb-3">
              <IconField icon-position="left" class="w-full Message">
                <InputIcon class="pi pi-lock"> </InputIcon>

                <Password v-model="passwordConfirm" class="w-full" placeholder="Repetir Password" variant="filled"
                  :feedback="false" toggle-mask />
              </IconField>
              <Message v-if="errors.passwordConfirm" id="email-help" class="p-error">{{
                errors.passwordConfirm
                }}</Message>
            </div>

            <!-- Termins -->

            <div class="flex gap-2 mb-3">
              <Checkbox v-model="terms" :binary="true" />
              <label for="checkbox" class="text-900 font-medium"> He leído los</label>
              <a class="text-600 cursor-pointer hover:text-primary cursor-pointer">Términos y Condiciones</a>
            </div>

            <div class="flex gap-2 mb-3">
              <div class="flex w-full Message">
                <Button type="submit" label="Registrarse" class="w-full"></Button>
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
