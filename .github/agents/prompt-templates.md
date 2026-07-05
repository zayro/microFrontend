# Plantillas de Prompts para Agentes Frontend (Vue 3, Vite, PrimeVue, TailwindCSS v4)

Este archivo contiene plantillas de prompts diseñadas para activar y conectar a los agentes de IA en tus tareas diarias. Úsalas copiando el texto y reemplazando los corchetes `[...]` con los detalles específicos de tu requerimiento.

---

## 1. Diseño y Creación de Nuevos Componentes UI
*   **Agentes clave:** `Experto UI/UX y Estilos` (`ui-design`), `Experto Vue` (`vue-expert`).
*   **Propósito:** Crear componentes visualmente impresionantes, responsivos, accesibles y consistentes.

```markdown
Activa al Agente de UI/UX [ui-design] y al Experto Vue [vue-expert].
Necesito crear un componente reusable llamado [NombreComponente] (ej. AppCard.vue).

Requisitos de diseño:
- El componente debe representar [describir qué hace, ej. una tarjeta de usuario con acciones].
- Estilos con TailwindCSS v4 y componentes PrimeVue (como [ej. Button, Card, Skeleton]).
- Debe incluir estados hover suaves, transiciones fluidas y cumplir con accesibilidad (WCAG/a11y) con soporte para navegación por teclado y etiquetas correctas.
- El diseño debe ser responsive (mobile-first).

Entrega el código del componente en `<script setup>` con Composition API y un ejemplo de uso.
```

---

## 2. Formularios Complejos con Validación y Conectividad API
*   **Agentes clave:** `Experto en API y Estado` (`api-state`), `Experto UI/UX y Estilos` (`ui-design`).
*   **Propósito:** Crear la interfaz de un formulario, validar sus datos en el cliente e integrarlo con servicios API y stores globales.

```markdown
Activa al Agente de API y Estado [api-state] y al Agente de UI/UX [ui-design].
Quiero implementar un formulario de [propósito del formulario, ej. Registro de Hoja de Vida] en la vista [Ruta/Archivo].

Lógica e Integración (api-state):
- Define el esquema de validación usando [Yup / Zod].
- Integra el formulario usando [Vee-Validate].
- Al enviar, se debe ejecutar una mutación de TanStack Vue Query llamando al servicio Axios correspondientes en [ruta al archivo de servicios, ej. src/services/api.js] para el endpoint [ej. POST /user/resume].
- Si el request es exitoso, invalida la query [ej. 'userResume'] y muestra un SweetAlert de éxito. Si falla, maneja el error adecuadamente.

Diseño visual (ui-design):
- Crea la maquetación usando campos PrimeVue (ej. InputText, Dropdown, DatePicker).
- Muestra mensajes de error claros debajo de cada campo en rojo estilizado cuando no pasen la validación.
- Agrega un estado de carga (loading) en el botón de envío usando `isLoading` de la mutación.
```

---

## 3. Implementación de Estado Global con Pinia
*   **Agentes clave:** `Experto en API y Estado` (`api-state`), `Experto Vue` (`vue-expert`).
*   **Propósito:** Definir un nuevo módulo de estado global persistente y conectarlo a las vistas de la aplicación.

```markdown
Activa al Agente de API y Estado [api-state] y al Experto Vue [vue-expert].
Necesito crear un nuevo store de Pinia para manejar [ej. el carrito de compras / la sesión de reclutador].

Requisitos:
- Nombre del store: [ej. useJobStore] en `src/stores/[nombre].js`.
- Debe tener los siguientes estados iniciales: [lista de estados, ej. jobs: [], selectedJob: null, loading: false].
- Define las siguientes acciones (actions): [ej. fetchJobs() usando Axios, selectJob(job)].
- Habilita la persistencia de estado mediante `pinia-plugin-persistedstate`.
- Muestra cómo inyectar y usar este store en la vista [NombreDeLaVista.vue] de forma reactiva.
```

---

## 4. Aseguramiento de Calidad y Testing
*   **Agentes clave:** `Experto en Testing y QA` (`test-qa`), `Experto en API y Estado` (`api-state`).
*   **Propósito:** Escribir pruebas unitarias o de componentes para asegurar que la lógica de negocio y las validaciones no tengan regresiones.

```markdown
Activa al Agente de Testing y QA [test-qa] y al Agente de API y Estado [api-state].
Quiero escribir la suite de pruebas unitarias para [archivo a testear, ej. src/stores/user.js o src/components/LoginForm.vue].

Requisitos:
- Usa Vitest y Vue Test Utils.
- Debes mockear la llamada de API con Axios para simular respuestas exitosas y de error (ej. error 401 o 422).
- Si testeas un componente, simula eventos de usuario (clics, inputs) y verifica que se disparen las validaciones correspondientes y los emits esperados.
- Genera casos de prueba para:
  1. Flujo exitoso (happy path).
  2. Fallo de validación.
  3. Error de servidor (500).
```

---

## 5. Optimización de Rendimiento y Build
*   **Agentes clave:** `Experto en Configuración y Ops` (`ops-frontend`), `Experto Vue` (`vue-expert`).
*   **Propósito:** Resolver problemas de rendimiento de carga, optimizar archivos JS/CSS y configurar variables de entorno para producción.

```markdown
Activa al Agente de Ops [ops-frontend] y al Experto Vue [vue-expert].
Queremos optimizar la velocidad de carga inicial de nuestra SPA.

Tareas:
- Analiza `src/router/index.js` y sugiere cómo convertir la carga de vistas pesadas (como [ej. el Panel de Control o Reportes]) a carga diferida (lazy loading / dynamic imports).
- Revisa `vite.config.js` y optimiza las opciones del build (como minificación, división de chunks con rollupOptions, o compresión con brotli/gzip).
- Explica cómo probar el build localmente usando los scripts de package.json y comprobar el tamaño final de los archivos generados.
```
