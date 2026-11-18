# Copilot instructions for module-hv

These instructions supplement the repository-level `AGENTS.md` and apply to `module-hv`.

## Structure and patterns

- This is a Vue 3 single-page application built with Vite. The `@` alias resolves to `src/`.
- Keep page-level components in `src/views/`, reusable UI in `src/components/`, routes in `src/router/`, Pinia state in `src/stores/`, and shared styles/assets in `src/assets/`.
- Use the existing PrimeVue and Tailwind CSS setup for UI changes. Follow nearby component patterns rather than assuming a single form or validation convention.
- API functions live in `src/api/`; the configured Axios helpers live in `src/services/http-axios.js`. Reuse these where appropriate and preserve the existing environment selection in `src/env/`.
- When adding a view, register it in `src/router/index.js` and preserve the route's existing authentication metadata and navigation behavior.

## Commands

Run commands from this module directory, or use `pnpm --dir module-hv <script>` from the repository root:

- `pnpm install` to install this module's dependencies.
- `pnpm dev` to start the Vite development server.
- `pnpm build` to create the production build.
- `pnpm lint` to run ESLint. This script uses `--fix` and may modify files; account for that when choosing validation.

There is no test script in this module. Run the production build for changes that affect the application or its configuration.
