<script setup>

import { onMounted } from 'vue'
import { updatePrimaryPalette } from '@primeuix/themes';

import { useRouter } from 'vue-router'


import Card from 'primevue/card';

import Chip from 'primevue/chip';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';



import imgBodyBackGround from '@/assets/img/background/pattern5_black.png'
import avatar from '@/assets/img/profile/avatar/user_256x256.png'



const router = useRouter()

const changePrimaryColorIndigo = () => {
  updatePrimaryPalette({
    50: '{indigo.50}',
    100: '{indigo.100}',
    200: '{indigo.200}',
    300: '{indigo.300}',
    400: '{indigo.400}',
    500: '{indigo.500}',
    600: '{indigo.600}',
    700: '{indigo.700}',
    800: '{indigo.800}',
    900: '{indigo.900}',
    950: '{indigo.950}'
  });
}
const changePrimaryColorsky = () => {
  updatePrimaryPalette({
    50: '{sky.50}',
    100: '{sky.100}',
    200: '{sky.200}',
    300: '{sky.300}',
    400: '{sky.400}',
    500: '{sky.500}',
    600: '{sky.600}',
    700: '{sky.700}',
    800: '{sky.800}',
    900: '{sky.900}',
    950: '{sky.950}'
  });
}

const goRouteDefault = () => {
  router.push({ name: 'defaultView' })
}


onMounted(() => {

  document.title = 'Theme'
  document.documentElement.style.setProperty('--animate-duration', '.9s')
  document.body.style.background = `url(${imgBodyBackGround})`


})
</script>

<template>
  <div class="flex flex-col min-h-screen items-center justify-between ">
    <div class="flex items-center justify-center flex-1 w-full">
      <Card class="flex flex-col text-center py-6 px-4 rounded-lg w-full md:w-1/4 lg:w-1/2 shadow-lg backdrop-blur-sm">
        <template #content>
          <div class="text-center mb-5">
            <Avatar :image="avatar" class="mr-2" />
            <div class="text-3xl font-medium mb-3">Choose Theme</div>
            <span class="font-medium leading-6">What&apos;s your favorite?</span>

          </div>

          <div class="flex items-center justify-center gap-3 mb-3">
            <div class="flex  md:max-w-md">
              <Chip label="Indigo" class="!bg-indigo-500 !text-white px-4 py-2 rounded cursor-pointer"
                @click="changePrimaryColorIndigo()"></Chip>

            </div>
            <div class="flex  md:max-w-md">
              <Chip label="Sky" class="!bg-sky-500 !text-white px-4 py-2 rounded cursor-pointer"
                @click="changePrimaryColorsky()">
              </Chip>
            </div>
          </div>

          <div class="flex items-center justify-center gap-2 mb-3">
            <span class="font-medium text-gray-600">

              <a class="font-semibold cursor-pointer hover:text-primary transition-colors duration-300"
                @click="goRouteDefault()">
                Go Back
              </a>
            </span>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped="css">
.p-avatar {
  width: 120px;
  height: 120px;
}

body {
  backdrop-filter: blur(4px);
}
</style>
