// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/Administrator/Desktop/zmx_0701/frontend/node_modules/vite/dist/node/index.js";
import AutoImport from "file:///C:/Users/Administrator/Desktop/zmx_0701/frontend/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/Administrator/Desktop/zmx_0701/frontend/node_modules/unplugin-vue-components/dist/vite.js";
import { resolve } from "path";
import { ElementPlusResolver } from "file:///C:/Users/Administrator/Desktop/zmx_0701/frontend/node_modules/unplugin-vue-components/dist/resolvers.js";
import vue from "file:///C:/Users/Administrator/Desktop/zmx_0701/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueDevTools from "file:///C:/Users/Administrator/Desktop/zmx_0701/frontend/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Administrator\\Desktop\\zmx_0701\\frontend";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Administrator/Desktop/zmx_0701/frontend/vite.config.ts";
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    // export default defineConfig({
    base: "/",
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      VueDevTools()
    ],
    server: {
      host: "0.0.0.0",
      port: 9701,
      cors: true,
      proxy: {
        "/api": {
          target: "http://api.parallelsensing.com",
          // target: 'http://10.11.38.214:9711',
          //10.11.38.214:9711
          changeOrigin: true,
          headers: {
            Referer: "http://api.parallelsensing.com/"
          }
          // rewrite: (path:string) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
        "components": resolve(__vite_injected_original_dirname, "./src/components"),
        "api": resolve(__vite_injected_original_dirname, "./src/api")
      }
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // charset: false,
          additionalData: `@use "./src/assets/css/variable.scss" as *;`
        }
      }
    },
    build: {
      outDir: "dist"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pbmlzdHJhdG9yXFxcXERlc2t0b3BcXFxcem14XzA3MDFcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFkbWluaXN0cmF0b3JcXFxcRGVza3RvcFxcXFx6bXhfMDcwMVxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL3pteF8wNzAxL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnLCBDb25maWdFbnYgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scyc7XHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xyXG4gIHJldHVybntcclxuLy8gZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBiYXNlOicvJyxcclxuICBwbHVnaW5zOiBbdnVlKCksIFxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgfSksXHJcbiAgICBWdWVEZXZUb29scygpXSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgIHBvcnQ6IDk3MDEsXHJcbiAgICBjb3JzOiB0cnVlLFxyXG4gICAgcHJveHk6IHtcclxuICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2FwaS5wYXJhbGxlbHNlbnNpbmcuY29tJyxcclxuICAgICAgICAvLyB0YXJnZXQ6ICdodHRwOi8vMTAuMTEuMzguMjE0Ojk3MTEnLFxyXG5cclxuICAgICAgICAvLzEwLjExLjM4LjIxNDo5NzExXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFJlZmVyZXI6ICdodHRwOi8vYXBpLnBhcmFsbGVsc2Vuc2luZy5jb20vJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gcmV3cml0ZTogKHBhdGg6c3RyaW5nKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgfSxcclxuIFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICBcImNvbXBvbmVudHNcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvY29tcG9uZW50c1wiKSxcclxuICAgICAgXCJhcGlcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvYXBpXCIpLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3NzOntcclxuICAgICAgLy8gY3NzXHU5ODg0XHU1OTA0XHU3NDA2XHU1NjY4XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICAvLyBjaGFyc2V0OiBmYWxzZSxcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIi4vc3JjL2Fzc2V0cy9jc3MvdmFyaWFibGUuc2Nzc1wiIGFzICo7YCxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG5cclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBvdXREaXI6ICdkaXN0JyxcclxuICAgIH0sXHJcbn1cclxufSk7XHJcblxyXG4vLyBpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XHJcbi8vIGltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG4vLyBpbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbi8vIGltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnO1xyXG4vLyBpbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jayc7XHJcbi8vIC8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbi8vIGV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+IHtcclxuLy8gICByZXR1cm4ge1xyXG4vLyAgICAgcGx1Z2luczogW1xyXG4vLyAgICAgICB2dWUoKSxcclxuLy8gICAgICAgVnVlRGV2VG9vbHMoKSxcclxuLy8gICAgICAgdml0ZU1vY2tTZXJ2ZSh7XHJcbi8vICAgICAgICAgZW5hYmxlOiBjb21tYW5kID09PSAnc2VydmUnXHJcbi8vICAgICAgIH0pXHJcbi8vICAgICBdLFxyXG4vLyAgICAgc2VydmVyOiB7XHJcbi8vICAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuLy8gICAgICAgcG9ydDogOTcwMSxcclxuLy8gICAgICAgY29yczogdHJ1ZSxcclxuLy8gICAgICAgcHJveHk6IHtcclxuLy8gICAgICAgICAnL2FwaSc6IHtcclxuLy8gICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuLy8gICAgICAgICAgIHNlY3VyZTogdHJ1ZSxcclxuLy8gICAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgUmVmZXJlcjogJ2h0dHA6Ly9hcGkucGFyYWxsZWxzZW5zaW5nLmNvbS8nXHJcbi8vICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9XHJcbi8vICAgICB9LFxyXG4vLyAgICAgcmVzb2x2ZToge1xyXG4vLyAgICAgICBhbGlhczoge1xyXG4vLyAgICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbi8vICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gICB9O1xyXG4vLyB9KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsZUFBZSxXQUFXO0FBQ25DLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsZUFBZTtBQUN4QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFSeEIsSUFBTSxtQ0FBbUM7QUFBMEssSUFBTSwyQ0FBMkM7QUFTcFEsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBNkI7QUFDeEUsU0FBTTtBQUFBO0FBQUEsSUFFTixNQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFBQyxJQUFJO0FBQUEsTUFDWixXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRCxZQUFZO0FBQUEsSUFBQztBQUFBLElBQ2YsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBO0FBQUE7QUFBQSxVQUlSLGNBQWM7QUFBQSxVQUNkLFNBQVM7QUFBQSxZQUNQLFNBQVM7QUFBQSxVQUNYO0FBQUE7QUFBQSxRQUVGO0FBQUEsTUFDRjtBQUFBLElBQ0E7QUFBQSxJQUVGLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsUUFDcEQsY0FBYyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLFFBQ25ELE9BQU8sUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDdkM7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFJO0FBQUE7QUFBQSxNQUVBLHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQTtBQUFBLFVBRUosZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFFRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNKO0FBQ0EsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
