import type { Highlighter, Lang } from 'shiki'

export const EXTERNAL_URL_RE = /^[a-z]+:/i
export const PATHNAME_PROTOCOL_RE = /^pathname:\/\//
export const APPEARANCE_KEY = 'vitepress-theme-appearance'
export const HASH_RE = /#.*$/
export const EXT_RE = /(index)?\.(md|html)$/

export const inBrowser = typeof document !== 'undefined'

export interface Header {
  /**
   * The level of the header
   *
   * `1` to `6` for `<h1>` to `<h6>`
   */
  level: number
  /**
   * The title of the header
   */
  title: string
  /**
   * The slug of the header
   *
   * Typically the `id` attr of the header anchor
   */
  slug: string
  /**
   * Link of the header
   *
   * Typically using `#${slug}` as the anchor hash
   */
  link: string
  /**
   * The children of the header
   */
  children: Header[]
}

export function isActive(currentPath: string, matchPath?: string, asRegex: boolean = false): boolean {
  if (matchPath === undefined) {
    return false
  }

  currentPath = normalize(`/${currentPath}`)

  if (asRegex) {
    return new RegExp(matchPath).test(currentPath)
  }

  if (normalize(matchPath) !== currentPath) {
    return false
  }

  const hashMatch = matchPath.match(HASH_RE)

  if (hashMatch) {
    return (inBrowser ? location.hash : '') === hashMatch[0]
  }

  return true
}

export function normalize(path: string): string {
  return decodeURI(path).replace(HASH_RE, '').replace(EXT_RE, '')
}

export function isExternal(path: string): boolean {
  return EXTERNAL_URL_RE.test(path)
}

// https://github.com/rollup/rollup/blob/fec513270c6ac350072425cc045db367656c623b/src/utils/sanitizeFileName.ts

const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

export function sanitizeFileName(name: string): string {
  const match = DRIVE_LETTER_REGEX.exec(name)
  const driveLetter = match ? match[0] : ''

  return (
    driveLetter +
    name
      .slice(driveLetter.length)
      .replace(INVALID_CHAR_REGEX, '_')
      .replace(/(^|\/)_+(?=[^/]*$)/, '$1')
  )
}

export interface HighlightPlugin {
  plugin: (str: string, lang: string, attrs: string) => string
  highlighter: Highlighter
  loadLang: (lang: Lang) => Promise<void>
}

export const MarkdownSymbol = Symbol('vue-md-shiki-component')

export const getLangs = () => {
  return [
    ...'abap,actionscript-3,ada,apache,apex,apl,applescript,ara,asm,astro,awk,ballerina,bat,batch,berry,be,bibtex,bicep,blade,c,cadence,cdc,clarity,clojure,clj,cmake,cobol,codeql,ql,coffee,cpp,crystal,csharp,c#,cs,css,cue,d,dart,dax,diff,docker,dream-maker,elixir,elm,erb,erlang,erl,fish,fsharp,f#,fs,gherkin,git-commit,git-rebase,glsl,gnuplot,go,graphql,groovy,hack,haml,handlebars,hbs,haskell,hs,hcl,hlsl,html,http,imba,ini,properties,java,javascript,js,jinja-html,jison,json,json5,jsonc,jsonnet,jssm,fsl,jsx,julia,kotlin,latex,less,liquid,lisp,logo,lua,make,makefile,markdown,md,marko,matlab,mdx,mermaid,nginx,nim,nix,objective-c,objc,objective-cpp,ocaml,pascal,perl,php,plsql,postcss,powerquery,powershell,ps,ps1,prisma,prolog,proto,pug,jade,puppet,purescript,python,py,r,raku,perl6,razor,rel,riscv,rst,ruby,rb,rust,rs,sas,sass,scala,scheme,scss,shaderlab,shader,shellscript,bash,console,sh,shell,zsh,smalltalk,solidity,sparql,sql,ssh-config,stata,stylus,styl,svelte,swift,system-verilog,tasl,tcl,tex,toml,tsx,turtle,twig,typescript,ts,v,vb,cmd,verilog,vhdl,viml,vim,vimscript,vue-html,vue,wasm,wenyan,文言,wgsl,xml,xsl,yaml,yml,zenscript'.split(
      ','
    ),
    ...Object.keys(transform)
  ]
}

export const transform = {
  'C++': 'cpp',
  'C#': 'csharp'
}
