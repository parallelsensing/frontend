import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig(({command})=>{
  return{
    plugins: [vue(), 
      VueDevTools(),
      viteMockServe({
        enable: command==='serve',
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 9701,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://api.parallelsensing.com/',
          changeOrigin: true,
          secure: true,
          headers: {
            Referer: 'http://api.parallelsensing.com/'
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})

