import type { App } from 'vue'
import type { MarkdownOptions } from './markdown'
import { createMarkdownRenderer } from './markdown'

import VueMarkdownIt from './components/VueMarkdownIt.vue'
import VueMarkDownHeader from './components/VueMarkDownHeader.vue'
import { MarkdownSymbol } from './shared'

export default {
  install(
    app: App,
    options: MarkdownOptions = {
      theme: 'dracula-soft',
      defaultHighlightLang: 'javascript'
    }
  ) {
    const md = createMarkdownRenderer({
      ...options
    })
    app.provide(MarkdownSymbol, md)
  }
}

export { VueMarkdownIt, VueMarkDownHeader }
