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
import Timeline from 'primevue/timeline';

import Image from 'primevue/image';
import logo from '@/assets/img/logo/GU_HV.png'

const visible_datos_personales = ref(false);
const visible_experiencia = ref(false);
const dialogIndex = ref(null);
const dialogIndexEstudio = ref(null);
const visible_educacion = ref(false);
const dialogIndexTalla = ref(null);
const visible_tallas = ref(false);


const defaultFormData = {
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
    telefono: '',
    genero: '',
  },
  tallas: {
    calzado: "",
    pantalon: "",
    camisa: ""
  },
  experiencia_laboral: [],
  estudios: [],
  sagrilaft: {
    operaciones_internacionales: {
      moneda_extgranjera: false,
      tipo_moneda: '',
      tipo_operacion: '',
      productos_financieros: {},
    },
    informacion_financiera: {
      ingresos_mensuales: '',
      egresos_mensuales: '',
      total_activos: '',
      total_pasivos: '',
      total_patrimonio: '',
      fecha_corte: ''

    },
    personas_expuestas_politicamente: {
      pep: false,
      maneja_recursos_publicos: false,
      cargo_publico: '',
      entidad_publica: '',
      persona: []
    }
  }
};

const form = reactive(defaultFormData);

const options = [
  { label: 'Opción 1', value: 'opcion1' },
  { label: 'Opción 2', value: 'opcion2' },
  { label: 'Opción 3', value: 'opcion3' }
];


const lista_estado_civil = [
  { label: 'Soltero', value: '1' },
  { label: 'Casado', value: '2' },
  { label: 'Divorciado', value: '3' },
  { label: 'Viudo', value: '4' },
];

const lista_genero = [
  { label: 'Hombre', value: '1' },
  { label: 'Mujer', value: '2' },
];

const lista_documento = [
  { label: 'Cédula de ciudadanía', value: 'CC' },
  { label: 'Cédula de extranjería', value: 'CE' },
  { label: 'Pasaporte', value: 'PA' },
  { label: 'Tarjeta de identidad', value: 'TI' },
];


const lista_nivel_estudio = [
  { label: 'Primaria', value: '1' },
  { label: 'Secundaria', value: '2' },
  { label: 'Técnico', value: '3' },
  { label: 'Tecnológico', value: '4' },
  { label: 'Universitario', value: '5' },
  { label: 'Posgrado', value: '6' },
];


