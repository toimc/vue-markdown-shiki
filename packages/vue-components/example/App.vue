<template>
  <div class="body">
    <button class="btn" @click="theme = theme === 'dark' ? 'light' : 'dark'">Change Theme</button>
    <VueMarkdownIt :content="str" :stream="true" ref="md" :class="theme"> </VueMarkdownIt>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import mdDemo from './example.md?raw'

const md = ref(null)

const theme = ref<'dark' | 'light'>('light')

const str = ref(mdDemo)

onMounted(() => {
  const len = str.value.length
  const value = str.value
  let i = 0
  setInterval(() => {
    // 截取str随机长度，并每次添加一个字符到str，直到len
    str.value = value.slice(0, i)
    i++
    if (i === len) {
      i = 0
    }
  }, 20)
})
</script>

<style>
.btn {
  background: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

/* Box sizing rules */
/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin and padding */
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* Remove default focus outline */
:focus {
  outline: none;
}

/* Remove default list styles */
ol,
ul {
  list-style: none;
}

/* Remove default table spacing */
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
