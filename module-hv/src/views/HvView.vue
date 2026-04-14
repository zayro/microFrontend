<script setup>
import { ref, reactive, onMounted, watch } from 'vue'

import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Panel from 'primevue/panel'
import IconField from 'primevue/iconfield'
import FloatLabel from 'primevue/floatlabel'
import DatePicker from 'primevue/datepicker'
import Timeline from 'primevue/timeline'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputMask from 'primevue/inputmask'
import Image from 'primevue/image'

import { useConfigStoreRef } from '@/stores/config'

import { http } from '@/services/http-axios'

import swal from 'sweetalert'

import login from '@/assets/img/login/logo_gu.png'

import {
  ProductService,
  PepService,
  lista_paises,
  opcion_sn,
  opcion_tipo_moneda,
  opcion_tipo_operacion_moneda,
  lista_estado_civil,
  lista_genero,
  lista_documento,
  lista_nivel_estudio,
  lista_genero_identitario,
  lista_parentesco_familiar,
  lista_estado_estudio,
  lista_modalidad_estudio,
} from '@/services/dataList'

const configStore = useConfigStoreRef()

const user = configStore.getUser

const visible_datos_personales = ref(false)
const visible_experiencia = ref(false)
const dialogIndex = ref(null)
const dialogIndexEstudio = ref(null)
const visible_educacion = ref(false)
const visible_sagrilaft = ref(false)
const visible_errores = ref(false)

const cantidad_familia_pep = ref(0)

const defaultFormData = {
  datos_personales: {
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    tipo_documento: null,
    numero_documento: user.value.username,
    ciudad_documento_expedicion: '',
    fecha_documento_expedicion: '',
    pais_residencia: '',
    ciudad_residencia: '',
    direccion_residencia: '',
    correo_electronico: '',
    telefono: '',
    genero: '',
    genero_identitario_sn: '',
    genero_identitario: '',
    nombre_identitario_sn: '',
    nombre_identitario: '',
    estado_civil: '',
    alergico_sn: '',
    alergico_descripcion: '',
    hijos_sn: '',
    hijos_numeros: '',
  },
  tallas: {
    calzado: '',
    pantalon: '',
    camisa: '',
    estatura: '',
    peso: '',
  },
  datos_contacto_adicional: {
    nombre_contacto: '',
    telefono_contacto: '',
    parentesco_contacto: '',
  },
  datos_postulacion: {
    nombre_empresa: '',
    cargo_postulado: '',
  },
  experiencia_laboral: [],
  estudios: [],
  sagrilaft: {
    operaciones_internacionales: {
      moneda_extgranjera_sn: '',
      tipo_moneda: '',
      tipo_operacion: '',
      productos_financieros_sn: '',
      productos_financieros: [],
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
      otro_ingresos_detalle: '',
    },
    personas_expuestas_politicamente: {
      maneja_recursos_publicos_sn: '',
      cargo_publico_sn: '',
      goza_reconoscimiento_publico_sn: '',
      fecha_desde_reconocimiento: '',
      fecha_hasta_reconocimiento: '',
      familia_considerada_pep_sn: '',
      persona: [
        {
          nombre_completo: '',
          tipo_identificacion: '',
          numero_identificacion: '',
          parentesco: '',
          descripcion_calidad_pep: '',
        },
      ],
    },
  },
}

const form = reactive(defaultFormData)

const errors = reactive({
  datos_personales: {
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    tipo_documento: null,
    numero_documento: '',
    ciudad_documento_expedicion: '',
    fecha_documento_expedicion: '',
    pais_residencia: '',
    ciudad_residencia: '',
    direccion_residencia: '',
    correo_electronico: '',
    telefono: '',
    genero: '',
    genero_identitario_sn: '',
    genero_identitario: '',
    nombre_identitario_sn: '',
    nombre_identitario: '',
    estado_civil: '',
    alergico_sn: '',
    alergico_descripcion: '',
    hijos_sn: '',
    hijos_numeros: '',
  },
  tallas: {
    calzado: '',
    pantalon: '',
    camisa: '',
  },
  datos_contacto_adicional: {
    nombre_contacto: '',
    telefono_contacto: '',
    parentesco_contacto: '',
  },
  datos_postulacion: {
    nombre_empresa: '',
    cargo_postulado: '',
  },
  experiencia_laboral: [
    {
      cargo: '',
      nombre: '',
      actual: false,
      fecha_inicio: '',
      fecha_fin: '',
      funciones: '',
    },
  ],
  estudios: [
    {
      nombre: '',
      nivel: '',
      actual: false,
      fecha_inicio: '',
      fecha_fin: '',
    },
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
      maneja_recursos_publicos_sn: '',
      cargo_publico_sn: '',
      cargo_publico_detalle: '',
      goza_reconoscimiento_publico_sn: '',
      fecha_desde_reconocimiento: '',
      fecha_hasta_reconocimiento: '',
      familia_considerada_pep_sn: '',
      familia_considerada_pep_cantidad_persona: 0,
      familia_considerada_pep_persona: [],
    },
  },
})

const submitted = ref(false)

const errorList = ref([])

const validate = () => {
  errorList.value = []
  errors.datos_personales.primer_nombre = form.datos_personales.primer_nombre ? '' : 'El primer nombre es obligatorio.'
  errors.datos_personales.segundo_nombre = form.datos_personales.segundo_nombre
    ? ''
    : 'El segundo nombre es obligatorio.'
  errors.datos_personales.primer_apellido = form.datos_personales.primer_apellido
    ? ''
    : 'El primer apellido es obligatorio.'
  errors.datos_personales.segundo_apellido = form.datos_personales.segundo_apellido
    ? ''
    : 'El segundo apellido es obligatorio.'

  errors.datos_personales.correo_electronico = form.datos_personales.correo_electronico
    ? /^\S+@\S+\.\S+$/.test(form.datos_personales.correo_electronico)
      ? ''
      : 'Correo inválido.'
    : 'El correo es obligatorio.'
  // Validar teléfono: debe tener formato 999-9999999 o solo dígitos, longitud 7-15
  if (!form.datos_personales.telefono) {
    errors.datos_personales.telefono = 'El teléfono es obligatorio.'
  } else {
    // Permitir formato con guion o solo números
    const tel = form.datos_personales.telefono.replace(/-/g, '')
    if (!/^\d{7,15}$/.test(tel)) {
      errors.datos_personales.telefono = 'Teléfono inválido. Debe tener entre 7 y 15 dígitos.'
    } else {
      errors.datos_personales.telefono = ''
    }
  }
  errors.datos_personales.numero_documento = form.datos_personales.numero_documento
    ? ''
    : 'El número de documento es obligatorio.'
  errors.datos_personales.direccion_residencia = form.datos_personales.direccion_residencia
    ? ''
    : 'La dirección de residencia es obligatoria.'
  errors.datos_personales.pais_residencia = form.datos_personales.pais_residencia
    ? ''
    : 'El país de residencia es obligatorio.'
  // Validar fecha de expedición: obligatoria y debe ser una fecha válida
  if (!form.datos_personales.fecha_documento_expedicion) {
    errors.datos_personales.fecha_expedicion = 'La fecha de expedición es obligatoria.'
  } else {
    // Permitir Date o string yyyy-mm-dd
    let fecha = form.datos_personales.fecha_documento_expedicion
    let dateObj = typeof fecha === 'string' ? new Date(fecha) : fecha
    if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
      errors.datos_personales.fecha_expedicion = ''
    } else {
      errors.datos_personales.fecha_expedicion = 'La fecha de expedición no es válida.'
    }
  }
  errors.datos_personales.genero = form.datos_personales.genero ? '' : 'El género es obligatorio.'
  errors.datos_personales.estado_civil = form.datos_personales.estado_civil ? '' : 'El estado civil es obligatorio.'
  errors.datos_personales.tipo_documento = form.datos_personales.tipo_documento
    ? ''
    : 'El tipo de documento es obligatorio.'

  // Recolectar errores
  Object.keys(errors.datos_personales).forEach((key) => {
    if (errors.datos_personales[key]) {
      errorList.value.push(errors.datos_personales[key])
    }
  })

  return errorList.value.length === 0
}

