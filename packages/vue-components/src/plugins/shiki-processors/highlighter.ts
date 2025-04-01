import type { Highlighter, BundledLanguage } from 'shiki'
import { createHighlighter } from 'shiki'
import type { Processor } from './types'
import { postProcess, process } from './processor'

export interface HighlighterOptions {
  themes?: string[] | string
  langs?: string[]
  processors?: Processor[]
}

export async function getHighlighter(options: HighlighterOptions = {}): Promise<Highlighter> {
  // 处理主题配置
  const themes = Array.isArray(options.themes) ? options.themes : options.themes ? [options.themes] : ['github-dark']

  // 创建一个shiki高亮器实例
  const shikiHighlighter = await createHighlighter({
    // @ts-ignore - 类型兼容问题
    themes,
    // @ts-ignore - 类型兼容问题
    langs: options.langs || []
  })

  const processors = options.processors || []

  // 构建自定义highlighter对象并添加扩展功能
  const customHighlighter = {
    ...shikiHighlighter,
    codeToHtml(code: string, codeOptions: string | { lang?: string; theme?: string }) {
      const lang = typeof codeOptions === 'string' ? codeOptions : codeOptions.lang || 'text'

      // 处理代码
      const { code: processedCode } = process(processors, code, lang as BundledLanguage)

      // 获取主题
      const theme = typeof codeOptions === 'object' && codeOptions.theme ? codeOptions.theme : themes[0]

      // 使用shiki的codeToHtml方法
      let html = shikiHighlighter.codeToHtml(processedCode, {
        lang,
        // @ts-ignore - 类型兼容问题
        theme
      })

      // 后处理
      html = postProcess(processors, html, lang as BundledLanguage)

      return html
    },
    // 直接透传原始方法
    loadLanguage: (lang: BundledLanguage) => shikiHighlighter.loadLanguage(lang),
    getLoadedLanguages: () => shikiHighlighter.getLoadedLanguages(),
    getLoadedThemes: () => shikiHighlighter.getLoadedThemes()
  } as Highlighter

  return customHighlighter
}
