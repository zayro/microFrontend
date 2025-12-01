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


import FileUpload from 'primevue/fileupload';

import { ApiFirmaElectronica } from '@/api/apiFirmaElectronica'

import { ApiInducciones } from '@/api/apiInducciones';

import { CONSTANT } from '@/env/index.js'


const SERVER = CONSTANT.URL.SERVER

const confStore = useConfigStoreRef()

const visible = ref(false);

const router = useRouter();


// 1. Declara el evento que puede emitir
// Nota: usamos 'enviar-sidebar' para que coincida con el listener en el padre
const emit = defineEmits(['enviar-sidebar']);

function toggleSidebar() {
  // 2. Emite el evento con los datos de la ruta
  visible.value = true;
  emit('enviar-sidebar', visible.value);
}



const formData = reactive({
  email: confStore.getUser.value.email, subject: 'Codigo Confirmacion', body: 'test', lista_consentimientos: [
    { name: "He leído y estoy de acuerdo con la información suministrada", checked: false },
    { name: "Otorgo mi consentimiento electrónico sobre el contenido del documento", checked: false }
  ]
})

const toast = useToast();

const validateForm = computed(() => {

  const validar = formData.lista_consentimientos.every(item => item.checked);
  console.log('validar', validar);
  return validar
})

const { sendVerificationEmail, consultarDocumentos, validarRostro } = ApiFirmaElectronica()

const { fetchInducciones, getFileInducciones } = ApiInducciones()

const lista_documentos = ref([]);
const lista_inducciones = ref([]);
const validacionRostro = ref(false);

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




const fileupload = ref();

const upload = async (event) => {
  if (fileupload.value.files && fileupload.value.files[0]) {
    try {
      const file = fileupload.value.files[0];
      const response = await validarRostro(file);
      console.log('Validación de rostro:', response);
      if (response.tiene_rostro) {
        validacionRostro.value = true;
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Rostro validado correctamente', life: 3000 });
        fileupload.value.clear(); // Limpia el input después de un envío exitoso
      } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se detectó un rostro en la imagen', life: 3000 });
      }
    } catch (error) {
      console.error('Error al validar rostro:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error al validar el rostro', life: 3000 });
    }
  } else {
    toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor seleccione una imagen', life: 3000 });
  }
};

const onUpload = () => {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};



const onFormSubmit = () => {

  console.log('Form submitted!', formData);

  const todosLosCamposCompletos = formData.lista_consentimientos.every(item => item.checked);

  if (todosLosCamposCompletos && validacionRostro.value) {
    toast.add({ severity: 'success', summary: 'Formulario enviado correctamente.', life: 3000 });
    mutateLogin({ ...formData })
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

const { mutate: mutateLogin, data, error, isPending, isError, isSuccess, isLoading } = useMutation({
  mutationFn: sendVerificationEmail,
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


onMounted(() => {
  document.body.style.overflowX = 'auto'
  document.body.style.overflowY = 'auto'
  document.title = 'Politicas y Consentimientos'

})


const URL_DOWNLOAD = SERVER + '/v1/pdf/getFile?file_name='
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

                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam facilis
                      fugiat corporis a sas
                      ducimus quae reiciendis accusamus cumque modi tempore sapiente alias in, ipsum vitae, quaerat
                      odio ad voluptatibus praesentium. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Incidunt omnis corporis accusantium praesentium dolorum, nam maiores provident fugiat delectus
                      reprehenderit ab deleniti hic totam repellendus ipsam sapiente, optio excepturi quidem!</p>


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

              <Fieldset legend="Validación de Rostro">
                <div class="card flex flex-wrap gap-6 items-center justify-between">
                  <FileUpload ref="fileupload" mode="basic" name="demo[]" accept="image/*" :maxFileSize="1000000"
                    filelabel="Imagen de rostro" chooseLabel="Seleccionar Imagen" uploadLabel="Validar Rostro"
                    @upload="onUpload" />
                  <Button label="Cargar Imagen" @click="upload" severity="secondary" />
                </div>
              </Fieldset>

              <Divider />

              <Fieldset legend="Inducciones Realizadas">

                <div class="card flex justify-center">
                  <div class="gap-4">
                    <p class="text-left">A continuación se relacionan las inducciones que ha realizado:</p>
                    <div class="card">
                      <div class=" flex  w-full  justify-between lg:flex-row sm:flex-col">





                        <div v-for="(induccion, index) in lista_inducciones.value?.data" :key="index"
                          class="p-2 md:p-4 lg:p-6">
                          <v-icon :name="'fa-file-pdf'" scale="1" :fill="'#800000'" />
                          <a v-bind:href="URL_DOWNLOAD + induccion.nombre" download>{{ induccion.nombre }}</a>
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
                    <p class="text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam facilis
                      fugiat corporis a
                      ducimus quae reiciendis accusamus cumque modi tempore sapiente alias in, ipsum vitae, quaerat
                      odio ad voluptatibus praesentium. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Incidunt omnis corporis accusantium praesentium dolorum, nam maiores provident fugiat delectus
                      reprehenderit ab deleniti hic totam repellendus ipsam sapiente, optio excepturi quidem!</p>
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
