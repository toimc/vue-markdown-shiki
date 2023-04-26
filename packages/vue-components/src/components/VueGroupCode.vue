<template>
  <VueMarkDownHeader>
    <div class="tabs">
      <span v-for="(name, index) in names" :key="index" @click="() => choose(index)" :class="{ active: chooseIndex === index }">{{
        name
      }}</span>
    </div>
  </VueMarkDownHeader>
  <div v-for="(block, index) in blocks" v-html="block.innerHTML" :class="block.className" :key="index" v-show="chooseIndex === index"></div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'

import VueMarkDownHeader from './VueMarkDownHeader.vue'

defineProps({
  names: {
    type: Object as PropType<String[]>,
    required: true
  },
  blocks: {
    type: Object as PropType<NodeListOf<Element>>,
    required: true
  }
})

const chooseIndex = ref(0)

function choose(index: number) {
  chooseIndex.value = index
}
</script>

<style scoped></style>
