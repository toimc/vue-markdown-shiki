// import { componentPlugin } from '@mdit-vue/plugin-component'
// import {
//   frontmatterPlugin,
//   type FrontmatterPluginOptions
// } from '@mdit-vue/plugin-frontmatter'
import { headersPlugin, type HeadersPluginOptions } from '@mdit-vue/plugin-headers'
// import { sfcPlugin, type SfcPluginOptions } from '@mdit-vue/plugin-sfc'
import { titlePlugin } from '@mdit-vue/plugin-title'
import { tocPlugin, type TocPluginOptions } from '@mdit-vue/plugin-toc'
import { slugify } from '@mdit-vue/shared'
import MarkdownIt from 'markdown-it'
import anchorPlugin from 'markdown-it-anchor'
import attrsPlugin from 'markdown-it-attrs'
import { full as emoji } from 'markdown-it-emoji'
import type { LanguageRegistration, ThemeRegistration } from 'shiki'
import type { Logger } from 'vite'
import { containerPlugin } from './plugins/containers'
import { highlight } from './plugins/highlight'
import { highlightLinePlugin } from './plugins/highlightLines'
import { imagePlugin } from './plugins/image'
import { lineNumberPlugin } from './plugins/lineNumbers'
import { linkPlugin } from './plugins/link'
import { preWrapperPlugin } from './plugins/preWrapper'
import type { HighlightPlugin } from './shared'
// import { snippetPlugin } from './plugins/snippet'

export type ThemeOptions = string | ThemeRegistration | { light: ThemeRegistration; dark: ThemeRegistration }

// 类型说明
export interface MarkdownOptions {
  lineNumbers?: boolean
  config?: (md: MarkdownIt) => void
  anchor?: anchorPlugin.AnchorOptions
  attrs?: {
    leftDelimiter?: string
    rightDelimiter?: string
    allowedAttributes?: string[]
    disable?: boolean
  }
  defaultHighlightLang?: string
  // frontmatter?: FrontmatterPluginOptions
  headers?: HeadersPluginOptions | boolean
  // sfc?: SfcPluginOptions
  theme?: ThemeOptions
  languages?: LanguageRegistration[]
  toc?: TocPluginOptions
  externalLinks?: Record<string, string>
  html?: boolean
  linkify?: boolean
  xhtmlOut?: boolean
  breaks?: boolean
  langPrefix?: string
  quotes?: string | string[]
  highlight?: (str: string, lang: string, attrs: string) => string
}

export type MarkdownRenderer = MarkdownIt

export type MarkdownType = { md: MarkdownRenderer; highlighter: HighlightPlugin['highlighter']; loadLang: HighlightPlugin['loadLang'] }

/**
 * Create a markdown renderer with options.
 *
 * @param {MarkdownOptions} [options={}] - The markdown options.
 * @param {string} [base='/'] - The base URL.
 * @param {Pick<Logger, 'warn'>} [logger=console] - The logger.
 * @returns {Promise<MarkdownType>} The markdown renderer, highlighter, and loadLang function.
 */
export const createMarkdownRenderer = async (
  // srcDir: string,
  options: MarkdownOptions = {},
  base = '/',
  logger: Pick<Logger, 'warn'> = console
): Promise<MarkdownType> => {
  // 把Highlight插件中的方法，外置
  const { plugin, highlighter, loadLang } = await highlight(options.theme, options.languages, options.defaultHighlightLang, logger)

  const md = MarkdownIt({
    html: true,
    linkify: true,
    highlight: options.highlight || plugin,
    ...options
  }) as MarkdownRenderer

  md.linkify.set({ fuzzyLink: false })

  // custom plugins
  md
    // .use(componentPlugin)
    .use(highlightLinePlugin)
    .use(preWrapperPlugin)
    // .use(snippetPlugin, srcDir)
    .use(containerPlugin)
    .use(imagePlugin)
    .use(linkPlugin, { target: '_blank', rel: 'noreferrer', ...options.externalLinks }, base)
    .use(lineNumberPlugin, options.lineNumbers)

  // 3rd party plugins
  if (!options.attrs?.disable) {
    md.use(attrsPlugin, options.attrs)
  }
  md.use(emoji)

  // mdit-vue plugins
  md.use(anchorPlugin, {
    slugify,
    permalink: anchorPlugin.permalink.linkInsideHeader({
      symbol: '&ZeroWidthSpace;',
      renderAttrs: (slug, state) => {
        // Find `heading_open` with the id identical to slug
        const idx = state.tokens.findIndex((token) => {
          const attrs = token.attrs
          const id = attrs?.find((attr) => attr[0] === 'id')
          return id && slug === id[1]
        })
        // Get the actual heading content
        const title = state.tokens[idx + 1].content
        return {
          'aria-label': `Permalink to "${title}"`
        }
      }
    }),
    ...options.anchor
  } as anchorPlugin.AnchorOptions)
  // .use(frontmatterPlugin, {
  //   ...options.frontmatter
  // } as FrontmatterPluginOptions)

  if (options.headers) {
    md.use(headersPlugin, {
      level: [2, 3, 4, 5, 6],
      slugify,
      ...(typeof options.headers === 'boolean' ? undefined : options.headers)
    } as HeadersPluginOptions)
  }

  md
    // .use(sfcPlugin, {
    //   ...options.sfc
    // } as SfcPluginOptions)
    .use(titlePlugin)
    .use(tocPlugin, {
      ...options.toc
    } as TocPluginOptions)

  // apply user config
  if (options.config) {
    options.config(md)
  }

  return { md, highlighter, loadLang }
}
