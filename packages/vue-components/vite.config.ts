import { fileURLToPath, URL } from 'node:url'

import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// import myPlugins from './plugin'

// https://vitejs.dev/config/
export default defineConfig({
  root: process.env.NODE_ENV === 'development' ? 'example' : './',
  publicDir: process.env.NODE_ENV === 'development' ? resolve(__dirname, 'public') : false,
  plugins: [
    vue(),
    vueJsx(),
    dts({
      cleanVueFileName: true
    }),
    Components({
      resolvers: [
        IconsResolver({
          prefix: false,
          enabledCollections: ['tabler']
        })
      ]
    }) as any,
    Icons()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    outDir: resolve(__dirname, './dist'),
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        index: resolve(__dirname, 'src/index.ts')
      },
      name: 'VueMarkdownItShiki',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
