# Vue 3 Component Library with Shiki and Markdown-it Integration

This is a Vue 3 component library that provides integration with Shiki and Markdown-it.

[Shiki](https://github.com/shikijs/shiki) is an efficient code syntax highlighter, while [Markdown-it](https://github.com/markdown-it/markdown-it) is a popular Markdown parser. With Vue 3 integration, this library offers customizable code highlighting and Markdown parsing, making it easy to build beautiful and highly customizable web applications.



## Features

- Vue 3 integration for easy component development
- Shiki integration for efficient code syntax highlighting
- Markdown-it integration for powerful Markdown parsing
- Customizable code highlighting and Markdown parsing options
- Copy and download functionality
- Two components provided: `VueMarkdownIt` and `VueMarkDownHeader`
  - `VueMarkdownIt` renders native Markdown strings and includes `VueMarkDownHeader` by default
  - `VueMarkDownHeader` provides a menu for copy and download functionality



## Options

`VueMarkdownIt` options:

- `content`: A required prop that specifies the Markdown content to render.
- `style`: An optional prop that allows you to add custom styles to the rendered Markdown.
- `class`: An optional prop that allows you to add custom CSS classes to the rendered Markdown.
- `stream`: An optional prop that specifies whether the Markdown should be rendered as a stream. When set to `true`, the Markdown will be rendered as it is streamed in, rather than all at once. This can be useful for rendering large documents. The default value is `false`.

You can use these props to customize the appearance and behavior of the rendered Markdown. For example, you could use the `style` prop to change the font size or color of the rendered Markdown, or the `class` prop to add a custom CSS class that applies specific styling. The `stream` prop can be useful when rendering very large Markdown documents, as it can improve performance by rendering the document in smaller chunks.



## Getting Started

To use this component library in your Vue 3 project, follow these steps:

1. Install the library using `npm` or `yarn`:

   ```bash
   npm install vue-md-shiki-components
   ```

   or

   ```bash
   yarn add vue-md-shiki-components
   ```

2. Import the components you need in your Vue 3 project, modify `main.ts`

   ```typescript
   import 'vue-md-shiki-components/style'
   import markdownPlugin from 'vue-md-shiki-components'

   app.use(markdownPlugin)
   ```

3. Copy Assets:

   - Vite-plugin:

     ```bash
     npm install -D vite-plugin-vmsc-copy-assets
     ```

     Modify your `vite.config.*` file:

     ```typescript
     import { copyPublicPlugin } from 'vite-plugin-vmsc-copy-assets'
     
      export default defineConfig(() => {
        // ...
        plugins: [
          // ...
          // add this line:
          copyPublicPlugin()
      })
   
      - Manually: `node_modules/vue-md-shiki-components/public/*`, to your `public` directory.
   

4. Use the components in your Vue 3 templates:

   ```vue
   import { VueMarkdownIt } from 'vue-md-shiki-components'
   
   <template>
     <div>
       <VueMarkdownIt :content="your - raw - markdown - string" />
     </div>
   </template>
   ```

For more detailed usage instructions, please see the [Example](./vue-md-shiki-components/example).

## ScreenShot

![](./vue-md-shiki-components/screenshots/1.png)

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on GitHub. If you'd like to contribute code, please fork the repository and submit a pull request.

## License

This component library is licensed under the MIT License.
