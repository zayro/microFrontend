<script setup>
import { ref, reactive } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
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
const visible_sagrilaft = ref(false);
const visible_errores = ref(false);


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
      moneda_extgranjera_sn: '',
      tipo_moneda: '',
      tipo_operacion: '',
      productos_financieros_sn: '',
      productos_financieros: {
        cuentas_bancarias: false,
        nombre_entidad: '',
        tipo_producto: '',
        numero_producto: '',
        ciudad: '',
        pais: '',
        moneda: '',
        monto: ''
      },
      contrato_servidor_publico_extranjero_sn: '',
      contrato_servidor_publico_extranjero_detalles: '',
    },
    informacion_financiera: {
      ingresos_mensuales: '',
      egresos_mensuales: '',
      total_activos: '',
      total_pasivos: '',
      total_patrimonio: '',
      fecha_corte: '',
      otro_ingresos_mensuales: '',
      total_ingresos_mensuales: '',
      otro_egresos_mensuales: '',
      otro_ingresos_mensuales_detalle: '',

    },
    personas_expuestas_politicamente: {
      pep_sn: false,
      maneja_recursos_publicos_sn: '',
      goza_reconoscimiento_publico_sn: '',
      fecha_desde_reconocimiento: '',
      fecha_hasta_reconocimiento: '',
      cargo_publico_sn: '',
      familia_considerada_pep_sn: '',
      persona: [
        {
          nombre_completo: '',
          tipo_identificacion: '',
          numero_identificacion: '',
          parentesco: '',
          descripcion_calidad_pep: '',
        }
      ]
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
  ],
  sagrilaft: {
    operaciones_internacionales: {
      moneda_extgranjera_sn: '',
      tipo_moneda: '',
      tipo_operacion: '',
      productos_financieros_sn: '',
      contrato_servidor_publico_extranjero_sn: '',
      contrato_servidor_publico_extranjero_detalles: '',
    },
    informacion_financiera: {
      ingresos_mensuales: '',
      egresos_mensuales: '',
      total_activos: '',
      total_pasivos: '',
      total_patrimonio: '',
      fecha_corte: '',
      otro_ingresos_mensuales: '',
      total_ingresos_mensuales: '',
      otro_egresos_mensuales: '',
      otro_ingresos_mensuales_detalle: '',

    },
    personas_expuestas_politicamente: {
      pep_sn: false,
      maneja_recursos_publicos_sn: '',
      goza_reconoscimiento_publico_sn: '',
      fecha_desde_reconocimiento: '',
      fecha_hasta_reconocimiento: '',
      cargo_publico_sn: '',
      familia_considerada_pep_sn: '',
      persona: [
        {
          nombre_completo: '',
          tipo_identificacion: '',
          numero_identificacion: '',
          parentesco: '',
          descripcion_calidad_pep: '',
        }
      ]
    }
  }
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

const openDialogSagrilaftAgregar = () => {
  visible_sagrilaft.value = true;
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
  } else {
    visible_errores.value = true;
  }
}
</script>


