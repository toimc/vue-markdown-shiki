// markdown-it plugin for normalizing image source

import type MarkdownIt from 'markdown-it'
import { EXTERNAL_URL_RE } from '../shared/index'

export const imagePlugin = (md: MarkdownIt) => {
  const imageRule = md.renderer.rules.image!
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    let url = token.attrGet('src')
    if (url && !EXTERNAL_URL_RE.test(url)) {
      if (!/^\.?\//.test(url)) url = './' + url
      // 作用是对不符合规则的 URL 进行处理，添加前缀 ./
      token.attrSet('src', decodeURIComponent(url))
    }
    return imageRule(tokens, idx, options, env, self)
  }
}
