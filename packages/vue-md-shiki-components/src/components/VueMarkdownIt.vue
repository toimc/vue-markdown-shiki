<template>
  <div :class="['vp-doc', props.class, { 'result-streaming': stream }]" :style="style">
    <!-- 循环输出allData数组中的html字符串, 不渲染div -->
    <!-- 循环的过程中，根据item的值的不同，来动态输出slot -->
    <template v-for="item in allData" :key="item">
      <!-- 自定义Code部分逻辑 -->
      <slot name="code" :item="getCodes(item)" :html="item" :lang="getLangName(item)" v-if="codeClassRE.test(item)">
        <VueMarkDownHeader :lang="getLangName(item)" :item="getCodes(item)"></VueMarkDownHeader>
      </slot>
      <div v-html="item"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, watch, onBeforeMount, type CSSProperties } from 'vue'
// 样式
import VueMarkDownHeader from './VueMarkDownHeader.vue'

import '../theme/index'

import type { PropType } from 'vue'
import type MarkdownIt from 'markdown-it'

import { validateAndModifyMarkdown } from '../utils/mkUtils'
import type { MarkdownType } from '../markdown'
import { MarkdownSymbol, transform } from '../shared'
import type { Lang } from 'shiki'

// 判断是否设置了slots
// const slots = useSlots()

const props = defineProps({
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
})

const render = ref('')
const md = ref<MarkdownIt>()
const loadLangFn = ref<MarkdownType['loadLang']>()

const regex = /<([a-zA-Z]+)(?:\s+[a-zA-Z]+=(?:"[^"]*"|'[^']*'))*\s*\/?>[\s\S]*?<\/\1\s*>/g

// 判断是否是code
const codeClassRE = /class="language-.*/
// 提取语言
const codeRE = /class="language-([\w+]+)"/
const langRE = /```([\w+#]+)\n/g

// function hasSlot  (name: string) {
//   return slots[name] !== undefined
// }

function getLangName(item: string) {
  return codeRE.exec(item)?.[1] || ''
}

function getCodes(item: string) {
  let text = ''

  const parser = new DOMParser()
  const htmlDoc = parser.parseFromString(item, 'text/html')

  const isShell = /shellscript|shell|bash|sh|zsh/.test(getLangName(item))

  htmlDoc.querySelectorAll('span.line:not(.diff.remove)').forEach((node) => (text += (node.textContent || '') + '\n'))

  if (isShell) {
    text = text.replace(/^ *(\$|>) /gm, '').trim()
  }

  return text.slice(0, -1)
}
const validateAndModify = computed(() => {
  return validateAndModifyMarkdown(props.content || '')
})

const allData = computed<string[]>(() => {
  return render.value.match(regex) || []
})

const loadLangAsync = async () => {
  // 异步加载语言包
  const match = Array.from(validateAndModify.value.matchAll(langRE)).map((match) => {
    return match[1]
  })
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

defineExpose({
  md
})
</script>
<style scoped></style>
