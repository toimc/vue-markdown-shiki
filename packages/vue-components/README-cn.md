# 📚 Vue 3 组件库：整合 Shiki 和 Markdown-it

这是一个整合了 Shiki 和 Markdown-it 的 Vue 3 组件库。

[Shiki](https://github.com/shikijs/shiki) 是一款高效的代码语法高亮器，而 [Markdown-it](https://github.com/markdown-it/markdown-it) 是一款流行的 Markdown 解析器。通过 Vue 3 整合，该库提供了可定制的代码高亮和 Markdown 解析功能，使得构建美观且高度定制化的 Web 应用变得轻松。

## ✨ 特点

- Vue 3 整合，便于组件开发
- Shiki 整合，实现高效代码语法高亮
- Markdown-it 整合，提供强大的 Markdown 解析功能
- 可定制的代码高亮和 Markdown 解析选项
- 复制和下载功能
- 提供两个组件：`VueMarkdownIt` 和 `VueMarkDownHeader`
  - `VueMarkdownIt` 渲染原生 Markdown 字符串并默认包含 `VueMarkDownHeader`
  - `VueMarkDownHeader` 提供复制和下载功能的菜单
  - `VueMarkdownItProvider` 是用于异步使用的包装器，提供了全局的 `md` 实例，用于 MarkdownIt。

## ⚙️ 选项

`VueMarkdownIt` 选项：

- `content`：指定要渲染的 Markdown 内容的必需属性。
- `style`：允许为渲染的 Markdown 添加自定义样式的可选属性。
- `class`：允许为渲染的 Markdown 添加自定义 CSS 类的可选属性。
- `stream`：指定是否将 Markdown 作为流渲染的可选属性。当设置为 `true` 时，Markdown 将在流入时渲染，而不是一次性渲染。这对于渲染大型文档非常有用。默认值为 `false`。

您可以使用这些属性自定义渲染的 Markdown 的外观和行为。例如，您可以使用 `style` 属性更改渲染的 Markdown 的字体大小或颜色，或者使用 `class` 属性添加应用特定样式的自定义 CSS 类。在渲染非常大的 Markdown 文档时，`stream` 属性可能很有用，因为它可以通过分块渲染文档来提高性能。

## 🚀 开始使用

要在 Vue 3 项目中使用此组件库，请按照以下步骤操作：

1. 使用 `npm` 或 `yarn` 安装库：

   ```bash
   npm install vue-markdown-shiki
   ```
   or

   ```bash
   yarn add vue-markdown-shiki
   ```

2. 在 Vue 3 项目中导入所需的组件，修改 `main.ts`：

   ```typescript
   import 'vue-markdown-shiki/style'
   import markdownPlugin from 'vue-markdown-shiki'
   
   app.use(markdownPlugin)
   ```
   
   你还可以使用 `app.use(markdownPlugin, options)` 传递一个 `options`，该参数可以接受如下内容：
   
   `MarkdownOptions` 接口扩展了 [`MarkdownIt.Options`](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) 接口，提供了配置 Markdown-it 解析器的选项。除了基础选项外，`MarkdownOptions` 还提供了以下选项：
   
   - `lineNumbers`：一个布尔值，指定是否应向代码块添加行号。
   - `config`：一个接受 `MarkdownIt` 实例并允许您对其进行配置的函数。
   - `anchor`：一个 `markdown-it-anchor` 插件选项对象，用于向 Markdown 中的标题添加锚点。
   - `attrs`：一个 `markdown-it-attrs` 插件选项对象，允许您向 Markdown 中的元素添加自定义属性。
   - `defaultHighlightLang`：一个字符串，指定要用于代码块高亮的默认语言。
   - `headers`：一个 `markdown-it-anchor` 插件选项对象，用于向 Markdown 中的标题添加锚点。如果设置为 `false`，则禁用该插件。
   - `theme`：一个 `markdown-it-highlightjs-theme` 插件选项对象，允许您自定义用于代码高亮的主题。
   - `languages`：一个对象数组，用于使用 `markdown-it-highlight` 插件注册其他要进行语法高亮的语言。
   - `toc`：一个 `markdown-it-table-of-contents` 插件选项对象，用于为 Markdown 生成目录。
   - `externalLinks`：一个将域名映射到其对应 URL 前缀的对象，这些前缀将添加到 Markdown 中的外部链接中。
   
   这些选项可以传递给 `app.use(markdownPlugin, options)` 方法，以配置 `VueMarkdownIt` 组件使用的 `markdown-it` 解析器。
   
   **提示：为什么在这里需要使用 `app.use` 全局初始化实例？**
   
   这是因为它允许我们在渲染 Markdown 字符串时避免重复加载语言 JSON，因此强烈建议进行全局初始化。如果您认为在页面加载期间进行初始化不够优雅，可以使用异步组件。请参阅[示例](https://vuejs.org/guide/components/async.html)。
   
   a. 定义一个 `MD.vue` 组件:
   
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
   
   b. 使用异步组件 `MD.vue`:
   
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


3. 复制资源：

   - Vite-plugin:

     ```bash
     npm install -D vite-plugin-forvmsc
     ```

     修改 `vite.config.*` 配置文件:

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

   - 手动复制对应的资源: `node_modules/vue-markdown-shiki/public/*`, 到你的Vue3项目的 `public` 目录.

4. 在 Vue 3 模板中使用组件：

   ```vue
   import { VueMarkdownIt } from 'vue-markdown-shiki'
   
   <template>
     <div>
       <VueMarkdownIt :content="'your-raw-markdown-string'" />
     </div>
   </template>
   ```

要查看更详细的使用说明，请参阅 [示例](https://toimc.github.io/vue-markdown-shiki/).

## 贡献
欢迎大家贡献！如果您发现一个错误或有功能请求，请在 GitHub 上提交一个 issue。如果您想贡献代码，请 fork 仓库并提交一个 pull request。

## 许可证

此组件库使用 MIT 许可证。
