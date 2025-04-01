import { App } from 'vue';
import { MarkdownOptions } from './markdown';
import { default as VueMarkdownIt } from './components/VueMarkdownIt';
import { default as VueMarkDownHeader } from './components/VueMarkDownHeader';
import { default as VueMarkdownItProvider } from './components/VueMarkdownItProvider';
/**
 * Install a Markdown renderer plugin into a Vue.js app instance.
 * @param {App} app - The Vue.js app instance to install the plugin into.
 * @param {MarkdownOptions} [options] - The options to configure the Markdown renderer.
 * @param {string} [options.theme='dracula-soft'] - The name of the color theme to use.
 * @param {string} [options.defaultHighlightLang='javascript'] - The default language to use for syntax highlighting.
 * @returns {void}
 */
declare const _default: {
    install(app: App, options?: MarkdownOptions): void;
};
export default _default;
export { VueMarkdownIt, VueMarkDownHeader, VueMarkdownItProvider };
