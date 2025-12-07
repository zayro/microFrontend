<template>
  <div class="form-demo">


    <div class="card  gap-3 mb-4">
      <Panel toggleable>
        <template #header>
          <div class="flex items-center gap-2">
            <strong class="font-bold">DATOS PERSONALES</strong>
          </div>
        </template>
        <template #icons>
          <Button icon="pi pi-pen-to-square" severity="secondary" rounded text
            @click="visible_datos_personales = true" />



        </template>
        <p class="m-0">
          Editar Informacion Personal dar click en el icono de lapiz. <Button icon="pi pi-pen-to-square"
            severity="secondary" rounded text @click="visible_datos_personales = true" />
        </p>
      </Panel>
    </div>


    <div class="card  gap-3 mb-4">
      <Panel toggleable>
        <template #header>
          <div class="flex items-center gap-2">
            <strong class="font-bold">Experiencia laboral</strong>
          </div>
        </template>
        <template #icons>
          <Button icon="pi pi-pen-to-square" severity="secondary" rounded text
            @click="visible_datos_personales = true" />



        </template>
        <p class="m-0">
          Editar Informacion Personal dar click en el icono de lapiz. <Button icon="pi pi-pen-to-square"
            severity="secondary" rounded text @click="visible_datos_personales = true" />
        </p>

        <p>
          Añadir nueva experiencia laboral dar click en el icono de mas. <Button icon="pi pi-plus" severity="secondary"
            rounded text @click="visible_datos_personales = true" />
        </p>
      </Panel>
    </div>


    <div class="card  gap-3 mb-4">
      <Panel toggleable>
        <template #header>
          <div class="flex items-center gap-2">
            <strong class="font-bold">Estudios</strong>
          </div>
        </template>
        <template #icons>
          <Button icon="pi pi-pen-to-square" severity="secondary" rounded text
            @click="visible_datos_personales = true" />



        </template>
        <p class="m-0">
          Editar Informacion Personal dar click en el icono de lapiz. <Button icon="pi pi-pen-to-square"
            severity="secondary" rounded text @click="visible_datos_personales = true" />
        </p>

        <p>
          Añadir nueva experiencia laboral dar click en el icono de mas. <Button icon="pi pi-plus" severity="secondary"
            rounded text @click="visible_datos_personales = true" />
        </p>
      </Panel>
    </div>


    <div v-if="submitted" class="p-mt-3 p-message p-message-success">
      ¡Formulario enviado correctamente!
    </div>

    <Dialog v-model:visible="visible_datos_personales" modal header="Editar Informacion." :style="{ width: '75rem' }">

      <form @submit.prevent="onSubmit" novalidate>

        <div class="card flex flex-row flex-wrap justify-start gap-2 items-center  justify-content-center">

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.datos_personales.primer_nombre" placeholder="Primer nombre" id="primer_nombre"
                  size="small" :class="{ 'p-invalid': errors.datos_personales.primer_nombre }" />
              </IconField>
              <label for="primer_nombre">Primer nombre</label>
              <small v-if="errors.datos_personales.primer_nombre" class="p-error">{{
                errors.datos_personales.primer_nombre
              }}</small>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.datos_personales.segundo_nombre" placeholder="Segundo nombre"
                  id="segundo_nombre" size="small" :class="{ 'p-invalid': errors.datos_personales.segundo_nombre }" />
              </IconField>
              <label for="segundo_nombre">Segundo nombre</label>
              <small v-if="errors.datos_personales.segundo_nombre" class="p-error">{{
                errors.datos_personales.segundo_nombre
              }}</small>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.datos_personales.primer_apellido" placeholder="Primer apellido"
                  id="primer_apellido" size="small" :class="{ 'p-invalid': errors.datos_personales.primer_apellido }" />
              </IconField>
              <label for="primer_nombre">Primer nombre</label>
              <small v-if="errors.datos_personales.primer_nombre" class="p-error">{{
                errors.datos_personales.primer_nombre
              }}</small>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.datos_personales.segundo_apellido" placeholder="Segundo apellido"
                  id="segundo_apellido" size="small"
                  :class="{ 'p-invalid': errors.datos_personales.segundo_apellido }" />
              </IconField>
              <label for="primer_nombre">Primer nombre</label>
              <small v-if="errors.datos_personales.segundo_apellido" class="p-error">{{
                errors.datos_personales.segundo_apellido
              }}</small>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.datos_personales.correo_electronico" placeholder="Correo electrónico"
                  id="correo_electronico" size="small"
                  :class="{ 'p-invalid': errors.datos_personales.correo_electronico }" />
              </IconField>
              <label for="correo_electronico">Correo electrónico</label>
              <small v-if="errors.datos_personales.correo_electronico" class="p-error">{{
                errors.datos_personales.correo_electronico
              }}</small>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.datos_personales.telefono" placeholder="Teléfono" id="telefono" size="small"
                  :class="{ 'p-invalid': errors.datos_personales.telefono }" />
              </IconField>
              <label for="telefono">telefono</label>
              <small v-if="errors.datos_personales.telefono" class="p-error">{{
                errors.datos_personales.telefono
              }}</small>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <Dropdown class="w-[181px]" id="option" v-model="form.datos_personales.option" :options="options"
                  optionLabel="label" placeholder="" :class="{ 'p-invalid': errors.datos_personales.option }" />
                <small v-if="errors.datos_personales.option" class="p-error">{{ errors.datos_personales.option
                  }}</small>
              </IconField>
              <label for="numero_documento">Tipo Documento</label>
              <small v-if="errors.datos_personales.numero_documento" class="p-error">{{
                errors.datos_personales.numero_documento
              }}</small>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.datos_personales.numero_documento" placeholder="Número de documento"
                  id="numero_documento" size="small"
                  :class="{ 'p-invalid': errors.datos_personales.numero_documento }" />
              </IconField>
              <label for="numero_documento">Numero Documento</label>
              <small v-if="errors.datos_personales.numero_documento" class="p-error">{{
                errors.datos_personales.numero_documento
              }}</small>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.datos_personales.direccion_residencia" placeholder="Dirección de residencia"
                  id="direccion_residencia" size="small"
                  :class="{ 'p-invalid': errors.datos_personales.direccion_residencia }" />
              </IconField>
              <label for="direccion_residencia">Dirección de residencia</label>
              <small v-if="errors.datos_personales.direccion_residencia" class="p-error">{{
                errors.datos_personales.direccion_residencia
              }}</small>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <Dropdown id="option" class="w-[181px]" v-model="form.datos_personales.pais_residencia"
                  :options="options" optionLabel="label" placeholder=""
                  :class="{ 'p-invalid': errors.datos_personales.pais_residencia }" />
                <small v-if="errors.datos_personales.pais_residencia" class="p-error">{{
                  errors.datos_personales.pais_residencia
                  }}</small>
              </IconField>
              <label for="pais_residencia">País</label>
              <small v-if="errors.datos_personales.pais_residencia" class="p-error">{{
                errors.datos_personales.pais_residencia
              }}</small>
            </FloatLabel>
          </div>



          <div class="p-field">
            <FloatLabel variant="in">
              <IconField class="w-[181px]">
                <DatePicker class="w-[181px]" v-model="form.datos_personales.fecha_expedicion" />
              </IconField>
              <label for="fecha_expedicion">Fecha de expedición</label>
              <small v-if="errors.datos_personales.fecha_expedicion" class="p-error">{{
                errors.datos_personales.fecha_expedicion
              }}</small>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <Dropdown id="option" class="w-[181px]" v-model="form.datos_personales.genero" :options="options"
                  optionLabel="label" placeholder="" :class="{ 'p-invalid': errors.datos_personales.genero }" />
                <label for="genero">Género</label>
                <small v-if="errors.datos_personales.genero" class="p-error">{{
                  errors.datos_personales.genero
                }}</small>
              </IconField>
            </FloatLabel>
          </div>


        </div>
      </form>


    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import InputText from 'primevue/inputtext';
import InputTextarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Panel from 'primevue/panel';
import IconField from 'primevue/iconfield'
import FloatLabel from 'primevue/floatlabel'
import DatePicker from 'primevue/datepicker';

const visible_datos_personales = ref(false);

const form = reactive({
  datos_personales: {
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    tipo_documento: null,
    numero_documento: '',
    fecha_expedicion: '',
    lugar_expedicion: '',
    pais_residencia: '',
    ciudad_residencia: '',
    direccion_residencia: '',
    correo_electronico: '',
    telefono: ''
  },
  experiencia_laboral: {
    name: '',
    email: '',
    phone: '',
  },
  estudios: {
    name: '',
    email: '',
  }
});

const options = [
  { label: 'Opción 1', value: 'opcion1' },
  { label: 'Opción 2', value: 'opcion2' },
  { label: 'Opción 3', value: 'opcion3' }
];

const errors = reactive({
  datos_personales: {
    name: '',
    email: '',
    phone: '',
    option: ''
  },
  experiencia_laboral: [{
    cargo: '',
    nombre: '',
    actual: false,
    fecha_inicio: '',
    fecha_fin: '',
    funciones: ''
  }],
  estudios: [
    {
      nombre: '',
      nivel: '',
      actual: false,
      fecha_inicio: '',
      fecha_fin: ''
    }
  ]

});

const submitted = ref(false);

function validate() {
  errors.datos_personales.name = form.datos_personales.name ? '' : 'El nombre es obligatorio.';
  errors.datos_personales.email = form.datos_personales.email ? (/^\S+@\S+\.\S+$/.test(form.datos_personales.email) ? '' : 'Correo inválido.') : 'El correo es obligatorio.';
  errors.datos_personales.phone = form.datos_personales.phone && !/^\d{7,15}$/.test(form.datos_personales.phone) ? 'Teléfono inválido.' : '';
  errors.datos_personales.option = form.datos_personales.option ? '' : 'Debes seleccionar una opción.';
  return !errors.datos_personales.name && !errors.datos_personales.email && !errors.datos_personales.phone && !errors.datos_personales.option;
}

function onSubmit() {
  if (validate()) {
    submitted.value = true;
    setTimeout(() => { submitted.value = false; }, 3000);
    // Aquí podrías enviar los datos a una API
  }
}
</script>

<style scoped>
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

.form-demo {
  min-width: 80%;
  margin: 2rem auto;
  padding: 3rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(24, 88, 148, 0.07);
}

.p-field {
  margin-bottom: 1.5rem;

}

.p-error {
  color: #d32f2f;
  font-size: 0.9em;
}

.p-message-success {
  color: #388e3c;
  background: #e8f5e9;
  padding: 1em;
  border-radius: 4px;
}
</style>
