import type { BundledLanguage } from 'shiki'

export interface ProcessorContext<L = BundledLanguage> {
  code: string
  language: L
  options: {
    [key: string]: any
  }
}

export type ProcessorHandler<L = BundledLanguage> = (
  ctx: ProcessorContext<L>,
  tokens?: string[][]
) => ProcessorResult | ProcessorResult[] | void

export interface ProcessorResult {
  code?: string
  language?: string
  tokens?: string[][]
  options?: Record<string, any>
}

export type ProcessorTransformer<L = BundledLanguage> = (
  source: string,
  language: L,
  options: Record<string, any>
) => {
  code: string
  language: L
  lineOptions: any[]
}

export interface Processor<L = BundledLanguage> {
  name: string
  handler: ProcessorHandler<L>
  transformer?: ProcessorTransformer<L>
  postProcess?: (options: { code: string; lang: string }) => string | undefined
}

export type ProcessFunction = <L = BundledLanguage>(
  processors: Processor<L>[],
  code: string,
  language: L,
  options?: Record<string, any>
) => {
  code: string
  lineOptions: any[]
}
