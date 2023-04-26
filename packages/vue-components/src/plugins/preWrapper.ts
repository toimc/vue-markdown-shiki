import { getLangs } from '../shared'
import type MarkdownIt from 'markdown-it'

export function preWrapperPlugin(md: MarkdownIt) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    // remove title from info
    token.info = token.info.replace(/\[.*\]/, '')
    let lang = extractLang(token.info)
    const allLangs = getLangs()
    if (!allLangs.includes(lang)) {
      lang = 'plainText'
    }

    const rawCode = fence(...args)
    return `<div class="language-${lang}">${rawCode}</div>`
    // return `<div class="language-${lang}${/ active( |$)/.test(token.info) ? ' active' : ''}">${rawCode}</div>`
    // return `<div class="language-${lang}${
    //   / active( |$)/.test(token.info) ? ' active' : ''
    // }"><button title="Copy Code" class="copy"></button><span class="lang">${lang}</span>${rawCode}</div>`
  }
}

export function extractTitle(info: string) {
  return info.match(/\[(.*)\]/)?.[1] || extractLang(info) || 'txt'
}

const extractLang = (info: string) => {
  return info
    .trim()
    .replace(/:(no-)?line-numbers({| |$).*/, '')
    .replace(/(-vue|{| ).*$/, '')
    .replace(/^vue-html$/, 'template')
}
