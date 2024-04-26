import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from '@/router';
import APP from '@/App.vue';
import './style.css';
// Vuetify组件库
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import {registerEcharts} from "@/plugins/echarts"
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@/assets/css/main.scss';
import '@/assets/css/tailwind.css';
import { mockXHR } from "@/mock/index";
//不使用mock 请注释掉
mockXHR()

const app = createApp(APP);
registerEcharts(app)
const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives
});
app.use(pinia).use(router).use(vuetify).mount('#app');