const openDialogExperienciaAgregar = () => {
  form.experiencia_laboral.push({
    cargo: '',
    nombre_empresa: '',
    actual: false,
    fecha_inicio: '',
    fecha_fin: '',
    funciones: '',
  })

  let index = form.experiencia_laboral.length - 1

  dialogIndex.value = index
  visible_experiencia.value = true
}

const openDialogEducacionAgregar = () => {
  form.estudios.push({
    nombre: '',
    nivel: '',
    actual: false,
    fecha_inicio: '',
    fecha_fin: '',
  })

  let index = form.estudios.length - 1
  dialogIndexEstudio.value = index
  visible_educacion.value = true
}

const openDialogEducacionEditar = (index) => {
  dialogIndexEstudio.value = index
  visible_educacion.value = true
}

const limpiarArregloEducacion = (index) => {
  visible_educacion.value = false
  // si el nivel de estudio esta vacio, eliminar el estudio del arreglo
  if (!form.estudios[index].nivel) {
    form.estudios.splice(index, 1)
  }
}

const limpiarArregloLaboral = (index) => {
  // si el nivel de estudio esta vacio, eliminar el estudio del arreglo
  visible_experiencia.value = false
  if (!form.experiencia_laboral[index].cargo) {
    form.experiencia_laboral.splice(index, 1)
  }
}

const openDialogEducacionEliminar = (index) => {
  form.estudios.splice(index, 1)
}

const openDialogExperienciaEditar = (index) => {
  dialogIndex.value = index
  visible_experiencia.value = true
}

const openDialogExperienciaEliminar = (index) => {
  form.experiencia_laboral.splice(index, 1)
}

const openDialogSagrilaftAgregar = () => {
  visible_sagrilaft.value = true
}

// Función para formatear fechas a yyyy-mm-dd
function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d)) return date
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

async function onSubmit() {
  if (validate()) {
    submitted.value = true

    try {
      if (form.datos_personales.fecha_documento_expedicion) {
        form.datos_personales.fecha_documento_expedicion = formatDate(form.datos_personales.fecha_documento_expedicion)
      }

      const payload = {
        identificacion: form.datos_personales.numero_documento,
        informacion: form,
      }

      http('http://localhost:3000/')
        .post('records/save', payload)
        .then((response) => {
          console.log(':rocket: ~ .then ~ response', response.data)
          swal('Recovery Pass!', 'Se ha actualizado el registro!', 'success')
        })
        .catch((error) => {
          console.log(error)
          swal('Wrong!', 'Sucedio Error al Crear Usuario!', 'error')
        })
    } catch (error) {
      console.error('Error en la llamada de red:', error)
      submitted.value = false
    }
  } else {
    visible_errores.value = true
  }
}

const data_entidad_financiera = ref()

const data_pep_familiar = ref()

const columns_entidad_financiera = ref([
  { field: 'nombre_entidad', header: 'Nombre entidad' },
  { field: 'tipo_producto', header: 'Tipo producto' },
  { field: 'numero_producto', header: 'Numero producto' },
  { field: 'ciudad', header: 'Ciudad' },
  { field: 'pais', header: 'Pais' },
  { field: 'moneda', header: 'Moneda' },
  { field: 'monto', header: 'Monto' },
])

const columns_pep = ref([
  { field: 'nombre_completo', header: 'Nombre Completo' },
  { field: 'tipo_identificacion', header: 'Tipo Identificación' },
  { field: 'numero_identificacion', header: 'Numero Identificación' },
  { field: 'parentesco', header: 'Parentesco' },
  { field: 'descripcion_pep', header: 'Descripción PEP' },
])

const onCellEditComplete = (event) => {
  let { data, newValue, field } = event

  switch (field) {
    case 'numero_producto':
      if (isPositiveInteger(newValue)) data[field] = newValue
      else event.preventDefault()
      break

    default:
      if (newValue.trim().length > 0) data[field] = newValue
      else event.preventDefault()
      break
  }
}