<template>

  <div class="flex flex-row min-h-screen items-center justify-between color-main transition-colors duration-300">
    <div class="flex flex-col justify-start items-center  w-full">


      <div class="card  gap-3 mb-4 w-[90%]">
        <Panel class="p-panel-noborder">
          <template #header>
            <div class="flex flex-auto items-center justify-center gap-2">
              <strong class="font-bold text-shadow-sm uppercase font-mono">Instrucciones Inscripción Hoja de
                Vida</strong>
            </div>
          </template>

          <template #footer>
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <Button label="Validar Formulario" icon="pi pi-check" class="w-90" @click="onSubmit" />
              </div>
              <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
            </div>
          </template>

          <div class="flex flex-col items-left justify-between ">

            <div class="p-4">
              <p class="m-0">
                Editar Informacion dar click en el icono de lapiz. <Button icon="pi pi-pen-to-square"
                  severity="secondary" raised rounded text />

              </p>

            </div>

            <!-- Datos Personales -->
            <div class="flex flex-col justify-start items-center w-full">
              <div class="card  gap-3 mb-4 w-full">
                <Panel class="p-panel-noborder" toggleable>

                  <template #header>
                    <div class="flex items-center gap-2">
                      <div>
                        <strong class="font-bold">Datos Personales</strong>
                      </div>
                      <div>
                        <Button icon="pi pi-pen-to-square" severity="info" raised rounded aria-label="DP" text
                          @click="visible_datos_personales = true" />
                      </div>
                    </div>
                  </template>


                  <div class="grid lg:grid-cols-6 md:grid-cols-3 gap-2">
                    <div class="p-1 m-0">
                      <small> <strong>Nombre: </strong> {{ form.datos_personales.primer_nombre + ' ' +
                        form.datos_personales.segundo_nombre +
                        ' ' + form.datos_personales.primer_apellido + ' ' + form.datos_personales.segundo_apellido }}
                      </small>
                    </div>
                    <div class="p-1 m-0"><small> <strong>Teléfono:</strong> {{ form.datos_personales.telefono }}
                      </small>
                    </div>
                    <div class="p-1 m-0"><small> <strong>Correo Electrónico:</strong> {{
                      form.datos_personales.correo_electronico }}
                      </small>
                    </div>
                    <div class="p-1 m-0"><small> <strong>Calzado :</strong> {{
                      form.tallas.calzado }}
                      </small>
                    </div>
                    <div class="p-1 m-0"><small> <strong>Pantalon :</strong> {{
                      form.tallas.pantalon }}
                      </small>
                    </div>
                    <div class="p-1 m-0"><small> <strong>Camisa :</strong> {{
                      form.tallas.camisa }}
                      </small>
                    </div>
                  </div>

                </Panel>
              </div>
            </div>

            <!-- Experiencia Laboral -->
            <div class="card  gap-3 mb-4 w-full">
              <Panel class="p-panel-noborder" toggleable>
                <template #header>
                  <div class="flex items-center gap-2">
                    <strong class="font-bold">Experiencia laboral</strong>
                    <div>
                      <Button icon="pi pi-pen-to-square" severity="info" raised rounded text
                        @click="openDialogExperienciaAgregar()" />
                    </div>
                  </div>
                </template>

                <div v-if="form.experiencia_laboral.length > 0">

                  <Timeline :value="form.experiencia_laboral" align="left" class="w-full md:w-90rem">
                    <template #opposite="slotProps">
                      <div class="flex flex-row justify-end">

                        <div class="pl-2">
                          <Button icon="pi pi-pen-to-square" variant="text" severity="warn" raised rounded
                            aria-label="Filter" @click="openDialogExperienciaEditar(slotProps.index)" />
                        </div>

                        <div class="pl-2">
                          <Button icon="pi pi-trash" severity="danger" variant="text" raised rounded aria-label="Filter"
                            @click="openDialogExperienciaEliminar(slotProps.index)" />
                        </div>
                      </div>

                    </template>
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



                      </div>
                    </template>
                  </Timeline>
                </div>

              </Panel>
            </div>

            <!-- Estudios -->
            <div class="card  gap-3 mb-4 w-full">
              <Panel class="p-panel-noborder" toggleable>
                <template #header>
                  <div class="flex items-center gap-2">
                    <strong class="font-bold">Estudios</strong>
                    <div>
                      <Button icon="pi pi-pen-to-square" severity="info" raised rounded text
                        @click="openDialogEducacionAgregar()" />
                    </div>
                  </div>
                </template>

                <div v-if="form.estudios.length > 0" class="flex flex-row items-left justify-start">
                  <Timeline :value="form.estudios" align="left" class="w-full md:w-90rem">

                    <template #opposite="slotProps">
                      <div class="flex flex-row justify-end">

                        <div class="pl-2">
                          <Button icon="pi pi-pen-to-square" variant="text" severity="warn" raised rounded
                            aria-label="Filter" @click="openDialogEducacionEditar(slotProps.index)" />
                        </div>


                        <div class="pl-2">
                          <Button icon="pi pi-trash" severity="danger" variant="text" raised rounded aria-label="Filter"
                            @click="openDialogEducacionEliminar(slotProps.index)" />
                        </div>

                      </div>
                    </template>


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



                      </div>
                    </template>
                  </Timeline>
                </div>

              </Panel>
            </div>

            <!-- Sagrilaft -->
            <div class="card  gap-3 mb-4 w-full">
              <Panel class="p-panel-noborder" toggleable>

                <template #header>
                  <div class="flex items-center gap-2">
                    <strong class="font-bold">Sagrilaft</strong>
                    <div>
                      <Button icon="pi pi-pen-to-square" severity="info" raised rounded text
                        @click="openDialogSagrilaftAgregar()" />
                    </div>
                  </div>
                </template>



                <div class="flex flex-row items-left justify-between ">

                  <div class="flex flex-col items-left justify-between ">


                    <div>

                    </div>


                  </div>


                </div>

              </Panel>
            </div>


          </div>
        </Panel>

      </div>



      <div v-if="submitted" class="p-mt-3 p-message p-message-success">
        ¡Formulario enviado correctamente!
      </div>



    </div>
  </div>

  <Dialog v-model:visible="visible_errores" modal header="Errores Informacion." :style="{ width: '75rem' }">

    <div v-if="errorList.length" class="p-mt-1 p-message p-message-error">
      <Panel>
        <template #header>
          <div class="flex flex-auto items-center justify-center gap-2">
            <strong class="font-bold text-shadow-sm uppercase font-mono">Lista Errores en el formulario</strong>
          </div>

        </template>
        <ul>
          <li class="p-error" v-for="(err, idx) in errorList" :key="idx">{{ err }}</li>
        </ul>
      </Panel>

    </div>
  </Dialog>

  <!-- Modal Datos Basicos -->
  <Dialog v-model:visible="visible_datos_personales" modal header="Editar Informacion." :style="{ width: '75rem' }">

    <Panel header="Datos Personales" class="p-panel-noborder">

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
                <InputText v-model="form.datos_personales.segundo_nombre" placeholder="Segundo nombre"
                  id="segundo_nombre" size="small" :class="{ 'p-invalid': errors.datos_personales.segundo_nombre }" />
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
              <label for="primer_apellido">Primer Apellido</label>

            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.datos_personales.segundo_apellido" placeholder="Segundo apellido"
                  id="segundo_apellido" size="small"
                  :class="{ 'p-invalid': errors.datos_personales.segundo_apellido }" />
              </IconField>
              <label for="segundo_apellido">Segundo Apellido</label>

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
                <Select class="w-[181px]" id="option" v-model="form.datos_personales.tipo_documento"
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
                  id="numero_documento" size="small"
                  :class="{ 'p-invalid': errors.datos_personales.numero_documento }" />
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
                <Select id="option" class="w-[181px]" v-model="form.datos_personales.pais_residencia" :options="options"
                  optionLabel="label" placeholder=""
                  :class="{ 'p-invalid': errors.datos_personales.pais_residencia }" />

              </IconField>
              <label for="pais_residencia">País</label>

            </FloatLabel>
          </div>


          <div class="p-field">
            <FloatLabel variant="in">
              <IconField class="w-[181px]">
                <Select id="option" class="w-[181px]" v-model="form.datos_personales.genero" :options="lista_genero"
                  optionLabel="label" placeholder="" :class="{ 'p-invalid': errors.datos_personales.genero }" />
                <label for="genero">Género</label>

              </IconField>
            </FloatLabel>
          </div>


          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <Select id="option" class="w-[181px]" v-model="form.datos_personales.estado_civil" :options="options"
                  optionLabel="label" placeholder="" :class="{ 'p-invalid': errors.datos_personales.estado_civil }" />
                <label for="estado_civil">Estado civil</label>

              </IconField>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <DatePicker v-model="form.datos_personales.fecha_expedicion" />
                <label for="fecha_expedicion">Fecha de expedición</label>
              </IconField>
            </FloatLabel>
          </div>


        </div>
      </form>

    </Panel>


    <Panel header="Tallas" class="p-panel-noborder">

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

    </Panel>

    <template #footer>
      <Button label="Cerrar" icon="pi pi-times" severity="secondary" outlined
        @click="visible_datos_personales = false" />
    </template>


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
            <Select id="actual" class="w-[181px]" v-model="form.experiencia_laboral[dialogIndex].actual" :options="[
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
            <Select id="nivel" class="w-[181px]" v-model="form.estudios[dialogIndexEstudio].nivel"
              :options="lista_nivel_estudio" optionLabel="label" placeholder=""
              :class="{ 'p-invalid': errors.estudios.nivel }" />
          </IconField>
          <label for="nivel">Nivel de estudio</label>
        </FloatLabel>

      </div>

      <div class="p-field">
        <FloatLabel variant="in">
          <IconField>
            <Select id="actual" class="w-[181px]" v-model="form.estudios[dialogIndexEstudio].actual" :options="[
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

  <!-- Modal Sagrilaft  -->
  <Dialog v-model:visible="visible_sagrilaft" modal header="Editar Informacion." :data="form.sagrilaft"
    :style="{ width: '90rem' }">

    <div class="card flex flex-column flex-wrap justify-start gap-2 items-center  justify-content-center">


      <Panel header="operaciones internacionales">

        <div class="card flex flex-row flex-wrap justify-start gap-2 items-center  justify-content-center">


          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.operaciones_internacionales.moneda_extgranjera_sn"
                  placeholder="Moneda extranjera" id="moneda_extgranjera_sn" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.operaciones_internacionales.moneda_extgranjera_sn }" />
              </IconField>
              <label for="moneda_extgranjera_sn">Moneda extranjera</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.operaciones_internacionales.tipo_moneda" placeholder="Tipo de moneda"
                  id="tipo_moneda" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.operaciones_internacionales.tipo_moneda }" />
              </IconField>
              <label for="tipo_moneda">Tipo de moneda</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.operaciones_internacionales.tipo_operacion"
                  placeholder="Tipo de operación" id="tipo_operacion" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.operaciones_internacionales.tipo_operacion }" />
              </IconField>
              <label for="tipo_operacion">Tipo de operación</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.operaciones_internacionales.productos_financieros_sn"
                  placeholder="Productos financieros" id="productos_financieros_sn" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.operaciones_internacionales.productos_financieros_sn }" />
              </IconField>
              <label for="productos_financieros_sn">Productos financieros</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.operaciones_internacionales.contrato_servidor_publico_extranjero_sn"
                  placeholder="Contrato servidor público E." id="contrato_servidor_publico_extranjero_sn" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.operaciones_internacionales.contrato_servidor_publico_extranjero_sn }" />
              </IconField>
              <label for="contrato_servidor_publico_extranjero_sn">Contrato servidor público E.</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.sagrilaft.operaciones_internacionales.contrato_servidor_publico_extranjero_detalles"
                  placeholder="Contrato servidor público E." id="contrato_servidor_publico_extranjero_detalles"
                  size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.operaciones_internacionales.contrato_servidor_publico_extranjero_detalles }" />
              </IconField>
              <label for="contrato_servidor_publico_extranjero_detalles">Contrato servidor público E. D.
              </label>
            </FloatLabel>
          </div>

        </div>

      </Panel>

      <Panel header="informacion financiera">

        <div class="card flex flex-row flex-wrap justify-start gap-2 items-center  justify-content-center">


          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.informacion_financiera.ingresos_mensuales"
                  placeholder="Ingresos mensuales" id="ingresos_mensuales" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.ingresos_mensuales }" />
              </IconField>
              <label for="ingresos_mensuales">Ingresos mensuales</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.informacion_financiera.egresos_mensuales"
                  placeholder="Egresos mensuales" id="egresos_mensuales" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.egresos_mensuales }" />
              </IconField>
              <label for="egresos_mensuales">Egresos mensuales</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.informacion_financiera.total_activos" placeholder="Total activos"
                  id="total_activos" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.total_activos }" />
              </IconField>
              <label for="total_activos">Total activos</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.informacion_financiera.total_pasivos" placeholder="Total pasivos"
                  id="total_pasivos" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.total_pasivos }" />
              </IconField>
              <label for="total_pasivos">Total pasivos</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.informacion_financiera.total_patrimonio"
                  placeholder="Total patrimonio" id="total_patrimonio" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.total_patrimonio }" />
              </IconField>
              <label for="total_patrimonio">Total patrimonio</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.informacion_financiera.fecha_corte" placeholder="Fecha corte"
                  id="fecha_corte" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.fecha_corte }" />
              </IconField>
              <label for="fecha_corte">Fecha corte</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.informacion_financiera.otro_ingresos_mensuales"
                  placeholder="Otros ingresos mensuales" id="otro_ingresos_mensuales" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.otro_ingresos_mensuales }" />
              </IconField>
              <label for="otro_ingresos_mensuales">Otros ingresos mensuales</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.informacion_financiera.total_ingresos_mensuales"
                  placeholder="Total ingresos mensuales" id="total_ingresos_mensuales" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.total_ingresos_mensuales }" />
              </IconField>
              <label for="total_ingresos_mensuales">Total ingresos mensuales</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.informacion_financiera.otro_egresos_mensuales"
                  placeholder="Otros egresos mensuales" id="otro_egresos_mensuales" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.otro_egresos_mensuales }" />
              </IconField>
              <label for="otro_egresos_mensuales">Otros egresos mensuales</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.informacion_financiera.otro_ingresos_mensuales_detalle"
                  placeholder="Otros ingresos mensuales detalle" id="otro_ingresos_mensuales_detalle" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.otro_ingresos_mensuales_detalle }" />
              </IconField>
              <label for="otro_ingresos_mensuales_detalle">Otros ingresos mensuales D.</label>
            </FloatLabel>
          </div>

        </div>


      </Panel>


      <Panel header="personas expuestas politicamente">

        <div class="card flex flex-row flex-wrap justify-start gap-2 items-center  justify-content-center">



          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.personas_expuestas_politicamente.pep_sn" placeholder="PEP"
                  id="pep_sn" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.personas_expuestas_politicamente.pep_sn }" />
              </IconField>
              <label for="pep_sn">PEP</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.personas_expuestas_politicamente.maneja_recursos_publicos_sn"
                  placeholder="Maneja recursos publicos" id="maneja_recursos_publicos_sn" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.personas_expuestas_politicamente.maneja_recursos_publicos_sn }" />
              </IconField>
              <label for="maneja_recursos_publicos_sn">Maneja recursos publicos</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.personas_expuestas_politicamente.goza_reconoscimiento_publico_sn"
                  placeholder="Goza reconocimiento publico" id="goza_reconoscimiento_publico_sn" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.personas_expuestas_politicamente.goza_reconoscimiento_publico_sn }" />
              </IconField>
              <label for="goza_reconoscimiento_publico_sn">Goza reconocimiento publico</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.personas_expuestas_politicamente.fecha_desde_reconocimiento"
                  placeholder="Fecha desde reconocimiento" id="fecha_desde_reconocimiento" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.personas_expuestas_politicamente.fecha_desde_reconocimiento }" />
              </IconField>
              <label for="fecha_desde_reconocimiento">Fecha desde reconocimiento</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.personas_expuestas_politicamente.fecha_hasta_reconocimiento"
                  placeholder="Fecha hasta reconocimiento" id="fecha_hasta_reconocimiento" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.personas_expuestas_politicamente.fecha_hasta_reconocimiento }" />
              </IconField>
              <label for="fecha_hasta_reconocimiento">Fecha hasta reconocimiento</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.personas_expuestas_politicamente.cargo_publico_sn"
                  placeholder="Cargo publico" id="cargo_publico_sn" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.personas_expuestas_politicamente.cargo_publico_sn }" />
              </IconField>
              <label for="cargo_publico_sn">Cargo publico</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText v-model="form.sagrilaft.personas_expuestas_politicamente.familia_considerada_pep_sn"
                  placeholder="Familia considerada PEP" id="familia_considerada_pep_sn" size="small"
                  :class="{ 'p-invalid': errors.sagrilaft.personas_expuestas_politicamente.familia_considerada_pep_sn }" />
              </IconField>
              <label for="familia_considerada_pep_sn">Familia considerada PEP</label>
            </FloatLabel>
          </div>


        </div>
      </Panel>

    </div>
    <template #footer>
      <Button label="Cerrar" icon="pi pi-times" severity="secondary" outlined @click="visible_sagrilaft = false" />
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

.p-floatlabel label {
  font-weight: 300;
}

.p-panel-noborder {
  border: none;
  box-shadow: none;
}

.p-select {
  height: 55px;
}

.p-inputtext+.p-datepicker-input {
  width: 181px;
  height: 55px;
  padding-inline: 0px;
}

.p-timeline-event-opposite {
  display: none;
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
