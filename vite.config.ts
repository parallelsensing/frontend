
import type { UserConfig, ConfigEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from "path";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  return{
// export default defineConfig({
  base:'/',
  plugins: [vue(), 
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    VueDevTools()],
  server: {
    host: '0.0.0.0',
    port: 9701,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://api.parallelsensing.com',
        changeOrigin: true,
        headers: {
          Referer: 'http://api.parallelsensing.com/'
        },
        // rewrite: (path:string) => path.replace(/^\/api/, ''),
      }
    }
    },
 
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "components": resolve(__dirname, "./src/components"),
      "api": resolve(__dirname, "./src/api"),
    }
  },
  css:{
      // css预处理器
      preprocessorOptions: {
        scss: {
          // charset: false,
          additionalData: `@use "./src/assets/css/variable.scss" as *;`,
        },
      },

    },
    build: {
      outDir: 'dist',
    },
}
});

// import { fileURLToPath, URL } from 'node:url';
// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import VueDevTools from 'vite-plugin-vue-devtools';
// import { viteMockServe } from 'vite-plugin-mock';
// // https://vitejs.dev/config/
// export default defineConfig(({ command }) => {
//   return {
//     plugins: [
//       vue(),
//       VueDevTools(),
//       viteMockServe({
//         enable: command === 'serve'
//       })
//     ],
//     server: {
//       host: '0.0.0.0',
//       port: 9701,
//       cors: true,
//       proxy: {
//         '/api': {
//           changeOrigin: true,
//           secure: true,
//           headers: {
//             Referer: 'http://api.parallelsensing.com/'
//           }
//         }
//       }
//     },
//     resolve: {
//       alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url))
//       }
//     }
//   };
// });
