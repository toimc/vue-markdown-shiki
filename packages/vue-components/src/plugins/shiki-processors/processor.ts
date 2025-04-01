import type { BundledLanguage } from 'shiki'
import type { Processor, ProcessorContext, ProcessorResult } from './types'

/**
 * Defines a processor.
 */
export function defineProcessor(processor: Processor): Processor {
  return processor
}

/**
 * Transforms code through the given processors.
 */
export function process<L = BundledLanguage>(processors: Processor<L>[], code: string, language: L, options: Record<string, any> = {}) {
  const results: ProcessorResult[] = []

  // 初始上下文
  const context: ProcessorContext<L> = {
    code,
    language,
    options
  }

  // 处理每个处理器
  for (const processor of processors) {
    if (processor.handler) {
      const result = processor.handler(context)
      if (result) {
        if (Array.isArray(result)) {
          results.push(...result)
        } else {
          results.push(result)
        }
      }
    }
  }

  // 应用结果到代码
  let finalCode = code
  let lineOptions: any[] = []

  for (const result of results) {
    if (result.code !== undefined) {
      finalCode = result.code
    }

    // 如果有适用于转换的处理器，处理lineOptions
    if (result.options && result.options.transformLines) {
      const lines = result.options.transformLines
      lineOptions = [...lineOptions, ...lines]
    }
  }

  return {
    code: finalCode,
    lineOptions
  }
}

/**
 * Transforms final code through the given processors.
 */
export function postProcess<L = BundledLanguage>(processors: Processor<L>[], code: string, language: L): string {
  let result = code

  // 后处理每个处理器
  for (const processor of processors) {
    if (processor.transformer) {
      const transformed = processor.transformer(result, language, {})
      if (transformed && transformed.code) {
        result = transformed.code
      }
    }
  }

  return result
}
