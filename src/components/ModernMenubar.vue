<script setup>
import { defineProps, ref, onMounted, onUnmounted, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Password from 'primevue/password'
import Message from 'primevue/message'

import { Form } from '@primevue/forms'

import { useRouter } from 'vue-router';

import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'
import * as yup from 'yup'

import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useConfigStoreRef } from '@/stores/config'

import { ApiUser } from '@/api/apiUser'

const { getUpdatePassword } = ApiUser()

const router = useRouter();
const toast = useToast()
const showPerfil = ref(false)


const closeSession = () => {
  console.log('Cerrar sesión')
  // Aquí puedes agregar la lógica para cerrar sesión, como limpiar tokens, redirigir, etc.
  sessionStorage.clear() // Ejemplo: limpiar el almacenamiento de sesión
  localStorage.clear() // Ejemplo: limpiar el almacenamiento local
  router.push('/') // Redirigir al login después de cerrar sesión
}

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

const confStore = useConfigStoreRef()

console.log('Usuario en Menubar:', confStore.getUser.value)

const user = confStore.getUser

const appVersion = import.meta.env.VITE_APP_VERSION || '1.6'



const resolver = ref(
  zodResolver(
    z.object({
      password: z
        .string()
        .min(6, { message: 'Minimum 6 characters.' })
        .max(20, { message: 'Maximum 20 characters.' })
        .refine((value) => /[a-z]/.test(value), {
          message: 'Must have a lowercase letter.',
        })
        .refine((value) => /[A-Z]/.test(value), {
          message: 'Must have an uppercase letter.',
        })
        .refine((value) => /\d/.test(value), {
          message: 'Must have a number.',
        }),
    }),
  ),
)

const schema = yup.object({

  password: yup.string().required().min(6).label('Password'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required()
    .label('Password confirmation')
})

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema,
})


const [password] = defineField('password')
const [passwordConfirm] = defineField('passwordConfirm')

const {
  mutate: mutateGetUpdatePassword,
  data,
  error,
  isPending,
  isError,
  isSuccess,
  isLoading,
} = useMutation({
  mutationFn: getUpdatePassword,
})


const onSubmit = handleSubmit(
  (values) => {
    console.log('Submitted with', values)
    const payload = {
      identificacion: user.value.identificacion,
      password: password.value,
      newPassword: passwordConfirm.value,
    }
    mutateGetUpdatePassword(payload)
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

watch(isSuccess, (val) => {
  if (val) {
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'se actualizó la contraseña exitosamente!', life: 3000 })
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

const props = defineProps({
  title: {
    type: String,
    default: 'Bienvenido'
  },
  itemsBreadCrumb: {
    type: Array,
    default: () => [
      { label: 'Home', route: '/main' }
    ]
  }

})
</script>



<template>
  <Menubar class="modern-menubar">
    <template #start>

      <span class="font-bold text-shadow-sm uppercase font-mono"> Inscripción Hoja de Vida version {{ appVersion }}
      </span>

      <!--
      <div class="menu-traffic-lights">
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span>
      </div>
     <div>
           <Button label="Primary" variant="text" raised @click="visible = true">
          <span class="pi pi-fw pi-bars" />
        </Button>


      </div> -->


    </template>
    <template #end>

      <Button :label="'Usuario: ' + user.value.identificacion" icon="pi pi-user" variant="text" raised
        @click="showPerfil = true" />





    </template>
  </Menubar>

  <Dialog v-model:visible="showPerfil" modal :closable="true"
    :breakpoints="{ '960px': '75vw', '640px': '90vw', '480px': '100vw' }">
    <template #header>
      <div class="flex justify-between items-center w-full">
        <span class="font-bold whitespace-nowrap">Cambiar Clave</span>


      </div>
    </template>
    <Form id="createUser" name="createUser" autocomplete="on" v-slot="$form" :resolver="resolver" @submit="onSubmit">


      <!-- Password -->
      <div class="flex flex-col gap-2 mb-3">
        <IconField icon-position="left" class="w-full Message">
          <InputIcon class="pi pi-lock"> </InputIcon>
          <Password name="password" v-model="password" placeholder="Password" class="flex-auto w-full" variant="filled"
            :feedback="false" toggle-mask />
        </IconField>
        <template v-if="$form.password?.invalid">
          <Message v-for="(error, index) of $form.password.errors" :key="index" severity="error" size="small"
            variant="simple">{{ error.message }}</Message>
        </template>
      </div>

      <!-- Password Repeat -->
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



      <div class="flex gap-2 mb-3">
        <div class="flex w-full Message">
          <Button type="submit" label="Actualizar" class="w-full"></Button>
        </div>
      </div>

    </Form>
  </Dialog>
</template>


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
