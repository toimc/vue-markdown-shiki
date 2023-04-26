<template>
  <div class="vp-header">
    <slot>
      <div>{{ lang }}</div>
    </slot>
    <div class="ctrl">
      <div class="copyRef ctrl" @click="handleCopy" ref="copyRef">
        <tabler-copy v-if="!copyStatus"></tabler-copy>
        <tabler-check v-else></tabler-check>
        <span>{{ showMsg }}</span>
      </div>
      <tabler-download class="copyRef" @click="handleDownload"></tabler-download>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { copyToClipboard } from '../utils/copyCode'
import { downloadAsFile } from '../utils/downloadAsFile'

const props = defineProps({
  lang: {
    type: String,
    default: 'txt'
  },
  copyTxt: {
    type: String,
    default: 'Copy'
  },
  copiedTxt: {
    type: String,
    default: 'Copied'
  },
  item: {
    type: String,
    default: ''
  },
  downloadTxt: {
    type: String,
    default: 'Enter file name'
  }
})

const copyStatus = ref(false)
const copyRef = ref<HTMLElement | null>(null)

const showMsg = computed(() => (copyStatus.value ? props.copiedTxt : props.copyTxt))

function handleCopy() {
  const timeoutIdMap: Map<HTMLElement, NodeJS.Timeout> = new Map()

  copyToClipboard(props.item).then(() => {
    copyStatus.value = true
    clearTimeout(timeoutIdMap.get(copyRef.value as HTMLElement))
    const timeoutId = setTimeout(() => {
      copyStatus.value = false
      timeoutIdMap.delete(copyRef.value as HTMLElement)
    }, 2000)
    timeoutIdMap.set(copyRef.value as HTMLElement, timeoutId)
  })
}

function handleDownload() {
  downloadAsFile(props.lang, props.item, props.downloadTxt)
}
</script>

<style scoped></style>
