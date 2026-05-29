<script setup>
import { ref, reactive, watch } from 'vue';
import { useConfigStoreRef } from '@/stores/config'

import { useMutation } from '@tanstack/vue-query'

import { useToast } from "primevue/usetoast";

import Card from 'primevue/card';

import Button from 'primevue/button';


import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

import Divider from 'primevue/divider';
import Fieldset from 'primevue/fieldset';
import Toast from 'primevue/toast';

import { ApiFirmaElectronica } from '@/api/apiFirmaElectronica'

const { verificationEmail } = ApiFirmaElectronica()

const confStore = useConfigStoreRef()

const toast = useToast();

const onFormSubmit = async () => {
  const ip = await fetchClientIp();
  const identificacion = confStore.getUser.value.username;
  //const token = confStore.getToken;
  const code = confStore.getCode;
  mutateVerificacion({ ...form, ip: ip, identificacion: identificacion, token: code })
  console.log('Form submitted!', form);

};


const form = reactive({
  email: confStore.getUser.value.email,
  code: ''

});

// función util
async function fetchClientIp() {
  const res = await fetch('https://api.ipify.org?format=json'); // CORS OK
  if (!res.ok) throw new Error('No se pudo obtener IP');
  const data = await res.json();
  return data.ip; // string, p.e. '203.0.113.42'
}


const { mutate: mutateVerificacion, data, error, isPending, isError, isSuccess, isLoading } = useMutation({
  mutationFn: verificationEmail,
})



watch(data, (val) => {
  if (val) {
    console.log('Data changed:', val);
  }
})

watch(isSuccess, (val) => {
  if (val) {
    toast.add({ severity: 'success', summary: 'Éxito', detail: '¡Ingreso exitoso!', life: 3000 })

  }
})

watch(isError, (val) => {
  if (val) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.value?.message || 'Error desconocido', life: 4000 })
  }
})


</script>

<template>

  <div class="flex flex-col min-h-screen items-center justify-between ">
    <div class="flex items-center justify-center flex-1 w-full">

      <Card class="flex flex-col text-center py-6 px-4 rounded-lg w-full  shadow-lg backdrop-blur-sm mx-2">
        <template #content>

          <Form @submit.prevent="onFormSubmit">

            <div class="card">
              <Fieldset legend="Verificar Firma Electrónica Gente Util S.A">

                <div class="card flex justify-center">
                  <div class="flex justify-center flex-col gap-4">

                    <p class="text-justify">Digite el código enviado a su celular/correo electrónico</p>


                    <div class="flex flex-col gap-2">


                      <div class="card flex justify-center">
                        <div class="flex items-center justify-center gap-3 mb-4">

                          <IconField icon-position="left" class="w-full">
                            <InputIcon id="codigo" class="pi pi-user" />
                            <InputText v-model.trim="form.code" type="text" class="flex-auto w-full"
                              placeholder="Codigo Verificacion" variant="filled" />
                          </IconField>
                        </div>
                        <div class="flex items-center justify-center gap-3 mb-4">
                          <Button type="submit" label="Verificar" class="w-full" />
                        </div>
                      </div>


                    </div>

                  </div>
                </div>
              </Fieldset>

              <Divider />


            </div>

          </Form>
        </template>
      </Card>




    </div>
  </div>

  <Toast />
</template>

<style scoped>
ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  /* Espacio para la viñeta */
  text-align: left;
  /* Alinea el texto a la izquierda */
}

.cards-container {
  display: flex;
  flex: 0 0 100%;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;
  /* Cambiado de stretch a center */
  margin: 0;
  /* Elimina el margen vertical */
  flex-wrap: wrap;
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