const errors = reactive({
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
    telefono: '',
    genero: '',
    estado_civil: ''
  },
  tallas: {
    calzado: '',
    pantalon: '',
    camisa: ''
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

const errorList = ref([]);

const validate = () => {
  errorList.value = [];
  errors.datos_personales.primer_nombre = form.datos_personales.primer_nombre ? '' : 'El primer nombre es obligatorio.';
  errors.datos_personales.segundo_nombre = form.datos_personales.segundo_nombre ? '' : 'El segundo nombre es obligatorio.';
  errors.datos_personales.primer_apellido = form.datos_personales.primer_apellido ? '' : 'El primer apellido es obligatorio.';
  errors.datos_personales.segundo_apellido = form.datos_personales.segundo_apellido ? '' : 'El segundo apellido es obligatorio.';

  errors.datos_personales.correo_electronico = form.datos_personales.correo_electronico ? (/^\S+@\S+\.\S+$/.test(form.datos_personales.correo_electronico) ? '' : 'Correo inválido.') : 'El correo es obligatorio.';
  errors.datos_personales.telefono = form.datos_personales.telefono && !/^\d{7,15}$/.test(form.datos_personales.telefono) ? 'Teléfono inválido.' : '';
  errors.datos_personales.option = form.datos_personales.option ? '' : 'Debes seleccionar una opción.';
  errors.datos_personales.numero_documento = form.datos_personales.numero_documento ? '' : 'El número de documento es obligatorio.';
  errors.datos_personales.direccion_residencia = form.datos_personales.direccion_residencia ? '' : 'La dirección de residencia es obligatoria.';
  errors.datos_personales.pais_residencia = form.datos_personales.pais_residencia ? '' : 'El país de residencia es obligatorio.';
  errors.datos_personales.fecha_expedicion = form.datos_personales.fecha_expedicion ? '' : 'La fecha de expedición es obligatoria.';
  errors.datos_personales.genero = form.datos_personales.genero ? '' : 'El género es obligatorio.';

  // Recolectar errores
  Object.keys(errors.datos_personales).forEach(key => {
    if (errors.datos_personales[key]) {
      errorList.value.push(errors.datos_personales[key]);
    }
  })

  return errorList.value.length === 0;
}

const openDialogExperienciaAgregar = () => {

  form.experiencia_laboral.push({
    cargo: '',
    nombre_empresa: '',
    actual: false,
    fecha_inicio: '',
    fecha_fin: '',
    funciones: ''
  });


  let index = form.experiencia_laboral.length - 1;

  console.log('Index experiencia:', index, form.experiencia_laboral.length);
  console.log('Experiencia laboral:', form.experiencia_laboral);
  console.log('Dialog index experiencia:', dialogIndex.value);
  dialogIndex.value = index;
  visible_experiencia.value = true;
}

const openDialogEducacionAgregar = () => {

  form.estudios.push({
    nombre: '',
    nivel: '',
    actual: false,
    fecha_inicio: '',
    fecha_fin: ''
  });

  let index = form.estudios.length - 1;
  dialogIndexEstudio.value = index;
  visible_educacion.value = true;
}

const openDialogTallaEditar = () => {
  visible_tallas.value = true;
}

const openDialogEducacionEditar = (index) => {
  dialogIndexEstudio.value = index;
  visible_educacion.value = true;
}


const openDialogEducacionEliminar = (index) => {
  form.estudios.splice(index, 1);
}


const openDialogExperienciaEditar = (index) => {
  dialogIndex.value = index;
  visible_experiencia.value = true;
}

const openDialogExperienciaEliminar = (index) => {
  form.experiencia_laboral.splice(index, 1);
}

// Función para formatear fechas a yyyy-mm-dd
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d)) return date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function onSubmit() {
  if (validate()) {
    submitted.value = true;
    setTimeout(() => { submitted.value = false; }, 3000);
    // Aquí podrías enviar los datos a una API
  }
}
</script>


