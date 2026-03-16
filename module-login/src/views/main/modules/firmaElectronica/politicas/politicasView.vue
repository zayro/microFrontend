<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useConfigStoreRef } from '@/stores/config'
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router'
import Card from 'primevue/card';

import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import { useMutation, useQuery } from '@tanstack/vue-query'
import Divider from 'primevue/divider';
import Fieldset from 'primevue/fieldset';
import Toast from 'primevue/toast';

import ProgressSpinner from 'primevue/progressspinner';


import { ApiFirmaElectronica } from '@/api/apiFirmaElectronica'

import { ApiInducciones } from '@/api/apiInducciones';

// import { CONSTANT } from '@/env/index.js'



const confStore = useConfigStoreRef()

const router = useRouter();


const formData = reactive({
  email: confStore.getUser.value.email, subject: 'Codigo Confirmacion', body: 'test', lista_consentimientos: [
    { name: "He leído y estoy de acuerdo con la información suministrada", checked: false },
    { name: "Otorgo mi consentimiento electrónico sobre el contenido del documento", checked: false }
  ]
})

const toast = useToast();

const validateForm = computed(() => {

  const validar = formData.lista_consentimientos.every(item => item.checked);

  return validar && validarArchivosDescargados()
})

const { sendVerificationEmail, consultarDocumentos } = ApiFirmaElectronica()

const { fetchInducciones, getFileInducciones } = ApiInducciones()

const lista_documentos = ref([]);
const lista_inducciones = ref([]);
const validar_lista_inducciones = ref([]);


const resultDocumentos = useQuery({
  queryKey: ['consultarDocumentos', confStore.getUser.value.username],
  queryFn: () => consultarDocumentos(confStore.getUser.value.username),
  enabled: !!confStore.getUser.value.username,
})

lista_documentos.value = (resultDocumentos.data);

// Usar correctamente useQuery: pasar una función como queryFn y key que incluya al usuario
const resultInducciones = useQuery({
  queryKey: ['fetchInducciones', confStore.getUser.value.username],
  queryFn: () => fetchInducciones(confStore.getUser.value.username),
  enabled: true,
  gcTime: 0,
  onSuccess: (data) => {
    console.log('Respuesta completa de fetchInducciones:', data);
    console.log('Tipo de respuesta:', typeof data);
    console.log('¿Tiene propiedad data?', 'data' in data);
    if (data?.data) {
      console.log('Contenido de data:', data.data);
    }
  }
})


lista_inducciones.value = (resultInducciones.data);




const onFormSubmit = async () => {

  console.log('Form submitted!', formData);

  const todosLosCamposCompletos = formData.lista_consentimientos.every(item => item.checked);

  if (todosLosCamposCompletos && validarArchivosDescargados()) {

    toast.add({ severity: 'success', summary: 'Formulario enviado correctamente.', life: 3000 });
    mutateSendEmail({ email: formData.email, identificacion: confStore.getUser.value.username });
    router.push({ name: 'verificarView' })
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.', life: 3000 });
  }

};

const toggleConsentimiento = (index) => {
  console.log('Toggling consentimiento at index:', index);
  console.log('Before toggle:', formData.lista_consentimientos[index].checked);
  formData.lista_consentimientos[index].checked = !formData.lista_consentimientos[index].checked;

};

// store response explicitly
const sendEmailResponse = ref(null);

const { mutate: mutateSendEmail, data, error, isPending, isError, isSuccess, isLoading } = useMutation({
  mutationFn: sendVerificationEmail,
  onSuccess: (response) => {
    console.log('sendVerificationEmail onSuccess:', response);
    sendEmailResponse.value = response;
    confStore.setCode(response.code)
  },
  onError: (err) => {
    console.error('sendVerificationEmail failed:', err);
  }
})


function compararArrays(a, b) {
  if (a.length !== b.length) return false;

  const mapa = new Map();

  for (let x of a) mapa.set(x, (mapa.get(x) || 0) + 1);
  for (let x of b) {
    if (!mapa.has(x)) return false;
    mapa.set(x, mapa.get(x) - 1);
  }

  return [...mapa.values()].every(v => v === 0);
}

