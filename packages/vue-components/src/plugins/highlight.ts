import type { LanguageRegistration, ThemeRegistration, BundledLanguage, BundledTheme } from 'shiki'
import type { Processor } from './shiki-processors/index'
import type { Logger } from 'vite'
import type { ThemeOptions } from '../markdown'
import type { HighlightPlugin } from '../shared'

import { customAlphabet } from 'nanoid'
import {
  addClass,
  createDiffProcessor,
  createFocusProcessor,
  createHighlightProcessor,
  createRangeProcessor,
  defineProcessor,
  getHighlighter
} from './shiki-processors/index'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)

/**
 * 在Shiki v3中不再需要lineOptions，此函数保留供参考
 * 将未来可能需要重新实现类似功能，目前已替换为transformers
 */
// const attrsToLines = (attrs: string) => {
//   attrs = attrs.replace(/^(?:\[.*?\])?.*?([\d,-]+).*/, '$1').trim()
//   const result: number[] = []
//   if (!attrs) {
//     return []
//   }
//   attrs
//     .split(',')
//     .map((v) => v.split('-').map((v) => parseInt(v, 10)))
//     .forEach(([start, end]) => {
//       if (start && end) {
//         result.push(...Array.from({ length: end - start + 1 }, (_, i) => start + i))
//       } else {
//         result.push(start)
//       }
//     })
//   return result.map((v) => ({
//     line: v,
//     classes: ['highlighted']
//   }))
// }

const errorLevelProcessor = defineProcessor({
  name: 'error-level',
  handler: createRangeProcessor({
    error: ['highlighted', 'error'],
    warning: ['highlighted', 'warning']
  })
})

export async function highlight(
  theme: ThemeOptions = 'github-dark',
  languages: LanguageRegistration[] = [],
  defaultLang: string = '',
  logger: Pick<Logger, 'warn'> = console
): Promise<HighlightPlugin> {
  const hasSingleTheme = typeof theme === 'string' || 'name' in theme
  const getThemeName = (themeValue: ThemeRegistration): string => {
    if (typeof themeValue === 'string') return themeValue
    return themeValue.name || 'github-dark' // 提供默认值
  }

  const processors: Processor[] = [
    createFocusProcessor(),
    createHighlightProcessor({ hasHighlightClass: 'highlighted' }),
    createDiffProcessor(),
    errorLevelProcessor
  ]

  // 创建highlighter配置
  const options: any = {
    langs: ['css', ...languages],
    processors
  }

  // 设置主题
  if (hasSingleTheme) {
    options.themes = [theme]
  } else {
    // @ts-ignore - 双主题模式
    options.themes = [theme.dark, theme.light]
  }

  // 初始化highlighter
  const highlighter = await getHighlighter(options)

  const loadLang = async (lang: BundledLanguage) => {
    if (lang && !highlighter.getLoadedLanguages().includes(lang)) {
      await highlighter.loadLanguage(lang)
    }
  }

  if (defaultLang) {
    await loadLang(defaultLang as BundledLanguage)
  }

  const styleRE = /<pre[^>]*(style=".*?")/
  const preRE = /^<pre(.*?)>/
  const vueRE = /-vue$/
  const lineNoRE = /:(no-)?line-numbers$/
  const mustacheRE = /\{\{.*?\}\}/g

  const returnCallback = (str: string, lang: string, attrs: string) => {
    const vPre = vueRE.test(lang) ? '' : 'v-pre'
    lang = lang.replace(lineNoRE, '').replace(vueRE, '').toLowerCase() || defaultLang
    if (lang) {
      const langLoaded = highlighter.getLoadedLanguages().includes(lang as any)
      if (!langLoaded && lang !== 'ansi' && lang !== 'txt') {
        logger.warn(`\nThe language '${lang}' is not loaded, falling back to '${defaultLang || 'txt'}' for syntax highlighting.`)
      }
    }

    const cleanup = (str: string) => {
      return str
        .replace(preRE, (_, attributes) => `<pre ${vPre}${attributes.replace(' tabindex="0"', '')}>`)
        .replace(styleRE, (_, style) => _.replace(style, ''))
    }

    const mustaches = new Map<string, string>()

    const removeMustache = (s: string) => {
      if (vPre) return s
      return s.replace(mustacheRE, (match) => {
        let marker = mustaches.get(match)
        if (!marker) {
          marker = nanoid()
          mustaches.set(match, marker)
        }
        return marker
      })
    }

    const restoreMustache = (s: string) => {
      mustaches.forEach((marker, match) => {
        s = s.replace(new RegExp(marker, 'gi'), match)
      })
      return s
    }

    const fillEmptyHighlightedLine = (s: string) => {
      return s.replace(/(<span class="line highlighted">)(<\/span>)/g, '$1<wbr>$2')
    }

    str = removeMustache(str)

    const codeToHtml = (theme: ThemeRegistration) => {
      let res: any
      try {
        const themeName = getThemeName(theme)
        res =
          lang === 'ansi'
            ? highlighter.codeToHtml(str, {
                lang: 'ansi',
                theme: themeName as BundledTheme
              })
            : highlighter.codeToHtml(str, {
                lang,
                theme: themeName as BundledTheme
              })
      } catch (error) {
        const themeName = getThemeName(theme)
        res = highlighter.codeToHtml(str, {
          lang: 'ansi',
          theme: themeName as BundledTheme
        })
      }
      return fillEmptyHighlightedLine(cleanup(restoreMustache(res)))
    }

    if (hasSingleTheme) return codeToHtml(theme as ThemeRegistration)
    // @ts-ignore - 双主题模式
    const dark = addClass(codeToHtml(theme.dark), 'vp-code-dark', 'pre')
    // @ts-ignore - 双主题模式
    const light = addClass(codeToHtml(theme.light), 'vp-code-light', 'pre')
    return dark + light
  }

  return { plugin: returnCallback, highlighter, loadLang }
}
