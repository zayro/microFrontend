---
name: Agente módulo-login
description: Implementa y mantiene funciones exclusivamente en la aplicación Vue de module-login.
tools: ['read', 'search', 'edit', 'execute']
---

Trabaja exclusivamente en `module-login/`, siguiendo las instrucciones del `AGENTS.md` de la raíz. Antes de editar, revisa el componente, API, ruta o estado existente que corresponda y conserva el flujo actual salvo que la solicitud pida cambiarlo.

## Contexto del módulo

- Es una aplicación independiente Vue 3/Vite con Vue Router, Pinia, TanStack Vue Query, PrimeVue y Tailwind. Sus dependencias y scripts se administran desde `module-login/package.json`.
- Las vistas están en `src/views/`; las rutas, en `src/router/index.js`; el estado persistido, en `src/stores/config.js`; las llamadas de dominio, en `src/api/`; y el cliente Axios, en `src/services/http-axios.js`.
- El inicio de sesión, el token persistido y la protección de rutas están conectados. Al modificarlos, verifica juntos el formulario, el store y el guard del router para no romper la navegación autenticada.
- La vista pública `themeView` y el login se navegan mutuamente; las preferencias persisten en `useAppStoreRef` y se aplican globalmente desde `App.vue`. Mantén las tarjetas y campos del login vinculados a los tokens semánticos de PrimeVue para conservar tema, modo oscuro y transparencias.
- La firma electrónica y las inducciones usan APIs y mutaciones/consultas existentes. Reutiliza sus módulos y patrones antes de agregar llamadas nuevas. Confirma qué vista está conectada al router antes de modificar variantes como `*FastApi.vue`.
- La configuración de APIs se resuelve en `src/env/` y `vite.config.js`. No leas ni edites `.env` o `.env.production` salvo que sea imprescindible y autorizado; nunca expongas credenciales en el código cliente.
- No asumas que los hooks de PouchDB o WebSocket están integrados o activos: comprueba sus usos antes de depender de ellos.

## Implementación y validación

- Mantén los cambios acotados a `module-login/`; no modifiques `module-hv/` ni archivos del usuario ajenos a la solicitud.
- Sigue el estilo del archivo cercano: el código existente no es completamente uniforme. Conserva los textos y términos de interfaz existentes, en español o inglés según la vista.
- No hay script de pruebas automatizadas. Para cambios de aplicación, ejecuta `pnpm --dir module-login build`. Si necesitas lint, ejecuta ESLint u Oxlint sin `--fix` sobre los archivos modificados: el script `pnpm lint` aplica correcciones automáticamente.
- No ejecutes `pnpm format` para validar, ya que reescribe los archivos de `src/`. No agregues dependencias, alteres el lockfile ni cambies configuración global sin que la tarea lo requiera.
- Al terminar, resume los archivos cambiados y los comandos de validación ejecutados; indica claramente cualquier validación que no se haya podido completar.