const isPositiveInteger = (val) => {
  let str = String(val)

  str = str.trim()

  if (!str) {
    return false
  }

  str = str.replace(/^0+/, '') || '0'
  var n = Math.floor(Number(str))

  return n !== Infinity && String(n) === str && n >= 0
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

const createPepData = (number) => {
  console.log('Creando datos PEP para:', number)
  PepService.getCreateData(number).then((data) => (data_pep_familiar.value = data))
}

/*
onMounted(() => {
  ProductService.getProductsMini().then((data) => {
    data_entidad_financiera.value = data
    // Inicializar productos_financieros si hay datos
    if (Array.isArray(data)) {
      form.sagrilaft.operaciones_internacionales.productos_financieros = [...data]
    }
  })
})
  */

// Watcher para sincronizar cambios en data_entidad_financiera con el formulario
watch(
  data_entidad_financiera,
  (newVal) => {
    if (Array.isArray(newVal)) {
      form.sagrilaft.operaciones_internacionales.productos_financieros = [...newVal]
    } else {
      form.sagrilaft.operaciones_internacionales.productos_financieros = []
    }
  },
  { deep: true },
)

// Watcher para sincronizar cambios en data_pep_familiar con el formulario
watch(
  data_pep_familiar,
  (newVal) => {
    if (Array.isArray(newVal)) {
      form.sagrilaft.personas_expuestas_politicamente.familia_considerada_pep_persona = [...newVal]
    } else {
      form.sagrilaft.personas_expuestas_politicamente.familia_considerada_pep_persona = []
    }
  },
  { deep: true },
)

onMounted(() => {
  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'
  document.title = 'Hoja de Vida'
  document.documentElement.style.setProperty('--animate-duration', '.9s')
  //document.body.style.background = `url(${imgBodyBackGround})`

  if (user.value && user.value.username) {
    http('http://localhost:3000/records')
      .get(`buscar/${user.value.username}`)
      .then((response) => {
        if (response.data) {
          console.log('Registro encontrado, cargando datos...')
          // Se asume que los datos vienen en response.data.informacion o directamente en response.data
          Object.assign(form, response.data[0].informacion || response.data)

          data_entidad_financiera.value = [
            ...response.data[0].informacion.sagrilaft.operaciones_internacionales.productos_financieros,
          ]

          data_pep_familiar.value = [
            ...response.data[0].informacion.sagrilaft.personas_expuestas_politicamente.familia_considerada_pep_persona,
          ]
        }
      })
      .catch((error) => {
        console.log('No se encontraron registros previos o hubo un error:', error)
      })
  }
})
</script>

<template>
  <div class="flex flex-row min-h-screen items-center justify-between background-main transition-colors duration-300">
    <div class="flex flex-col justify-start items-center w-full">
      <div class="card gap-3 mb-4 lg:w-[70%] md:w-[90%] sm:w-[100%]">
        <Panel class="p-panel-noborder">
          <template #header>
            <div class="flex flex-col items-center justify-center w-full gap-2">
              <span class="font-bold text-shadow-sm uppercase font-mono">Instrucciones Inscripción Hoja de Vida </span>
              <Image :src="login" alt="Image" width="150" class="mx-auto mb-2" />
              <strong>Usuario {{ user.value.username }}</strong>
            </div>
          </template>

          <template #footer>
            <div class="flex flex-wrap items-center justify-center gap-4">
              <div class="flex items-center gap-2">
                <Button label="Validar Formulario" class="w-90" @click="onSubmit" />
              </div>
              <!--  <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span> -->
            </div>
          </template>

          <div class="flex flex-col items-left justify-between">
            <div class="p-4">
              <p class="m-0">
                Editar Informacion dar click en el icono de lapiz.
                <Button icon="pi pi-pen-to-square" severity="secondary" raised rounded text />
              </p>
            </div>

            <!-- Datos Personales -->
            <div class="flex flex-col justify-start items-center w-full">
              <div class="card gap-3 mb-4 w-full">
                <Panel class="p-panel-noborder" toggleable>
                  <template #header>
                    <div class="flex items-center gap-2">
                      <div>
                        <strong class="font-bold">Datos Personales</strong>
                      </div>
                      <div>
                        <Button
                          icon="pi pi-pen-to-square"
                          severity="info"
                          raised
                          rounded
                          aria-label="DP"
                          text
                          @click="visible_datos_personales = true"
                        />
                      </div>
                    </div>
                  </template>

                  <div class="grid lg:grid-cols-6 md:grid-cols-3 gap-2">
                    <div class="p-1 m-0">
                      <small>
                        <strong>Nombre: </strong>
                        {{
                          form.datos_personales.primer_nombre +
                          ' ' +
                          form.datos_personales.segundo_nombre +
                          ' ' +
                          form.datos_personales.primer_apellido +
                          ' ' +
                          form.datos_personales.segundo_apellido
                        }}
                      </small>
                    </div>
                    <div class="p-1 m-0">
                      <small> <strong>Teléfono:</strong> {{ form.datos_personales.telefono }} </small>
                    </div>
                    <div class="p-1 m-0">
                      <small>
                        <strong>Correo Electrónico:</strong>
                        {{ form.datos_personales.correo_electronico }}
                      </small>
                    </div>
                    <div class="p-1 m-0">
                      <small> <strong>Calzado :</strong> {{ form.tallas.calzado }} </small>
                    </div>
                    <div class="p-1 m-0">
                      <small> <strong>Pantalon :</strong> {{ form.tallas.pantalon }} </small>
                    </div>
                    <div class="p-1 m-0">
                      <small> <strong>Camisa :</strong> {{ form.tallas.camisa }} </small>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>

            <!-- Experiencia Laboral -->
            <div class="card gap-3 mb-4 w-full">
              <Panel class="p-panel-noborder" toggleable>
                <template #header>
                  <div class="flex items-center gap-2">
                    <strong class="font-bold">Experiencia laboral</strong>
                    <div>
                      <Button
                        icon="pi pi-pen-to-square"
                        severity="info"
                        raised
                        rounded
                        text
                        @click="openDialogExperienciaAgregar()"
                      />
                    </div>
                  </div>
                </template>

                <div v-if="form.experiencia_laboral.length > 0">
                  <Timeline :value="form.experiencia_laboral" align="left" class="w-full md:w-90rem">
                    <template #opposite="slotProps">
                      <div class="flex flex-row justify-end">
                        <div class="pl-2">
                          <Button
                            icon="pi pi-pen-to-square"
                            variant="text"
                            severity="warn"
                            raised
                            rounded
                            aria-label="Filter"
                            @click="openDialogExperienciaEditar(slotProps.index)"
                          />
                        </div>

                        <div class="pl-2">
                          <Button
                            icon="pi pi-trash"
                            severity="danger"
                            variant="text"
                            raised
                            rounded
                            aria-label="Filter"
                            @click="openDialogExperienciaEliminar(slotProps.index)"
                          />
                        </div>
                      </div>
                    </template>
                    <template #content="slotProps">
                      <div class="flex flex-row items-left justify-between">
                        <div class="flex flex-col items-left justify-between">
                          <div class="mb-2">
                            <small class="text-surface-500 dark:text-surface-400">
                              <span> Empresa: {{ slotProps.item.nombre_empresa }}</span> - <span> Cargo:</span>
                              {{ slotProps.item.cargo }}</small
                            >
                          </div>

                          <div>
                            <small class="text-surface-500 dark:text-surface-400">
                              <p>
                                {{ formatDate(slotProps.item.fecha_inicio) }} -
                                {{ formatDate(slotProps.item.fecha_fin) }}
                              </p>
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
            <div class="card gap-3 mb-4 w-full">
              <Panel class="p-panel-noborder" toggleable>
                <template #header>
                  <div class="flex items-center gap-2">
                    <strong class="font-bold">Estudios</strong>
                    <div>
                      <Button
                        icon="pi pi-pen-to-square"
                        severity="info"
                        raised
                        rounded
                        text
                        @click="openDialogEducacionAgregar()"
                      />
                    </div>
                  </div>
                </template>

                <div v-if="form.estudios.length > 0" class="flex flex-row items-left justify-start">
                  <Timeline :value="form.estudios" align="left" class="w-full md:w-90rem">
                    <template #opposite="slotProps">
                      <div class="flex flex-row justify-end">
                        <div class="pl-2">
                          <Button
                            icon="pi pi-pen-to-square"
                            variant="text"
                            severity="warn"
                            raised
                            rounded
                            aria-label="Filter"
                            @click="openDialogEducacionEditar(slotProps.index)"
                          />
                        </div>

                        <div class="pl-2">
                          <Button
                            icon="pi pi-trash"
                            severity="danger"
                            variant="text"
                            raised
                            rounded
                            aria-label="Filter"
                            @click="openDialogEducacionEliminar(slotProps.index)"
                          />
                        </div>
                      </div>
                    </template>

                    <template #content="slotProps">
                      <div class="flex flex-row items-left justify-between">
                        <div class="flex flex-col items-left justify-between">
                          <div class="mb-2">
                            <small class="text-surface-500 dark:text-surface-400">
                              <span> Estudio: {{ slotProps.item.nombre }}</span> - <span> Nivel:</span>
                              {{ slotProps.item.nivel.label }}</small
                            >
                          </div>

                          <div>
                            <small class="text-surface-500 dark:text-surface-400">
                              <p>
                                {{ formatDate(slotProps.item.fecha_inicio) }} -
                                {{ formatDate(slotProps.item.fecha_fin) }}
                              </p>
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
            <div class="card gap-3 mb-4 w-full">
              <Panel class="p-panel-noborder" toggleable>
                <template #header>
                  <div class="flex items-center gap-2">
                    <strong class="font-bold">Sagrilaft</strong>
                    <div>
                      <Button
                        icon="pi pi-pen-to-square"
                        severity="info"
                        raised
                        rounded
                        text
                        @click="openDialogSagrilaftAgregar()"
                      />
                    </div>
                  </div>
                </template>
              </Panel>
            </div>
          </div>
        </Panel>
      </div>

      <div v-if="submitted" class="p-mt-3 p-message p-message-success">¡Formulario enviado correctamente!</div>
    </div>
  </div>

  <!-- Errores -->
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
  <Dialog
    v-model:visible="visible_datos_personales"
    modal
    header="Editar Informacion Personal"
    :data="form.datos_personales"
    :style="{ width: '75rem' }"
  >
    <Panel header="Datos Personales" class="p-panel-noborder">
      <form @submit.prevent="onSubmit" novalidate>
        <div class="grid lg:grid-cols-4 md:grid-cols-3 gap-2">
          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.datos_personales.primer_nombre"
                  placeholder="Primer nombre"
                  id="primer_nombre"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.primer_nombre }"
                  fluid
                />
              </IconField>
              <label for="primer_nombre">Primer nombre</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.datos_personales.segundo_nombre"
                  placeholder="Segundo nombre"
                  id="segundo_nombre"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.segundo_nombre }"
                  fluid
                />
              </IconField>
              <label for="segundo_nombre">Segundo nombre</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.datos_personales.primer_apellido"
                  placeholder="Primer apellido"
                  id="primer_apellido"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.primer_apellido }"
                  fluid
                />
              </IconField>
              <label for="primer_apellido">Primer Apellido</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.datos_personales.segundo_apellido"
                  placeholder="Segundo apellido"
                  id="segundo_apellido"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.segundo_apellido }"
                  fluid
                />
              </IconField>
              <label for="segundo_apellido">Segundo Apellido</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.datos_personales.correo_electronico"
                  placeholder="Correo electrónico"
                  id="correo_electronico"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.correo_electronico }"
                  fluid
                />
              </IconField>
              <label for="correo_electronico">Correo electrónico</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputMask
                  v-model="form.datos_personales.telefono"
                  id="telefono"
                  mask="999-9999999"
                  placeholder="xxx-xxxxxx"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.telefono }"
                  fluid
                />
              </IconField>
              <label for="telefono">telefono</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <Select
                  id="option"
                  v-model="form.datos_personales.estado_civil"
                  :options="lista_estado_civil"
                  optionLabel="label"
                  :class="{ 'p-invalid': errors.datos_personales.estado_civil }"
                  fluid
                />
                <label for="estado_civil">Estado civil</label>
              </IconField>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <DatePicker
                  v-model="form.datos_personales.fecha_nacimiento"
                  :class="{ 'p-invalid': errors.datos_personales.fecha_nacimiento }"
                  showIcon
                  fluid
                />
              </IconField>
              <label for="fecha_nacimiento">Fecha nacimiento</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <Select
                  id="option"
                  v-model="form.datos_personales.pais_residencia"
                  :options="lista_paises"
                  optionLabel="label"
                  :class="{ 'p-invalid': errors.datos_personales.pais_residencia }"
                  fluid
                />
              </IconField>
              <label for="pais_residencia">País de residencia</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.datos_personales.ciudad_residencia"
                  id="ciudad_residencia"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.ciudad_residencia }"
                  fluid
                />
              </IconField>
              <label for="ciudad_residencia">Ciudad de residencia</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.datos_personales.direccion_residencia"
                  id="direccion_residencia"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.direccion_residencia }"
                  fluid
                />
              </IconField>
              <label for="direccion_residencia">Dirección de residencia</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <Select
                  class="w-full"
                  id="option"
                  v-model="form.datos_personales.tipo_documento"
                  :options="lista_documento"
                  optionLabel="label"
                  :class="{ 'p-invalid': errors.datos_personales.tipo_documento }"
                  fluid
                />
              </IconField>
              <label for="tipo_documento">Tipo Documento</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.datos_personales.numero_documento"
                  placeholder="Número de documento"
                  id="numero_documento"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.numero_documento }"
                  readonly
                  fluid
                />
              </IconField>
              <label for="numero_documento">Numero Documento</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <DatePicker
                  v-model="form.datos_personales.fecha_documento_expedicion"
                  :class="{ 'p-invalid': errors.datos_personales.fecha_expedicion }"
                  dateFormat="yy-mm-dd"
                  showIcon
                  fluid
                />
              </IconField>
              <label for="fecha_expedicion">F. expedición documento</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.datos_personales.ciudad_documento_expedicion"
                  id="ciudad_documento_expedicion"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.ciudad_documento_expedicion }"
                  fluid
                />
              </IconField>
              <label for="ciudad_documento_expedicion">Ciudad de expedición del documento</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField class="w-full">
                <Select
                  id="option"
                  v-model="form.datos_personales.genero"
                  :options="lista_genero"
                  optionLabel="label"
                  :class="{ 'p-invalid': errors.datos_personales.genero }"
                  fluid
                />
                <label for="genero">Género Biológico</label>
              </IconField>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField class="w-full">
                <Select
                  id="option"
                  v-model="form.datos_personales.genero_identitario_sn"
                  :options="opcion_sn"
                  optionLabel="label"
                  :class="{ 'p-invalid': errors.datos_personales.genero_identitario_sn }"
                  fluid
                />
                <label for="genero_identitario">Género Identitario</label>
              </IconField>
            </FloatLabel>
          </div>

          <div class="p-field" v-if="form.datos_personales.genero_identitario_sn.value === 'SI'">
            <FloatLabel variant="in">
              <IconField class="w-full">
                <Select
                  id="option"
                  v-model="form.datos_personales.genero_identitario"
                  :options="lista_genero_identitario"
                  optionLabel="label"
                  :class="{ 'p-invalid': errors.datos_personales.genero_identitario }"
                  fluid
                />
                <label for="genero_identitario">Género Identitario</label>
              </IconField>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField class="w-full">
                <Select
                  id="option"
                  v-model="form.datos_personales.nombre_identitario_sn"
                  :options="opcion_sn"
                  optionLabel="label"
                  :class="{ 'p-invalid': errors.datos_personales.nombre_identitario }"
                  fluid
                />
                <label for="nombre_identitario">Nombre Identitario</label>
              </IconField>
            </FloatLabel>
          </div>

          <div class="p-field" v-if="form.datos_personales.nombre_identitario_sn.value === 'SI'">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.datos_personales.nombre_identitario"
                  placeholder="Nombre identitario"
                  id="nombre_identitario"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.nombre_identitario }"
                  fluid
                />
              </IconField>
              <label for="nombre_identitario">Nombre Identitario</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField class="w-full">
                <Select
                  id="option"
                  v-model="form.datos_personales.hijos_sn"
                  :options="opcion_sn"
                  optionLabel="label"
                  :class="{ 'p-invalid': errors.datos_personales.hijos_sn }"
                  fluid
                />
                <label for="hijos_sn">Tiene hijos</label>
              </IconField>
            </FloatLabel>
          </div>

          <div class="p-field" v-if="form.datos_personales.hijos_sn.value === 'SI'">
            <FloatLabel variant="in">
              <IconField>
                <InputNumber
                  v-model="form.datos_personales.numero_hijos"
                  placeholder="Número de hijos"
                  id="numero_hijos"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.numero_hijos }"
                  fluid
                />
              </IconField>
              <label for="numero_hijos">Número de hijos</label>
            </FloatLabel>
          </div>

          <div class="p-field">
            <FloatLabel variant="in">
              <IconField class="w-full">
                <Select
                  id="option"
                  v-model="form.datos_personales.alergico_sn"
                  :options="opcion_sn"
                  optionLabel="label"
                  :class="{ 'p-invalid': errors.datos_personales.alergico_sn }"
                  fluid
                />
                <label for="alergico_sn">Es alérgico</label>
              </IconField>
            </FloatLabel>
          </div>

          <div class="p-field" v-if="form.datos_personales.alergico_sn.value === 'SI'">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.datos_personales.alergico_descripcion"
                  placeholder="Alergias"
                  id="alergico_descripcion"
                  size="small"
                  :class="{ 'p-invalid': errors.datos_personales.alergico_descripcion }"
                  fluid
                />
              </IconField>
              <label for="alergico_descripcion">Alergias</label>
            </FloatLabel>
          </div>
        </div>
      </form>
    </Panel>

    <Panel header="Datos de contacto adicional" class="p-panel-noborder">
      <div class="grid lg:grid-cols-3 grid-cols-1 gap-2">
        <div class="p-field w-full">
          <FloatLabel variant="in">
            <IconField>
              <InputText
                v-model="form.datos_contacto_adicional.nombre_contacto"
                placeholder="Nombre contacto de emergencia"
                id="contacto_emergencia_nombre"
                size="small"
                :class="{ 'p-invalid': errors.datos_contacto_adicional.nombre_contacto }"
                fluid
              />
            </IconField>
            <label for="contacto_emergencia_nombre">Nombre contacto de emergencia</label>
          </FloatLabel>
        </div>

        <div class="p-field w-full">
          <FloatLabel variant="in">
            <IconField>
              <InputMask
                v-model="form.datos_contacto_adicional.telefono_contacto"
                id="contacto_emergencia_telefono"
                mask="999-9999999"
                placeholder="xxx-xxxxxx"
                size="small"
                :class="{ 'p-invalid': errors.datos_contacto_adicional.telefono_contacto }"
                fluid
              />
            </IconField>
            <label for="contacto_emergencia_telefono">Teléfono contacto de emergencia</label>
          </FloatLabel>
        </div>

        <div class="p-field w-full">
          <FloatLabel variant="in">
            <IconField class="w-full">
              <Select
                id="option"
                v-model="form.datos_personales.parentesco_contacto"
                :options="lista_parentesco_familiar"
                optionLabel="label"
                :class="{ 'p-invalid': errors.datos_personales.parentesco_contacto }"
                fluid
              />
              <label for="contacto_emergencia_relacion">Relación contacto de emergencia</label>
            </IconField>
          </FloatLabel>
        </div>
      </div>
    </Panel>

    <Panel header="Datos de postulación" class="p-panel-noborder">
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-2">
        <div class="p-field w-full">
          <FloatLabel variant="in">
            <IconField>
              <InputText
                v-model="form.datos_postulacion.nombre_empresa"
                placeholder="Nombre de la empresa"
                id="nombre_empresa"
                size="small"
                :class="{ 'p-invalid': errors.datos_postulacion.nombre_empresa }"
                fluid
              />
            </IconField>
            <label for="nombre_empresa">Nombre de la empresa</label>
          </FloatLabel>
        </div>

        <div class="p-field w-full">
          <FloatLabel variant="in">
            <IconField>
              <InputText
                v-model="form.datos_postulacion.cargo_postulado"
                placeholder="Cargo postulado"
                id="cargo_postulado"
                size="small"
                :class="{ 'p-invalid': errors.datos_postulacion.cargo_postulado }"
                fluid
              />
            </IconField>
            <label for="cargo_postulado">Cargo postulado</label>
          </FloatLabel>
        </div>
      </div>
    </Panel>

    <Panel header="Tallas" class="p-panel-noborder">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-center justify-around">
        <div class="p-field w-full">
          <FloatLabel variant="in">
            <IconField>
              <InputText
                v-model="form.tallas.calzado"
                placeholder="Talla de calzado"
                id="calzado"
                size="small"
                :class="{ 'p-invalid': errors.tallas.calzado }"
                fluid
              />
            </IconField>
            <label for="calzado">Talla de calzado</label>
          </FloatLabel>
        </div>

        <div class="p-field w-full">
          <FloatLabel variant="in">
            <IconField>
              <InputText
                v-model="form.tallas.pantalon"
                placeholder="Talla de pantalón"
                id="pantalon"
                size="small"
                :class="{ 'p-invalid': errors.tallas.pantalon }"
                fluid
              />
            </IconField>
            <label for="pantalon">Talla de pantalón</label>
          </FloatLabel>
        </div>

        <div class="p-field w-full">
          <FloatLabel variant="in">
            <IconField>
              <InputText
                v-model="form.tallas.camisa"
                placeholder="Talla de camisa"
                id="camisa"
                size="small"
                :class="{ 'p-invalid': errors.tallas.camisa }"
                fluid
              />
            </IconField>
            <label for="camisa">Talla de camisa</label>
          </FloatLabel>
        </div>

        <div class="p-field w-full">
          <FloatLabel variant="in">
            <IconField>
              <InputText
                v-model="form.tallas.estatura"
                placeholder="Estatura"
                id="estatura"
                size="small"
                :class="{ 'p-invalid': errors.tallas.estatura }"
                fluid
              />
            </IconField>
            <label for="estatura">Estatura</label>
          </FloatLabel>
        </div>

        <div class="p-field w-full">
          <FloatLabel variant="in">
            <IconField>
              <InputText
                v-model="form.tallas.peso"
                placeholder="Peso"
                id="peso"
                size="small"
                :class="{ 'p-invalid': errors.tallas.peso }"
                fluid
              />
            </IconField>
            <label for="peso">Peso</label>
          </FloatLabel>
        </div>
      </div>
    </Panel>

    <template #footer>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        severity="secondary"
        outlined
        @click="visible_datos_personales = false"
      />
    </template>
  </Dialog>

  <!-- Modal Experiencia Laboral -->
  <Dialog
    v-model:visible="visible_experiencia"
    modal
    header="Editar Informacion de Experiencia Laboral"
    :data="form.experiencia_laboral[dialogIndex]"
    :style="{ width: '75rem' }"
  >
    <div class="grid grid-cols-1 md:grid-cols-5 gap-2 items-center justify-center">
      <div class="p-field w-full">
        <FloatLabel variant="in">
          <IconField>
            <InputText
              v-model="form.experiencia_laboral[dialogIndex].nombre_empresa"
              id="nombre_empresa"
              size="small"
              :class="{ 'p-invalid': errors.experiencia_laboral.nombre_empresa }"
              fluid
            />
          </IconField>
          <label for="nombre_empresa">Nombre de la empresa</label>
        </FloatLabel>
      </div>

      <div class="p-field w-full">
        <FloatLabel variant="in">
          <IconField>
            <InputText
              v-model="form.experiencia_laboral[dialogIndex].cargo"
              id="cargo"
              size="small"
              :class="{ 'p-invalid': errors.experiencia_laboral.cargo }"
              fluid
            />
          </IconField>
          <label for="cargo">Cargo</label>
        </FloatLabel>
      </div>

      <div class="p-field w-full">
        <FloatLabel variant="in">
          <IconField>
            <Select
              id="actual"
              class="w-full"
              v-model="form.experiencia_laboral[dialogIndex].actual"
              :options="[
                { label: 'Sí', value: true },
                { label: 'No', value: false },
              ]"
              optionLabel="label"
              :class="{ 'p-invalid': errors.experiencia_laboral.actual }"
              fluid
            />
          </IconField>
          <label for="actual">¿Actualmente trabaja aquí?</label>
        </FloatLabel>
      </div>

      <div class="p-field w-full">
        <FloatLabel variant="in">
          <IconField>
            <DatePicker
              v-model="form.experiencia_laboral[dialogIndex].fecha_inicio"
              view="month"
              dateFormat="mm/yy"
              showIcon
              fluid
            />
          </IconField>
          <label for="fecha_inicio">Fecha de inicio</label>
        </FloatLabel>
      </div>

      <div class="p-field w-full">
        <FloatLabel variant="in">
          <IconField>
            <DatePicker
              v-model="form.experiencia_laboral[dialogIndex].fecha_fin"
              view="month"
              dateFormat="mm/yy"
              showIcon
              fluid
            />
          </IconField>
          <label for="fecha_fin">Fecha de fin</label>
        </FloatLabel>
      </div>

      <div class="p-field w-full col-span-5">
        <FloatLabel variant="in">
          <Textarea
            v-model="form.experiencia_laboral[dialogIndex].funciones"
            class="p-fieldset-textarea"
            :class="{ 'p-invalid': errors.experiencia_laboral.funciones }"
            rows="5"
            cols="30"
            fluid
          />
          <label for="funciones">Funciones</label>
        </FloatLabel>
      </div>
    </div>

    <template #footer>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        severity="secondary"
        outlined
        @click="limpiarArregloLaboral(dialogIndex)"
      />
    </template>
  </Dialog>

  <!-- Modal Educación, Estudios -->
  <Dialog
    v-model:visible="visible_educacion"
    modal
    header="Editar Informacion Estudios"
    :data="form.estudios[dialogIndexEstudio]"
    :style="{ width: '75rem' }"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
      <div class="p-field w-full">
        <FloatLabel variant="in">
          <IconField>
            <Select
              id="nivel"
              class="w-full"
              v-model="form.estudios[dialogIndexEstudio].nivel"
              :options="lista_nivel_estudio"
              optionLabel="label"
              :class="{ 'p-invalid': errors.estudios.nivel }"
              fluid
            />
          </IconField>
          <label for="nivel">Nivel de estudio</label>
        </FloatLabel>
      </div>

      <div class="p-field w-full">
        <FloatLabel variant="in">
          <IconField>
            <InputText
              v-model="form.estudios[dialogIndexEstudio].nombre"
              placeholder="Nombre de Institucion"
              id="nombre"
              size="small"
              :class="{ 'p-invalid': errors.estudios.nombre }"
              fluid
            />
          </IconField>
          <label for="nombre">Institucion</label>
        </FloatLabel>
      </div>

      <div class="p-field w-full">
        <FloatLabel variant="in">
          <IconField>
            <Select
              id="actual"
              class="w-full"
              v-model="form.estudios[dialogIndexEstudio].actual"
              :options="lista_estado_estudio"
              optionLabel="label"
              :class="{ 'p-invalid': errors.estudios.actual }"
              fluid
            />
          </IconField>
          <label for="actual">Estado Estudio</label>
        </FloatLabel>
      </div>

      <div class="p-field w-full">
        <FloatLabel variant="in">
          <IconField>
            <Select
              id="modalidad"
              class="w-full"
              v-model="form.estudios[dialogIndexEstudio].modalidad"
              :options="lista_modalidad_estudio"
              optionLabel="label"
              :class="{ 'p-invalid': errors.estudios.modalidad }"
              fluid
            />
          </IconField>
          <label for="modalidad">Modalidad de estudio</label>
        </FloatLabel>
      </div>

      <div class="p-field w-full">
        <FloatLabel variant="in">
          <IconField>
            <DatePicker
              v-model="form.estudios[dialogIndexEstudio].fecha_inicio"
              view="month"
              dateFormat="mm/yy"
              showIcon
              fluid
            />
          </IconField>
          <label for="fecha_inicio">Fecha de inicio</label>
        </FloatLabel>
      </div>

      <div class="p-field w-full">
        <FloatLabel variant="in">
          <IconField>
            <DatePicker
              v-model="form.estudios[dialogIndexEstudio].fecha_fin"
              view="month"
              dateFormat="mm/yy"
              showIcon
              fluid
            />
          </IconField>
          <label for="fecha_fin">Fecha de fin</label>
        </FloatLabel>
      </div>
    </div>
    <template #footer>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        severity="secondary"
        outlined
        @click="limpiarArregloEducacion(dialogIndexEstudio)"
      />
    </template>
  </Dialog>

  <!-- Modal Sagrilaft  -->
  <Dialog
    v-model:visible="visible_sagrilaft"
    modal
    header="Editar Informacion."
    :data="form.sagrilaft"
    :style="{ width: '90rem' }"
  >
    <div class="w-full">
      <Panel header="operaciones internacionales">
        <div class="grid lg:grid-cols-5 md:grid-cols-4 gap-2 justify-items-center">
          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <Select
                  id="option"
                  v-model="form.sagrilaft.operaciones_internacionales.moneda_extgranjera_sn"
                  :options="opcion_sn"
                  optionLabel="label"
                  :class="{
                    'p-invalid': errors.sagrilaft.operaciones_internacionales.moneda_extgranjera_sn,
                  }"
                  fluid
                />
              </IconField>
              <label for="moneda_extgranjera_sn">Moneda extranjera</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <Select
                  id="option"
                  editable
                  v-model="form.sagrilaft.operaciones_internacionales.tipo_moneda"
                  :options="opcion_tipo_moneda"
                  optionLabel="label"
                  :class="{ 'p-invalid': errors.sagrilaft.operaciones_internacionales.tipo_moneda }"
                  fluid
                />
              </IconField>
              <label for="tipo_moneda">Tipo de moneda</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <Select
                  id="option"
                  editable
                  v-model="form.sagrilaft.operaciones_internacionales.tipo_operacion"
                  :options="opcion_tipo_operacion_moneda"
                  optionLabel="label"
                  :class="{
                    'p-invalid': errors.sagrilaft.operaciones_internacionales.tipo_operacion,
                  }"
                  fluid
                />
              </IconField>
              <label for="tipo_operacion">Tipo de operación</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <Select
                  id="option"
                  v-model="form.sagrilaft.operaciones_internacionales.productos_financieros_sn"
                  :options="opcion_sn"
                  optionLabel="label"
                  :class="{
                    'p-invalid': errors.sagrilaft.operaciones_internacionales.productos_financieros_sn,
                  }"
                  fluid
                />
              </IconField>
              <label for="productos_financieros_sn">Productos financieros</label>
            </FloatLabel>
          </div>

          <div
            class="p-field w-full col-span-6"
            v-if="form.sagrilaft.operaciones_internacionales.productos_financieros_sn.value === 'SI'"
          >
            <DataTable
              :value="data_entidad_financiera"
              editMode="cell"
              @cell-edit-complete="onCellEditComplete"
              :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                  bodycell: ({ state }) => ({
                    class: [{ '!py-0': state['d_editing'] }],
                  }),
                },
              }"
            >
              <Column
                v-for="col of columns_entidad_financiera"
                :key="col.field"
                :field="col.field"
                :header="col.header"
              >
                <template #body="{ data, field }">
                  {{ field === 'numero_producto' ? formatCurrency(data[field]) : data[field] }}
                </template>
                <template #editor="{ data, field }">
                  <template v-if="field !== 'numero_producto'">
                    <InputText v-model="data[field]" autofocus fluid />
                  </template>
                  <template v-else>
                    <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" autofocus fluid />
                  </template>
                </template>
              </Column>
            </DataTable>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <Select
                  id="option"
                  v-model="form.sagrilaft.operaciones_internacionales.contrato_servidor_publico_extranjero_sn"
                  :options="opcion_sn"
                  optionLabel="label"
                  :class="{
                    'p-invalid': errors.sagrilaft.operaciones_internacionales.contrato_servidor_publico_extranjero_sn,
                  }"
                  fluid
                />
              </IconField>
              <label for="contrato_servidor_publico_extranjero_sn">Contrato servidor público E.</label>
            </FloatLabel>
          </div>

          <div
            class="p-field w-full"
            v-if="form.sagrilaft.operaciones_internacionales.contrato_servidor_publico_extranjero_sn.value === 'SI'"
          >
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.sagrilaft.operaciones_internacionales.contrato_servidor_publico_extranjero_detalles"
                  placeholder="Contrato servidor público E."
                  id="contrato_servidor_publico_extranjero_detalles"
                  size="small"
                  :class="{
                    'p-invalid':
                      errors.sagrilaft.operaciones_internacionales.contrato_servidor_publico_extranjero_detalles,
                  }"
                  fluid
                />
              </IconField>
              <label for="contrato_servidor_publico_extranjero_detalles">Contrato servidor público E. D. </label>
            </FloatLabel>
          </div>
        </div>
      </Panel>

      <Panel header="informacion financiera">
        <div class="grid grid-cols-2 gap-2 justify-items-center">
          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <InputNumber
                  v-model="form.sagrilaft.informacion_financiera.total_activos"
                  id="total_activos"
                  mode="currency"
                  size="small"
                  currency="USD"
                  locale="en-US"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.total_activos }"
                  autofocus
                  fluid
                />
              </IconField>
              <label for="total_activos">Total activos</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <InputNumber
                  v-model="form.sagrilaft.informacion_financiera.total_ingresos_mensuales"
                  id="total_ingresos_mensuales"
                  size="small"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  :class="{
                    'p-invalid': errors.sagrilaft.informacion_financiera.total_ingresos_mensuales,
                  }"
                  fluid
                />
              </IconField>
              <label for="total_ingresos_mensuales">Total ingresos mensuales</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <InputNumber
                  v-model="form.sagrilaft.informacion_financiera.total_pasivos"
                  id="total_pasivos"
                  size="small"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.total_pasivos }"
                  fluid
                />
              </IconField>
              <label for="total_pasivos">Total pasivos</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <InputText
                v-model="form.sagrilaft.informacion_financiera.otro_ingresos_mensuales"
                id="otro_ingresos_mensuales"
                size="small"
                mode="currency"
                currency="USD"
                locale="en-US"
                :class="{
                  'p-invalid': errors.sagrilaft.informacion_financiera.otro_ingresos_mensuales,
                }"
                fluid
              />

              <label for="otro_ingresos_mensuales">Otros ingresos mensuales</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <InputNumber
                  v-model="form.sagrilaft.informacion_financiera.total_patrimonio"
                  placeholder="Total patrimonio"
                  id="total_patrimonio"
                  size="small"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  :class="{ 'p-invalid': errors.sagrilaft.informacion_financiera.total_patrimonio }"
                  fluid
                />
              </IconField>
              <label for="total_patrimonio">Total patrimonio</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <InputNumber
                  v-model="form.sagrilaft.informacion_financiera.otro_egresos_mensuales"
                  placeholder="Otros egresos mensuales"
                  id="otro_egresos_mensuales"
                  size="small"
                  :class="{
                    'p-invalid': errors.sagrilaft.informacion_financiera.otro_egresos_mensuales,
                  }"
                  fluid
                />
              </IconField>
              <label for="otro_egresos_mensuales">Otros egresos mensuales</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <DatePicker v-model="form.sagrilaft.informacion_financiera.fecha_corte" size="small" showIcon fluid />
              </IconField>
              <label for="fecha_corte">Fecha corte</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.sagrilaft.informacion_financiera.otro_ingresos_detalle"
                  placeholder="Otros ingresos detalle"
                  id="otro_ingresos_detalle"
                  size="small"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  :class="{
                    'p-invalid': errors.sagrilaft.informacion_financiera.otro_ingresos_detalle,
                  }"
                  fluid
                />
              </IconField>
              <label for="otro_ingresos_detalle">Detalle de otros ingresos </label>
            </FloatLabel>
          </div>
        </div>
      </Panel>

      <Panel header="personas expuestas politicamente">
        <div class="grid grid-cols-4 gap-2 justify-items-center">
          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <Select
                  id="option"
                  v-model="form.sagrilaft.personas_expuestas_politicamente.maneja_recursos_publicos_sn"
                  :options="opcion_sn"
                  optionLabel="label"
                  :class="{
                    'p-invalid': errors.sagrilaft.personas_expuestas_politicamente.maneja_recursos_publicos_sn,
                  }"
                  fluid
                />
              </IconField>
              <label for="maneja_recursos_publicos_sn">Maneja recursos publicos</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <Select
                  id="option"
                  v-model="form.sagrilaft.personas_expuestas_politicamente.cargo_publico_sn"
                  :options="opcion_sn"
                  optionLabel="label"
                  :class="{
                    'p-invalid': errors.sagrilaft.personas_expuestas_politicamente.cargo_publico_sn,
                  }"
                  fluid
                />
              </IconField>
              <label for="cargo_publico_sn">Tiene o ha tenido cargo publico</label>
            </FloatLabel>
          </div>

          <div
            class="p-field w-full"
            v-if="form.sagrilaft.personas_expuestas_politicamente.cargo_publico_sn.value === 'SI'"
          >
            <FloatLabel variant="in">
              <IconField>
                <InputText
                  v-model="form.sagrilaft.personas_expuestas_politicamente.cargo_publico_detalle"
                  placeholder="Familia considerada PEP"
                  id="familia_considerada_pep_sn"
                  size="small"
                  :class="{
                    'p-invalid': errors.sagrilaft.personas_expuestas_politicamente.cargo_publico_detalle,
                  }"
                  fluid
                />
              </IconField>
              <label for="cargo_publico_sn">Cual cargo publico</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <Select
                  id="option"
                  v-model="form.sagrilaft.personas_expuestas_politicamente.goza_reconoscimiento_publico_sn"
                  :options="opcion_sn"
                  optionLabel="label"
                  :class="{
                    'p-invalid': errors.sagrilaft.personas_expuestas_politicamente.goza_reconoscimiento_publico_sn,
                  }"
                  fluid
                />
              </IconField>
              <label for="goza_reconoscimiento_publico_sn">Goza reconocimiento publico</label>
            </FloatLabel>
          </div>

          <div
            class="p-field w-full"
            v-if="form.sagrilaft.personas_expuestas_politicamente.goza_reconoscimiento_publico_sn.value === 'SI'"
          >
            <FloatLabel variant="in">
              <IconField>
                <DatePicker
                  v-model="form.sagrilaft.personas_expuestas_politicamente.fecha_desde_reconocimiento"
                  showIcon
                  fluid
                />
              </IconField>
              <label for="fecha_desde_reconocimiento">Fecha desde reconocimiento</label>
            </FloatLabel>
          </div>

          <div
            class="p-field w-full"
            v-if="form.sagrilaft.personas_expuestas_politicamente.goza_reconoscimiento_publico_sn.value === 'SI'"
          >
            <FloatLabel variant="in">
              <IconField>
                <DatePicker
                  v-model="form.sagrilaft.personas_expuestas_politicamente.fecha_hasta_reconocimiento"
                  showIcon
                  fluid
                />
              </IconField>
              <label for="fecha_hasta_reconocimiento">Fecha hasta reconocimiento</label>
            </FloatLabel>
          </div>

          <div class="p-field w-full">
            <FloatLabel variant="in">
              <IconField>
                <Select
                  id="option"
                  v-model="form.sagrilaft.personas_expuestas_politicamente.familia_considerada_pep_sn"
                  :options="opcion_sn"
                  optionLabel="label"
                  :class="{
                    'p-invalid': errors.sagrilaft.personas_expuestas_politicamente.familia_considerada_pep_sn,
                  }"
                  fluid
                />
              </IconField>
              <label for="familia_considerada_pep_sn">Familia considerada PEP</label>
            </FloatLabel>
          </div>

          <div
            class="p-field w-full"
            v-if="form.sagrilaft.personas_expuestas_politicamente.familia_considerada_pep_sn.value === 'SI'"
          >
            <FloatLabel variant="in">
              <IconField>
                <InputNumber
                  v-model="form.sagrilaft.personas_expuestas_politicamente.familia_considerada_pep_cantidad_persona"
                  inputId="familia_considerada_pep_sn"
                  :min="1"
                  :max="5"
                  showButtons
                  buttonLayout="horizontal"
                  :step="1"
                  fluid
                  @input="
                    createPepData(
                      form.sagrilaft.personas_expuestas_politicamente.familia_considerada_pep_cantidad_persona,
                    )
                  "
                >
                  <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                  </template>
                  <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                  </template>
                </InputNumber>
              </IconField>

              <label for="cargo_publico_sn">Cantidad Familia: </label>
            </FloatLabel>
          </div>

          <div
            class="p-field col-span-4 w-full"
            v-if="form.sagrilaft.personas_expuestas_politicamente.familia_considerada_pep_sn.value === 'SI'"
          >
            <DataTable
              :value="data_pep_familiar"
              editMode="cell"
              @cell-edit-complete="onCellEditComplete"
              :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                  bodycell: ({ state }) => ({
                    class: [{ '!py-0': state['d_editing'] }],
                  }),
                },
              }"
            >
              <Column v-for="col of columns_pep" :key="col.field" :field="col.field" :header="col.header">
                <template #body="{ data, field }">
                  {{ field === 'numero_producto' ? formatCurrency(data[field]) : data[field] }}
                </template>
                <template #editor="{ data, field }">
                  <template v-if="field !== 'numero_producto'">
                    <InputText v-model="data[field]" autofocus fluid />
                  </template>
                  <template v-else>
                    <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" autofocus fluid />
                  </template>
                </template>
              </Column>
            </DataTable>
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

.p-datepicker-style {
  width: 158px;
  height: 55px;
}

.p-fieldset-datepicker {
  width: 181px;
  height: 55px;
}

.p-fieldset-textarea {
  width: 95%;
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

.p-timeline-event-opposite {
  flex: 0 0 0% !important;
}
</style>
