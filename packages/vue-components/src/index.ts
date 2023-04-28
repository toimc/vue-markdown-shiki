import type { App } from 'vue'
import type { MarkdownOptions } from './markdown'
import { createMarkdownRenderer } from './markdown'

import VueMarkdownIt from './components/VueMarkdownIt.vue'
import VueMarkDownHeader from './components/VueMarkDownHeader.vue'
import VueMarkdownItProvider from './components/VueMarkdownItProvider.vue'

import { MarkdownSymbol } from './shared'

/**
 * Install a Markdown renderer plugin into a Vue.js app instance.
 * @param {App} app - The Vue.js app instance to install the plugin into.
 * @param {MarkdownOptions} [options] - The options to configure the Markdown renderer.
 * @param {string} [options.theme='dracula-soft'] - The name of the color theme to use.
 * @param {string} [options.defaultHighlightLang='javascript'] - The default language to use for syntax highlighting.
 * @returns {void}
 */
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

export { VueMarkdownIt, VueMarkDownHeader, VueMarkdownItProvider }
