<script setup>
import { onMounted } from 'vue'
import { updatePrimaryPalette, updateSurfacePalette } from '@primeuix/themes';

import { useAppStoreRef } from '@/stores/config'

import Card from 'primevue/card';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import Divider from 'primevue/divider';



const appStore = useAppStoreRef(); // Instancia de AppStore



// Lista de temas disponibles
const themes = [
  {
    name: 'Indigo',
    color: 'indigo',
    chipClass: '!bg-indigo-500 !text-white'
  },
  {
    name: 'Sky',
    color: 'sky',
    chipClass: '!bg-sky-500 !text-white'
  },
  {
    name: 'Blue',
    color: 'blue',
    chipClass: '!bg-blue-500 !text-white'
  },
  {
    name: 'Cyan',
    color: 'cyan',
    chipClass: '!bg-cyan-500 !text-white'
  },
  {
    name: 'Teal',
    color: 'teal',
    chipClass: '!bg-teal-500 !text-white'
  },
  {
    name: 'Green',
    color: 'green',
    chipClass: '!bg-green-500 !text-white'
  },
  {
    name: 'Lime',
    color: 'lime',
    chipClass: '!bg-lime-500 !text-black'
  },
  {
    name: 'Yellow',
    color: 'yellow',
    chipClass: '!bg-yellow-400 !text-black'
  },
  {
    name: 'Amber',
    color: 'amber',
    chipClass: '!bg-amber-500 !text-black'
  },
  {
    name: 'Orange',
    color: 'orange',
    chipClass: '!bg-orange-500 !text-white'
  },
  {
    name: 'Red',
    color: 'red',
    chipClass: '!bg-red-500 !text-white'
  },
  {
    name: 'Pink',
    color: 'pink',
    chipClass: '!bg-pink-500 !text-white'
  },
  {
    name: 'Purple',
    color: 'purple',
    chipClass: '!bg-purple-500 !text-white'
  }
]

// Lista de superficies disponibles
const themeSurfaces = [
  {
    name: 'Zinc',
    color: 'zinc',
    chipClass: '!bg-zinc-400'
  },
  {
    name: 'Slate',
    color: 'slate',
    chipClass: '!bg-slate-400 '
  },
  {
    name: 'Stone',
    color: 'stone',
    chipClass: '!bg-stone-400 '
  },
  {
    name: 'Neutral',
    color: 'neutral',
    chipClass: '!bg-neutral-400 '
  },
  {
    name: 'Gray',
    color: 'gray',
    chipClass: '!bg-gray-400'
  }

]

// Cambia el tema dinámicamente según el color seleccionado
const changePrimaryColor = (color = 'blue') => {
  console.log('Cambiando color primario a:', color);
  appStore.setThemeColor(color);
  updatePrimaryPalette({
    50: `{${color}.50}`,
    100: `{${color}.100}`,
    200: `{${color}.200}`,
    300: `{${color}.300}`,
    400: `{${color}.400}`,
    500: `{${color}.500}`,
    600: `{${color}.600}`,
    700: `{${color}.700}`,
    800: `{${color}.800}`,
    900: `{${color}.900}`,
    950: `{${color}.950}`
  });
}

// Cambia los colores de las superficies según el color seleccionado
const changeSurfaces = (color = 'zinc') => {
  console.log('Cambiando superficies a:', color);
  appStore.setThemeSurfaces(color);
  updateSurfacePalette({
    50: `{${color}.50}`,
    100: `{${color}.100}`,
    200: `{${color}.200}`,
    300: `{${color}.300}`,
    400: `{${color}.400}`,
    500: `{${color}.500}`,
    600: `{${color}.600}`,
    700: `{${color}.700}`,
    800: `{${color}.800}`,
    900: `{${color}.900}`,
    950: `{${color}.950}`
  });
}

const setDarkTheme = () => {
  document.documentElement.classList.add('my-app-dark');
  appStore.setThemeDark(true);
}

const setLightTheme = () => {
  document.documentElement.classList.remove('my-app-dark');
  appStore.setThemeDark(false);
}

const setDefaultTheme = () => {
  changePrimaryColor(appStore.themeColor);
  changeSurfaces(appStore.themeSurfaces);
  if (appStore.themeDark) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
}

const resetTheme = () => {
  changePrimaryColor('blue');
  changeSurfaces('zinc');
}

onMounted(() => {
  setDefaultTheme();
  document.documentElement.style.setProperty('--animate-duration', '.9s')
  document.body.style.background = `linear-gradient(var(--p-surface-100), var(--p-surface-200))`;
})
</script>

<template>
  <div class="flex flex-col min-h-screen items-center justify-between ">
    <div class="flex items-center justify-center flex-1 w-full">
      <Card
        class="flex flex-col text-center py-6 px-4 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl shadow-lg backdrop-blur-sm mx-2">
        <template #content>

          <h1 class="text-3xl font-bold mb-4">¡Bienvenido a la Personalización de Temas!</h1>
          <p class="text-gray-600 mb-4">Selecciona un tema para cambiar el color primario de la aplicación.</p>
          <p class="text-gray-600">Haz clic en un chip para aplicar el
            <Chip label="Tema" />.
          </p>



          <div class="card flex flex-col items-center gap-4">


            <div class="flex flex-col gap-12">
              <div class="flex gap-6 flex-wrap justify-center">
                <div
                  class="rounded-border p-4 border border-transparent flex items-center justify-center bg-primary hover:bg-primary-emphasis text-primary-contrast font-medium flex-auto transition-colors">
                  primary</div>
                <div
                  class="rounded-border p-4 border border-transparent flex items-center justify-center bg-highlight hover:bg-highlight-emphasis font-medium flex-auto transition-colors">
                  highlight</div>
                <div
                  class="rounded-border p-4 border border-surface flex items-center justify-center text-muted-color hover:text-color hover:bg-emphasis font-medium flex-auto transition-colors">
                  box</div>
              </div>
              <div class="flex gap-6 flex-wrap justify-center">
                <Button type="button" severity="secondary" label="Submit" />
                <Button type="button" severity="primary" label="Reiniciar tema" @click="resetTheme" />
              </div>
            </div>


          </div>


          <Divider class="my-6" />

          <div class="flex items-center justify-center gap-3 mb-3 flex-wrap">
            <div v-for="theme in themes" :key="theme.color" class="flex">
              <Chip :class="`${theme.chipClass} px-4 py-2 rounded cursor-pointer`"
                @click="changePrimaryColor(theme.color)">
                {{ theme.name }}
              </Chip>
            </div>
          </div>

          <Divider class="my-6" />

          <div class="flex items-center justify-center gap-3 mb-3 flex-wrap">
            <div v-for="surface in themeSurfaces" :key="surface.color + surface.name" class="flex">
              <Chip :class="`${surface.chipClass} px-4 py-2 rounded cursor-pointer`"
                @click="changeSurfaces(surface.color)">
                {{ surface.name }}
              </Chip>
            </div>
          </div>


          <Divider class="my-6" />
          <div class="flex gap-6 flex-wrap justify-center">
            <Button type="button" severity="primary" label="Reiniciar tema" @click="resetTheme" />
            <Button type="button" severity="info" label="Tema Claro" @click="setLightTheme" />
            <Button type="button" severity="help" label="Tema Oscuro" @click="setDarkTheme" />
          </div>

        </template>
      </Card>



    </div>
  </div>
</template>

<style scoped="css"></style>
