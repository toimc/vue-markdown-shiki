<script lang="tsx">
import { ref, computed, inject, watch, onBeforeMount, h, defineComponent, toRefs } from 'vue'
// 样式
import VueMarkDownHeader from './VueMarkDownHeader.vue'
import VueGroupCode from './VueGroupCode.vue'

import '../theme/index'

import type { PropType, VNode, CSSProperties } from 'vue'
import type { Lang } from 'shiki'
import type { MarkdownType } from '../markdown'
import type MarkdownIt from 'markdown-it'

import { validateAndModifyMarkdown } from '../utils/mkUtils'
import { MarkdownSymbol, transform } from '../shared'

export default defineComponent({
  components: { VueMarkDownHeader },
  props: {
    content: {
      type: String,
      required: true
    },
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => {}
    },
    class: {
      type: String,
      default: ''
    },
    stream: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { expose }) {
    const render = ref('')
    const md = ref<MarkdownIt>()
    const loadLangFn = ref<MarkdownType['loadLang']>()

    expose({
      render,
      md,
      loadLangFn
    })

    // 判断是否是code
    // const codeClassRE = /class="language-.*/
    // 提取语言
    // const codeRE = /class="language-([\w+]+)"/
    const langRE = /(?<=```)\S+/g

    const { stream, class: cls, style } = toRefs(props)

    const divClass = computed(() => {
      return ['vp-doc', cls.value]
    })

    function getCodes(item: string, lang: string = '') {
      let text = ''

      const parser = new DOMParser()
      const htmlDoc = parser.parseFromString(item, 'text/html')

      const isShell = /shellscript|shell|bash|sh|zsh/.test(lang)

      htmlDoc.querySelectorAll('span.line:not(.diff.remove)').forEach((node) => (text += (node.textContent || '') + '\n'))

      if (isShell) {
        text = text.replace(/^ *(\$|>) /gm, '').trim()
      }

      return text.slice(0, -1)
    }
    const validateAndModify = computed(() => {
      return validateAndModifyMarkdown(props.content || '')
    })

    function traverseNode(node: Node): VNode | VNode[] | undefined {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent as unknown as VNode
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement

        // 判断 class 是否以 'language-' 开头
        const languageClassRegex = /^language-/
        const languageClassFound = Array.from(element.classList).some((className) => languageClassRegex.test(className))

        const groupRegex = /vp-code-group/
        const groupFound = Array.from(element.classList).some((className) => groupRegex.test(className))

        // 组代码块逻辑
        if (groupFound) {
          const labels = Array.from(element.querySelectorAll('.tabs label'))
          const names = labels.map((label) => (label as HTMLElement).innerText)
          const blocks = element.querySelectorAll('.blocks div')

          return <VueGroupCode names={names} blocks={blocks}></VueGroupCode>
        } else if (languageClassFound) {
          const langMatch = element.className.match(/language-(\w+)/)
          const lang = langMatch ? langMatch[1] : 'plain'

          const item = getCodes(element.innerHTML, lang)
          const html = element.innerHTML
          // const lang = getLangName(item)
          // 从element.className中使用正则匹配，匹配其中xxxx的内容，默认是plain

          return (
            <div class={divClass.value} style={{ ...style }}>
              <slot name="code" item={item} html={item} lang={lang}>
                <VueMarkDownHeader lang={lang} item={item}></VueMarkDownHeader>
              </slot>
              <div class={element.className} v-html={html}></div>
            </div>
          )
        } else {
          const children = Array.from(element.childNodes).map(traverseNode).flat()
          const attrs = {}
          for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i]
            attrs[attr.name] = attr.value
          }
          // 保留attrs，直接透传给h
          return h(
            element.tagName,
            {
              ...attrs
            },
            children
          )
        }
      }
    }

    async function loadLangAsync() {
      // 异步加载语言包
      const match = Array.from(validateAndModify.value.matchAll(langRE)).map((match) => {
        return match[0]
      })
      console.log('🚀 ~ file: VueMarkdownIt.vue:143 ~ match ~ match:', match)
      if (match && loadLangFn.value) {
        for (let i = 0; i < match.length; i++) {
          const item = match[i]
          try {
            const langType = transform[item.toLocaleUpperCase()] || item
            await loadLangFn.value(langType as Lang)
            // loadLangFn.value(match[i] as Lang).then(() => {
            //   console.log('loaded')
            // })
          } catch (error) {
            // 强制渲染
            continue
          }
        }
      }
      // 使用同个render实例渲染
      render.value = md.value?.render(validateAndModify.value) || ''
    }

    watch(validateAndModify, async () => await loadLangAsync())

    onBeforeMount(async () => {
      const { md: markd, loadLang } = (await inject(MarkdownSymbol)) as MarkdownType
      // 保存实例
      md.value = markd
      loadLangFn.value = loadLang
      await loadLangAsync()
    })

    const allData = () => {
      const parser = new DOMParser()
      const parsedHtml = parser.parseFromString(render.value, 'text/html')
      const vnode = traverseNode(parsedHtml.body)
      return (
        <div class={[divClass.value, { 'result-streaming': stream.value }]} style={{ ...style.value }}>
          {vnode}
        </div>
      )
    }

    return () => allData()
  }
})
</script>
<style scoped></style>