<template>

  <div class="flex flex-row min-h-screen items-center justify-between color-main transition-colors duration-300">
    <div class="flex flex-col justify-start items-center  w-full">


      <div class="card  gap-3 mb-4 w-[80%]">
        <Panel toggleable>
          <template #header>
            <div class="flex items-center gap-2">
              <strong class="font-bold">Instrucciones Inscripción Hoja de Vida</strong>
            </div>
          </template>

          <div class="flex flex-col justify-center items-center">
            <div class="card flex justify-center gap-3 mb-4 w-[50%]">
              <Image :src="logo" alt="Image" width="w-[50%]" />
            </div>


            <div class="p-4">
              <p class="m-0">
                Editar Informacion Personal dar click en el icono de lapiz. <Button icon="pi pi-pen-to-square"
                  severity="secondary" rounded text @click="visible_datos_personales = true" />
              </p>
            </div>


            <div class="p-4">
              <p>
                Añadir nueva experiencia laboral dar click en el icono de mas. <Button icon="pi pi-plus"
                  severity="secondary" rounded text @click="visible_datos_personales = true" />
              </p>
            </div>

          </div>
        </Panel>


      </div>

      <!-- Datos Personales -->
      <div class="card  gap-3 mb-4 w-[80%]">
        <Panel toggleable>

          <template #header>
            <div class="flex items-center gap-2">
              <strong class="font-bold">Datos Personales</strong>
            </div>
          </template>

          <template #icons>
            <Button icon="pi pi-pen-to-square" severity="secondary" rounded text
              @click="visible_datos_personales = true" />
          </template>

          <div class="grid grid-cols-3 gap-4">
            <div class="p-4 m-0">
              <small> <strong>Nombre: </strong> {{ form.datos_personales.primer_nombre + ' ' +
                form.datos_personales.segundo_nombre +
                ' ' + form.datos_personales.primer_apellido + ' ' + form.datos_personales.segundo_apellido }} </small>
            </div>
            <div class="p-4 m-0"><small> <strong>Teléfono:</strong> {{ form.datos_personales.telefono }} </small></div>
            <div class="p-4 m-0"><small> <strong>Correo Electrónico:</strong> {{
              form.datos_personales.correo_electronico }}
              </small></div>
          </div>
        </Panel>
      </div>

      <!-- Experiencia Laboral -->
      <div class="card  gap-3 mb-4 w-[80%]">
        <Panel toggleable>
          <template #header>
            <div class="flex items-center gap-2">
              <strong class="font-bold">Experiencia laboral</strong>
            </div>
          </template>
          <template #icons>
            <Button icon="pi pi-plus" severity="secondary" rounded text @click="openDialogExperienciaAgregar()" />
          </template>

          <div v-if="form.experiencia_laboral.length > 0">

            <Timeline :value="form.experiencia_laboral" align="left" class="w-full md:w-90rem">
              <template #opposite="slotProps"></template>
              <template #content="slotProps">

                <div class="flex flex-row items-left justify-between">

                  <div class="flex flex-col items-left justify-between">

                    <div class="mb-2">
                      <small class="text-surface-500 dark:text-surface-400">
                        <span> Empresa: {{
                          slotProps.item.nombre_empresa
                          }}</span> - <span> Cargo:</span> {{
                            slotProps.item.cargo }}</small>
                    </div>

                    <div>
                      <small class="text-surface-500 dark:text-surface-400">
                        <p> {{ formatDate(slotProps.item.fecha_inicio) }} - {{
                          formatDate(slotProps.item.fecha_fin) }}</p>
                      </small>
                    </div>
                  </div>

                  <div>
                    <Button icon="pi pi-pen-to-square" variant="text" rounded aria-label="Filter"
                      @click="openDialogExperienciaEditar(slotProps.index)" />

                    <Button icon="pi pi-trash" variant="text" rounded aria-label="Filter"
                      @click="openDialogExperienciaEliminar(slotProps.index)" />
                  </div>

                </div>
              </template>
            </Timeline>
          </div>

        </Panel>
      </div>

      <!-- Estudios -->
      <div class="card  gap-3 mb-4 w-[80%]">
        <Panel toggleable>
          <template #header>
            <div class="flex items-center gap-2">
              <strong class="font-bold">Estudios</strong>
            </div>
          </template>
          <template #icons>
            <Button icon="pi pi-plus" severity="secondary" rounded text @click="openDialogEducacionAgregar()" />
          </template>

          <div v-if="form.estudios.length > 0">
            <Timeline :value="form.estudios" align="left" class="w-full md:w-90rem">

              <template #content="slotProps">
                <div class="flex flex-row items-left justify-between ">

                  <div class="flex flex-col items-left justify-between ">

                    <div class="mb-2">
                      <small class="text-surface-500 dark:text-surface-400"> <span> Estudio: {{
                        slotProps.item.nombre
                          }}</span> - <span> Nivel:</span> {{
                            slotProps.item.nivel.label }}</small>
                    </div>

                    <div>
                      <small class="text-surface-500 dark:text-surface-400">
                        <p> {{ formatDate(slotProps.item.fecha_inicio) }} - {{
                          formatDate(slotProps.item.fecha_fin) }}</p>
                      </small>
                    </div>
                  </div>


                  <div>
                    <Button icon="pi pi-pen-to-square" variant="text" rounded aria-label="Filter"
                      @click="openDialogEducacionEditar(slotProps.index)" />

                    <Button icon="pi pi-trash" variant="text" rounded aria-label="Filter"
                      @click="openDialogEducacionEliminar(slotProps.index)" />
                  </div>

                </div>
              </template>
            </Timeline>
          </div>

        </Panel>
      </div>

      <!-- Talla de prendas -->
      <div class="card  gap-3 mb-4 w-[80%]">
        <Panel toggleable>

          <template #header>
            <div class="flex items-center gap-2">
              <strong class="font-bold">Talla de Prendas</strong>
            </div>
          </template>

          <template #icons>
            <Button icon="pi pi-plus" severity="secondary" rounded text @click="openDialogTallaEditar()" />
          </template>

          <div class="flex flex-row items-left justify-between ">

            <div class="flex flex-col items-left justify-between ">


              <div>
                <small class="text-surface-500 dark:text-surface-400">
                  <p> Calzado: {{ form.tallas.calzado }} - Pantalon: {{
                    form.tallas.pantalon }} - Camisa: {{ form.tallas.camisa }}</p>
                </small>
              </div>


            </div>


          </div>

        </Panel>
      </div>


      <!-- Sagrilaft -->
      <div class="card  gap-3 mb-4 w-[80%]">
        <Panel toggleable>

          <template #header>
            <div class="flex items-center gap-2">
              <strong class="font-bold">Sagrilaft</strong>
            </div>
          </template>

          <template #icons>
            <Button icon="pi pi-plus" severity="secondary" rounded text @click="openDialogTallaEditar()" />
          </template>

          <div class="flex flex-row items-left justify-between ">

            <div class="flex flex-col items-left justify-between ">


              <div>

              </div>


            </div>


          </div>

        </Panel>
      </div>


      <div v-if="submitted" class="p-mt-3 p-message p-message-success">
        ¡Formulario enviado correctamente!
      </div>

      <div v-if="errorList.length" class="p-mt-3 p-message p-message-error">
        <strong>Errores encontrados:</strong>
        <ul>
          <li class="p-error" v-for="(err, idx) in errorList" :key="idx">{{ err }}</li>
        </ul>
      </div>

    </div>
  </div>

  <!-- Modal Datos Basicos -->
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

          </FloatLabel>
        </div>

        <div class="p-field">
          <FloatLabel variant="in">
            <IconField>
              <InputText v-model="form.datos_personales.segundo_nombre" placeholder="Segundo nombre" id="segundo_nombre"
                size="small" :class="{ 'p-invalid': errors.datos_personales.segundo_nombre }" />
            </IconField>
            <label for="segundo_nombre">Segundo nombre</label>

          </FloatLabel>
        </div>

        <div class="p-field">
          <FloatLabel variant="in">
            <IconField>
              <InputText v-model="form.datos_personales.primer_apellido" placeholder="Primer apellido"
                id="primer_apellido" size="small" :class="{ 'p-invalid': errors.datos_personales.primer_apellido }" />
            </IconField>
            <label for="primer_nombre">Primer nombre</label>

          </FloatLabel>
        </div>

        <div class="p-field">
          <FloatLabel variant="in">
            <IconField>
              <InputText v-model="form.datos_personales.segundo_apellido" placeholder="Segundo apellido"
                id="segundo_apellido" size="small" :class="{ 'p-invalid': errors.datos_personales.segundo_apellido }" />
            </IconField>
            <label for="primer_nombre">Primer nombre</label>

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

          </FloatLabel>
        </div>

        <div class="p-field">
          <FloatLabel variant="in">
            <IconField>
              <InputText v-model="form.datos_personales.telefono" placeholder="Teléfono" id="telefono" size="small"
                :class="{ 'p-invalid': errors.datos_personales.telefono }" />
            </IconField>
            <label for="telefono">telefono</label>

          </FloatLabel>
        </div>

        <div class="p-field">
          <FloatLabel variant="in">
            <IconField>
              <Dropdown class="w-[181px]" id="option" v-model="form.datos_personales.tipo_documento"
                :options="lista_documento" optionLabel="label" placeholder=""
                :class="{ 'p-invalid': errors.datos_personales.tipo_documento }" />

            </IconField>
            <label for="numero_documento">Tipo Documento</label>

          </FloatLabel>
        </div>

        <div class="p-field">
          <FloatLabel variant="in">
            <IconField>
              <InputText v-model="form.datos_personales.numero_documento" placeholder="Número de documento"
                id="numero_documento" size="small" :class="{ 'p-invalid': errors.datos_personales.numero_documento }" />
            </IconField>
            <label for="numero_documento">Numero Documento</label>

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

          </FloatLabel>
        </div>

        <div class="p-field">
          <FloatLabel variant="in">
            <IconField>
              <Dropdown id="option" class="w-[181px]" v-model="form.datos_personales.pais_residencia" :options="options"
                optionLabel="label" placeholder="" :class="{ 'p-invalid': errors.datos_personales.pais_residencia }" />

            </IconField>
            <label for="pais_residencia">País</label>

          </FloatLabel>
        </div>


        <div class="p-field">
          <FloatLabel variant="in">
            <IconField class="w-[181px]">
              <DatePicker class="w-[181px]" v-model="form.datos_personales.fecha_expedicion" />

              <label for="fecha_expedicion">Fecha de expedición</label>
            </IconField>
          </FloatLabel>
        </div>

        <div class="p-field">
          <FloatLabel variant="in">
            <IconField>
              <Dropdown id="option" class="w-[181px]" v-model="form.datos_personales.genero" :options="lista_genero"
                optionLabel="label" placeholder="" :class="{ 'p-invalid': errors.datos_personales.genero }" />
              <label for="genero">Género</label>

            </IconField>
          </FloatLabel>
        </div>


        <div class="p-field">
          <FloatLabel variant="in">
            <IconField>
              <Dropdown id="option" class="w-[181px]" v-model="form.datos_personales.estado_civil" :options="options"
                optionLabel="label" placeholder="" :class="{ 'p-invalid': errors.datos_personales.estado_civil }" />
              <label for="estado_civil">Estado civil</label>

            </IconField>
          </FloatLabel>
        </div>


      </div>
    </form>


  </Dialog>

  <!-- Modal Experiencia Laboral -->
  <Dialog v-model:visible="visible_experiencia" modal header="Editar Informacion."
    :data="form.experiencia_laboral[dialogIndex]" :style="{ width: '75rem' }">


    <div class="card flex flex-row flex-wrap justify-start gap-2 items-center  justify-content-center">


      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <InputText v-model="form.experiencia_laboral[dialogIndex].nombre_empresa" placeholder="Nombre de la empresa"
              id="nombre_empresa" size="small" :class="{ 'p-invalid': errors.experiencia_laboral.nombre_empresa }" />
          </IconField>
          <label for="nombre_empresa">Nombre de la empresa</label>

        </FloatLabel>
      </div>

      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <InputText v-model="form.experiencia_laboral[dialogIndex].cargo" placeholder="Cargo" id="cargo" size="small"
              :class="{ 'p-invalid': errors.experiencia_laboral.cargo }" />
          </IconField>
          <label for="cargo">Cargo</label>
        </FloatLabel>
      </div>

      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <Dropdown id="actual" class="w-[181px]" v-model="form.experiencia_laboral[dialogIndex].actual" :options="[
              { label: 'Sí', value: true },
              { label: 'No', value: false }
            ]" optionLabel="label" placeholder="" :class="{ 'p-invalid': errors.experiencia_laboral.actual }" />
          </IconField>
          <label for="actual">¿Actualmente trabaja aquí?</label>
        </FloatLabel>

      </div>

      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <DatePicker v-model="form.experiencia_laboral[dialogIndex].fecha_inicio" view="month" dateFormat="mm/yy" />
          </IconField>
          <label for="fecha_inicio">Fecha de inicio</label>
        </FloatLabel>
      </div>

      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <DatePicker v-model="form.experiencia_laboral[dialogIndex].fecha_fin" view="month" dateFormat="mm/yy" />
          </IconField>
          <label for="fecha_fin">Fecha de fin</label>
        </FloatLabel>
      </div>

      <div class="p-field">
        <FloatLabel variant="in">

          <Textarea v-model="form.experiencia_laboral[dialogIndex].funciones"
            :class="{ 'p-invalid': errors.experiencia_laboral.funciones }" rows="5" cols="30" />
          <label for="funciones">Funciones</label>
        </FloatLabel>
      </div>



    </div>

    <template #footer>
      <Button label="Cerrar" icon="pi pi-times" severity="secondary" outlined @click="visible_experiencia = false" />
    </template>
  </Dialog>

  <!-- Modal Educación -->
  <Dialog v-model:visible="visible_educacion" modal header="Editar Informacion."
    :data="form.estudios[dialogIndexEstudio]" :style="{ width: '75rem' }">
    <div class="card flex flex-row flex-wrap justify-start gap-2 items-center  justify-content-center">
      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <InputText v-model="form.estudios[dialogIndexEstudio].nombre" placeholder="Nombre del estudio" id="nombre"
              size="small" :class="{ 'p-invalid': errors.estudios.nombre }" />
          </IconField>
          <label for="nombre">Nombre del estudio</label>

        </FloatLabel>
      </div>

      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <Dropdown id="nivel" class="w-[181px]" v-model="form.estudios[dialogIndexEstudio].nivel"
              :options="lista_nivel_estudio" optionLabel="label" placeholder=""
              :class="{ 'p-invalid': errors.estudios.nivel }" />
          </IconField>
          <label for="nivel">Nivel de estudio</label>
        </FloatLabel>

      </div>

      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <Dropdown id="actual" class="w-[181px]" v-model="form.estudios[dialogIndexEstudio].actual" :options="[
              { label: 'Sí', value: true },
              { label: 'No', value: false }
            ]" optionLabel="label" placeholder="" :class="{ 'p-invalid': errors.estudios.actual }" />
          </IconField>
          <label for="actual">¿Actualmente estudia aquí?</label>
        </FloatLabel>
      </div>

      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <DatePicker v-model="form.estudios[dialogIndexEstudio].fecha_inicio" view="month" dateFormat="mm/yy" />
          </IconField>
          <label for="fecha_inicio">Fecha de inicio</label>
        </FloatLabel>
      </div>


      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <DatePicker v-model="form.estudios[dialogIndexEstudio].fecha_fin" view="month" dateFormat="mm/yy" />
          </IconField>
          <label for="fecha_fin">Fecha de fin</label>
        </FloatLabel>
      </div>

    </div>
    <template #footer>
      <Button label="Cerrar" icon="pi pi-times" severity="secondary" outlined @click="visible_educacion = false" />
    </template>
  </Dialog>

  <!-- Modal Tallas  -->
  <Dialog v-model:visible="visible_tallas" modal header="Editar Informacion." :data="form.tallas"
    :style="{ width: '75rem' }">
    <div class="card flex flex-row flex-wrap justify-start gap-2 items-center  justify-content-center">
      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <InputText v-model="form.tallas.calzado" placeholder="Talla de calzado" id="calzado" size="small"
              :class="{ 'p-invalid': errors.tallas.calzado }" />
          </IconField>
          <label for="calzado">Talla de calzado</label>

        </FloatLabel>
      </div>

      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <InputText v-model="form.tallas.pantalon" placeholder="Talla de pantalón" id="pantalon" size="small"
              :class="{ 'p-invalid': errors.tallas.pantalon }" />
          </IconField>
          <label for="pantalon">Talla de pantalón</label>

        </FloatLabel>
      </div>

      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <InputText v-model="form.tallas.camisa" placeholder="Talla de camisa" id="camisa" size="small"
              :class="{ 'p-invalid': errors.tallas.camisa }" />
          </IconField>
          <label for="camisa">Talla de camisa</label>

        </FloatLabel>
      </div>

    </div>
    <template #footer>
      <Button label="Cerrar" icon="pi pi-times" severity="secondary" outlined @click="visible_tallas = false" />
    </template>

  </Dialog>


</template>

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

.color-main {
  color: var(--p-text-color);
  background:
    linear-gradient(135deg, var(--p-surface-500, #e5e7eb) 0%, var(--p-surface-900, #cbd5e1) 100%),
    url('@/assets/img/background/pattern5_black.png');
  background-blend-mode: overlay;
}

/* Elimina fondo y color fijos, usa variables de PrimeVue */
.p-card {
  background: var(--p-card-background);
  color: var(--p-text-color);
  border-radius: 1.25rem;
  box-shadow: var(--p-card-shadow);
  transition: background 0.3s, color 0.3s;
}

.p-avatar {
  width: 100px;
  height: 100px;
}

body {
  backdrop-filter: blur(4px);
}

.p-timeline-event-opposite {
  flex: 0 0 0% !important;
}
</style>
