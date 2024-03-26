import { createApp } from 'vue'
import './style.css'
import router from './router'
import APP from './App.vue'
import { createPinia } from 'pinia';

// Vuetify组件库
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {createVuetify}  from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
 let pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives
})

createApp(APP).use(pinia).use(router).use(vuetify).use(ElementPlus).mount('#app')


