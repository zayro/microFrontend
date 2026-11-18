# Copilot instructions for module-login

These instructions supplement the repository-level `AGENTS.md` and apply to `module-login`.

## Structure and patterns

- This is an independent Vue 3 single-page application built with Vite. Its `@` alias resolves to `src/`; use this module's own dependencies, lockfile, environment, and configuration.
- Keep page-level components in `src/views/`, reusable UI in `src/components/`, route definitions in `src/router/`, Pinia stores in `src/stores/`, API modules in `src/api/`, reusable hooks in `src/hook/`, and shared styles/assets in `src/assets/`.
- Use the existing PrimeVue, Tailwind CSS, Pinia, and TanStack Vue Query setup. Follow adjacent component patterns; form validation may use local logic or the installed VeeValidate/Yup libraries, so inspect nearby code before choosing.
- Reuse `src/services/http-axios.js` and existing API modules where appropriate. Preserve response handling and the existing API boundaries rather than duplicating requests in views.
- Authentication spans login views, `src/stores/config.js`, and the route guard in `src/router/index.js`. When changing it, check token persistence, navigation, and protected routes together.
- The electronic-signature and inductions features have existing API modules and some alternate `*FastApi.vue` views. Check the router and current call sites before changing a view or replacing an integration.
- API environment selection is in `src/env/` and `vite.config.js`. Do not expose credentials or commit secrets; do not inspect or edit environment files unless the task specifically requires it.
- Check whether hooks such as PouchDB and WebSocket are used before relying on or extending them. Do not assume their presence in `src/hook/` means they are active application flows.
- Preserve the existing UI language and terminology in the affected view.

## Commands

Run commands from this module directory, or use `pnpm --dir module-login <script>` from the repository root:

- `pnpm install` to install this module's dependencies.
- `pnpm dev` to start the Vite development server.
- `pnpm build` to create the production build.
- `pnpm lint` runs Oxlint and ESLint with `--fix`; it can modify files. For validation without auto-fixes, invoke the installed linter directly on changed files.

There is no test script in this module. Run the production build for application or configuration changes. Avoid running `pnpm format` as a validation step because it rewrites files under `src/`.
