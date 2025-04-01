import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import { nanoid } from 'nanoid'
import { extractTitle } from './preWrapper'

// 定义Token和RenderRule类型
type Token = {
  nesting: number
  info: string
  markup: string
  map?: [number, number]
  type: string
  tag: string
  content: string
  meta?: any
  block: boolean
  hidden: boolean
  attrs?: [string, string][]
  children?: Token[]
  level: number
}

// 定义 MarkdownIt 选项类型
type MarkdownItOptions = Record<string, any>

type RenderRule = (tokens: Token[], idx: number, options: MarkdownItOptions, env: any, self: any) => string

export const containerPlugin = (md: MarkdownIt) => {
  md.use(...createContainer('tip', 'TIP', md))
    .use(...createContainer('info', 'INFO', md))
    .use(...createContainer('warning', 'WARNING', md))
    .use(...createContainer('danger', 'DANGER', md))
    .use(...createContainer('details', 'Details', md))
    // explicitly escape Vue syntax
    .use(container, 'v-pre', {
      render: (tokens: Token[], idx: number) => (tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`)
    })
    .use(container, 'raw', {
      render: (tokens: Token[], idx: number) => (tokens[idx].nesting === 1 ? `<div class="vp-raw">\n` : `</div>\n`)
    })
    .use(...createCodeGroup())
  // .use(container, 'PromptBar', {
  //   render: (tokens: Token[], idx: number) => {
  //     debugger
  //     const token = tokens[idx]
  //     const info = token.info.trim().slice('prompt-bar'.length).trim()
  //     if (token.nesting === 1) {
  //       const title = md.renderInline(info || 'Terminal')
  //       return `<div class="prompt-bar custom-block"><p class="custom-block-title">${title}</p>\n`
  //     } else {
  //       return `</div>\n`
  //     }
  //   }
  // })
}

type ContainerArgs = [typeof container, string, { render: RenderRule }]

function createContainer(klass: string, defaultTitle: string, md: MarkdownIt): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const info = token.info.trim().slice(klass.length).trim()
        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle)
          if (klass === 'details') {
            return `<details class="${klass} custom-block"><summary>${title}</summary>\n`
          }
          return `<div class="${klass} custom-block"><p class="custom-block-title">${title}</p>\n`
        } else {
          return klass === 'details' ? `</details>\n` : `</div>\n`
        }
      }
    }
  ]
}

function createCodeGroup(): ContainerArgs {
  return [
    container,
    'code-group',
    {
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const name = nanoid(5)
          let tabs = ''
          let checked = 'checked="checked"'

          for (let i = idx + 1; !(tokens[i].nesting === -1 && tokens[i].type === 'container_code-group_close'); ++i) {
            if (tokens[i].type === 'fence' && tokens[i].tag === 'code') {
              const title = extractTitle(tokens[i].info)
              const id = nanoid(7)
              tabs += `<input type="radio" name="group-${name}" id="tab-${id}" ${checked}><label for="tab-${id}">${title}</label>`

              if (checked) {
                tokens[i].info += ' active'
                checked = ''
              }
            }
          }

          return `<div class="vp-code-group"><div class="tabs">${tabs}</div><div class="blocks">\n`
        }
        return `</div></div>\n`
      }
    }
  ]
}
