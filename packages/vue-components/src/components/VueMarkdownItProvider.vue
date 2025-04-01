<template>
  <div :class="customClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { MarkdownOptions } from '../markdown'

import { provide } from 'vue'

import { createMarkdownRenderer } from '../markdown'
import { MarkdownSymbol } from '../shared'

const props = defineProps({
  options: {
    type: Object as PropType<MarkdownOptions>,
    default: {
      theme: 'dracula-soft',
      defaultHighlightLang: 'javascript'
    }
  },
  class: {
    type: String,
    default: ''
  }
})

// 重命名props.class为customClass避免冲突
const customClass = props.class

const md = createMarkdownRenderer({
  ...props.options
})

provide(MarkdownSymbol, md)
</script>

<style scoped></style>
