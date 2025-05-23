// import './assets/main.css'



import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'

import router from './router'

import PrimeVue from 'primevue/config';

// Themes
import Aura from '@primeuix/themes/aura';


import "tailwindcss";
import "tailwindcss-primeui";


// Icons
import 'primeicons/primeicons.css'


 

const app = createApp(App);


app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});



app.use(createPinia())
app.use(VueQueryPlugin)
app.use(router)

app.mount('#app')
