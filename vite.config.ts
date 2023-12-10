import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { templateCompilerOptions } from '@tresjs/core'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions
    }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
