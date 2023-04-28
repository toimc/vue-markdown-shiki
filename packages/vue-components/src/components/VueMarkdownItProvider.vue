<template>
  <div :class="class">
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
    type: Object as PropType<MarkdownOptions>
  },
  class: {
    type: String,
    default: ''
  }
})

const md = createMarkdownRenderer({
  ...props.options
})

provide(MarkdownSymbol, md)
</script>

<style scoped></style>
