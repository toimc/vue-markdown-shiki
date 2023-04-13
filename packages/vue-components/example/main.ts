import { createApp } from 'vue'

import App from './App.vue'

import markdownPlugin, { VueMarkDownHeader, VueMarkdownIt } from '../src/index'

const app = createApp(App)

app.use(markdownPlugin)
app.use({
  install(app) {
    app.component('VueMarkdownIt', VueMarkdownIt)
    app.component('VueMarkDownHeader', VueMarkDownHeader)
  }
})

app.mount('#app')
