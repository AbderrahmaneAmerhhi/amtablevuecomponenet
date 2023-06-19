import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // hna fin anhded dakchi li4aydae lih build 
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/components/AmhVueTable.vue'),
      name: 'AbAmVueTabel',
      // the proper extensions will be added
      fileName: 'AbAmVueTabel',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'moment', 'vue-flatpickr-component'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'moment': 'moment',
          'vue-flatpickr-component': 'flatPickr',
        },
      },
    },
  },
     publicPath: process.env.NODE_ENV === 'production' ? '/amtablevuecomponenet/' : '/',
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
    }
  
  )
