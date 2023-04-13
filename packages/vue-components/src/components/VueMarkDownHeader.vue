<template>
  <div class="vp-header">
    <div>{{ lang }}</div>
    <div class="ctrl">
      <div class="copyRef ctrl" @click="handleCopy" ref="copyRef">
        <tabler-copy v-if="!copyStatus"></tabler-copy>
        <tabler-check v-else></tabler-check>
        <span>{{ showMsg }}</span>
      </div>
      <tabler-download @click="handleDownload"></tabler-download>
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

//"<p>在JavaScript中，可以使用<code>console.log()</code>命令来输出文本到控制台。要输出“hello world”，只需执行以下代码即可：</p>\n<div class=\"language-console.log('hello\"><pre v-pre class=\"shiki dracula-soft\" ><code><span class=\"line\"></span></code></pre>\n</div><p>运行这段代码后，在浏览器的开发者控制台或命令行工具中将显示“hello world”这个字符串。</p>\n"
</script>

<style scoped></style>
