import { createApp} from 'vue'

import './style.css'
import router from '@/router'
import APP from '@/App.vue'
import { createPinia } from 'pinia';
// Vuetify组件库
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {createVuetify}  from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'mapbox-gl/dist/mapbox-gl.css';

import "vue-easytable/libs/theme-default/index.css";
import  '@/assets/css/public.scss'
import "@/assets/css/index.scss"


import DataVVue3 from '@kjgl77/datav-vue3'
 const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives
})
createApp(APP).use(DataVVue3).use(pinia).use(router).use(vuetify).mount('#app')