const validarArchivosDescargados = (archivo) => {
  // Agregar archivo y limpiar nulos/vacíos
  validar_lista_inducciones.value = [...validar_lista_inducciones.value, archivo]
    .filter(x => x != null && x !== '');

  console.log('Archivo descargado (filtrado):', validar_lista_inducciones.value);

  // Obtener nombres de inducciones
  const lista_inducciones_nombres = (lista_inducciones.value?._object?.data?.data || []).map(induccion => induccion.nombre);

  // comparar con la lista de inducciones obtenida contra la lista de archivos descargados
  const todosDescargados = compararArrays(validar_lista_inducciones.value, lista_inducciones_nombres);

  console.log('Todos los archivos descargados:', todosDescargados);

  if (todosDescargados) {
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Todos los archivos han sido descargados.', life: 3000 });
    return true;
  } else {
    return false;
  }
}

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


onMounted(() => {
  document.body.style.overflowX = 'auto'
  document.body.style.overflowY = 'auto'
  document.title = 'Politicas y Consentimientos'

})



const URL_DOWNLOAD = "./pdf/inducciones/"
</script>

<template>

  <div class="flex flex-col min-h-screen items-center justify-between pt-16">
    <div class="flex items-center justify-center flex-1 w-full">



      <Card class="flex flex-col text-center py-6 px-4 rounded-lg w-full  shadow-lg backdrop-blur-sm mx-2"
        v-if="resultInducciones.isLoading.value === false && resultDocumentos.isLoading.value === false">
        <template #content>

          <Form @submit.prevent="onFormSubmit">

            <div class="card">
              <Fieldset legend="Consentimiento Firma Electrónica Gente Util S.A">
                <!-- <Button icon="pi pi-arrow-right" type="button" @click="toggleSidebar" /> -->

                <div class=" card flex justify-center">
                  <div class="flex justify-center flex-col gap-4">

                    <p class="text-justify">

                      El (la) suscrito(a) declara que firma este documento de manera electrónica, conforme a lo
                      establecido en la Ley 527 de 1999 y el Decreto 2364 de 2012, manifestando su consentimiento pleno,
                      expreso e informado.
                      La firma electrónica aquí utilizada identifica de manera inequívoca al firmante y refleja su
                      voluntad de aceptar el contenido del presente documento, otorgándole plena validez
                      jurídica y probatoria.</p>


                    <div class="flex flex-col gap-2">

                      <div class="card flex justify-center">
                        <div class="flex flex-col gap-4">
                          <div v-for="(consentimiento, index) of formData.lista_consentimientos"
                            :key="consentimiento.key" class="flex items-center gap-2">
                            <Checkbox :inputId="consentimiento.key" name="consentimiento" :value="consentimiento.name"
                              @change="toggleConsentimiento(index)" />
                            <label :for="consentimiento.key">{{ consentimiento.name }}</label>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </Fieldset>

              <Divider />



              <Fieldset legend="Formato de inducciones">

                <div class="card flex justify-center">
                  <div class="gap-4">
                    <p class="text-left">A continuación se relacionan las inducciones que ha realizado:</p>
                    <div class="card">
                      <div class=" flex  w-full  justify-between lg:flex-row sm:flex-col">

                        <div v-for="(induccion, index) in lista_inducciones.value?.data" :key="index"
                          class="p-2 md:p-4 lg:p-6">
                          <v-icon :name="'fa-file-pdf'" scale="1" :fill="'#800000'" />
                          <a v-bind:href="URL_DOWNLOAD + induccion.nombre" download
                            @click="validarArchivosDescargados(induccion.nombre)">{{ induccion.nombre }}</a>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </Fieldset>


              <Divider />
              <Fieldset legend="Firma electrónica de documentos">

                <div class="card flex justify-center">
                  <div class="flex justify-center flex-col gap-4">

                    <p>A continuación se relacionan los documentos que autorizo:</p>

                    <div class="card flex flex-wrap">



                      <span class="p-2" v-for="(doc, index) in lista_documentos.value?.data" :key="index"> <v-icon
                          :name="'fa-file-alt'" scale="1" :fill="'#1344a0'" /> {{
                            doc.nombredocumento
                          }}</span>

                    </div>




                    <Button type="submit" severity="primary" :disabled="!validateForm" label="Firmar" />
                  </div>
                </div>
              </Fieldset>




            </div>

          </Form>
        </template>
      </Card>

      <Card class="flex flex-col text-center py-6 px-4 rounded-lg w-full  shadow-lg backdrop-blur-sm mx-2" v-else>
        <template #content>
          <div class="flex flex-col gap-4">
            <h2>Bienvenido, {{ confStore.getUser.value.nombrecompleto }}</h2>
            <p>Cargando lista de archivos necesarios para continuar con el proceso de firma electrónica.</p>



            <div class="card flex justify-center">
              <ProgressSpinner />
            </div>


          </div>
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
