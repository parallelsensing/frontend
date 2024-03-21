import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { createVuePlugin } from 'vite-plugin-vue';
//mock插件提供方法
import { viteMockServe } from 'vite-plugin-mock'


// https://vitejs.dev/config/
export default defineConfig(({command})=>{
 return{
  plugins: [vue(),

    viteMockServe({
      enable: command==='serve',
    }),
  
  ]

 }
})


