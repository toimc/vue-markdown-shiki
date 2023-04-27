import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyPublicPlugin } from 'vite-plugin-forvmsc'

const isDev = process.env.NODE_ENV === 'development'

// https://vitejs.dev/config/
export default defineConfig({
  base: isDev ? './' : '/vue-markdown-shiki',
  plugins: [vue(), copyPublicPlugin()]
})
