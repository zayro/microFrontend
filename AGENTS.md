# Agent instructions

## Repository layout

- This repository contains two independent Vue 3/Vite applications: `module-login` and `module-hv`. Work in the application relevant to the request; do not assume they share dependencies, configuration, or runtime behavior.
- Each application has its own `package.json` and lockfile, and there is no root `package.json`. Run package commands against the target module, for example `pnpm --dir module-login build` or `pnpm --dir module-hv build`.
- Keep changes inside the target module unless the request explicitly requires a repository-level change. Check that module's existing patterns before adding a dependency or duplicating functionality.
- `module-hv/.github/copilot-instructions.md` provides additional guidance scoped to `module-hv`.

## Application conventions

- Both applications use Vue 3 single-file components, Vue Router, Pinia, PrimeVue, and Vite. Follow the target module's existing component, routing, state, and styling patterns.
- Keep route definitions in `src/router/`, reusable components in `src/components/`, page-level components in `src/views/`, and state in `src/stores/`. Look for an existing API or transport helper before adding another; API modules are under `src/api/` and HTTP helpers under `src/services/`.
- Preserve each module's own environment configuration and API behavior. Never commit credentials or put secrets in frontend-exposed configuration.
- Preserve existing Spanish UI copy and terminology unless the requested change calls for different wording.

## Validation

- Neither module defines a test script. For application changes, run the target module's production build, such as `pnpm --dir module-login build`.
- Both `lint` scripts use auto-fix options. Run them only when those edits are intended; otherwise use the module's installed linter without `--fix` for changed files.
- Do not add a test framework or shared root tooling unless the task requires it.
