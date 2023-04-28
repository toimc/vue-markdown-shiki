# Vue 3 Component Library with Shiki and Markdown-it Integration

[中文说明](./README-cn.md)

This is a Vue 3 component library that provides integration with Shiki and Markdown-it.

[Shiki](https://github.com/shikijs/shiki) is an efficient code syntax highlighter, while [Markdown-it](https://github.com/markdown-it/markdown-it) is a popular Markdown parser. With Vue 3 integration, this library offers customizable code highlighting and Markdown parsing, making it easy to build beautiful and highly customizable web applications.

## ✨ Features

- Vue 3 integration for easy component development
- Shiki integration for efficient code syntax highlighting
- Markdown-it integration for powerful Markdown parsing
- Customizable code highlighting and Markdown parsing options
- Copy and download functionality
- Two components provided: `VueMarkdownIt` and `VueMarkDownHeader`
  - `VueMarkdownIt` renders native Markdown strings and includes `VueMarkDownHeader` by default
  - `VueMarkDownHeader` provides a menu for copy and download functionality
  - `VueMarkdownItProvider` a wrapper for async use, provides a global `md` instance for MarkdownIt.

## 🚀 Getting Started

`VueMarkdownIt` options:

- `content`: A required prop that specifies the Markdown content to render.
- `style`: An optional prop that allows you to add custom styles to the rendered Markdown.
- `class`: An optional prop that allows you to add custom CSS classes to the rendered Markdown.
- `stream`: An optional prop that specifies whether the Markdown should be rendered as a stream. When set to `true`, the Markdown will be rendered as it is streamed in, rather than all at once. This can be useful for rendering large documents. The default value is `false`.

You can use these props to customize the appearance and behavior of the rendered Markdown. For example, you could use the `style` prop to change the font size or color of the rendered Markdown, or the `class` prop to add a custom CSS class that applies specific styling. The `stream` prop can be useful when rendering very large Markdown documents, as it can improve performance by rendering the document in smaller chunks.

## 🚀 Getting Started

To use this component library in your Vue 3 project, follow these steps:

1. Install the library using `npm` or `yarn`:

   ```bash
   npm install vue-markdown-shiki
   ```

   or

   ```bash
   yarn add vue-markdown-shiki
   ```

2. Import the components you need in your Vue 3 project, modify `main.ts`：

   ```typescript
   import 'vue-markdown-shiki/style'
   import markdownPlugin from 'vue-markdown-shiki'
   
   app.use(markdownPlugin)
   ```

   You can also use `app.use(markdownPlugin, options)` to pass an `options` parameter, which can accept the following:

   The `MarkdownOptions` interface extends the [`MarkdownIt.Options`](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) interface, which provides options for configuring the Markdown-it parser. In addition to the base options, `MarkdownOptions` provides the following options:

   - `lineNumbers`: A boolean that specifies whether line numbers should be added to the code blocks.
   - `config`: A function that accepts the `MarkdownIt` instance and allows you to configure it.
   - `anchor`: An object of options for the `markdown-it-anchor` plugin, which adds anchors to the headings in the Markdown.
   - `attrs`: An object of options for the `markdown-it-attrs` plugin, which allows you to add custom attributes to elements in the Markdown.
   - `defaultHighlightLang`: A string that specifies the default language for code blocks to be highlighted with.
   - `headers`: An object of options for the `markdown-it-anchor` plugin, which adds anchors to the headings in the Markdown. If set to `false`, the plugin will be disabled.
   - `theme`: An object of options for the `markdown-it-highlightjs-theme` plugin, which allows you to customize the theme used for code highlighting.
   - `languages`: An array of objects that register additional languages for highlighting with the `markdown-it-highlight` plugin.
   - `toc`: An object of options for the `markdown-it-table-of-contents` plugin, which generates a table of contents for the Markdown.
   - `externalLinks`: An object that maps domain names to their corresponding URL prefixes, which are added to external links in the Markdown.

   These options can be passed to the `app.use(markdownPlugin, options)` method to configure the `markdown-it` parser used by the `VueMarkdownIt` component.

   **TIPS: Why do we need to use `app.use` to globally initialize the instance here?**

   This is because it allows us to avoid repeatedly loading the language JSON when rendering Markdown strings, so it is strongly recommended to initialize globally. If you think that initializing during page loading is not elegant, you can use async components. See the [example](https://vuejs.org/guide/components/async.html).

   a. define a new `MD.vue` in your project:

   ```vue
   <script setup lang="ts">
     import {VueMarkdownItProvider, VueMarkdownIt} from 'vue-markdown-shiki'
   </script>
   
   <template>
     <VueMarkdownItProvider>
       <VueMarkdownIt :content="str" :stream="stream" ref="md" :class="theme"> </VueMarkdownIt>
     </VueMarkdownItProvider>
   </template>
   ```

   b. use async component for `MD.vue`:

   ```vue
   <script>
   import { defineAsyncComponent } from 'vue'
   
   export default {
     components: {
       AdminPage: defineAsyncComponent(() =>
         import('./components/MD.vue')
       )
     }
   }
   </script>
   ```

   

3. Copy Assets:

   - Vite-plugin:

     ```bash
     npm install -D vite-plugin-forvmsc
     ```

     Modify your `vite.config.*` file:

     ```typescript
     import { copyPublicPlugin } from 'vite-plugin-forvmsc'

      export default defineConfig(() => {
        // ...
        plugins: [
          // ...
          // add this line:
          copyPublicPlugin()
      })

     ```

   - Manually: `node_modules/vue-markdown-shiki/public/*`, to your vue3 project's `public` directory.

4. Use the components in your Vue 3 templates:

   ```vue
   import { VueMarkdownIt } from 'vue-markdown-shiki'
   
   <template>
     <div>
       <VueMarkdownIt :content="'your-raw-markdown-string'" />
     </div>
   </template>
   ```

For more detailed usage instructions, please see the [Example](https://toimc.github.io/vue-markdown-shiki/).



## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on GitHub. If you'd like to contribute code, please fork the repository and submit a pull request.

## License

This component library is licensed under the MIT License.
