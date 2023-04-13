import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyPublicPlugin } from 'vite-plugin-vmsc-copy-assets'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), copyPublicPlugin()]
})
