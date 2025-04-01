import type { ProcessorHandler } from '../types'

// 定义本地需要的类型
type LineOption = { line: number; classes: string[] }
type TagClassesDictionary = Record<string, string[]>

// 导出 RangeProcessorOptions 类型供其他模块使用
export interface RangeProcessorOptions {
  [key: string]: any
}

export const createRangeProcessor = (classesMap: TagClassesDictionary, options?: RangeProcessorOptions): ProcessorHandler => {
  return (ctx) => {
    // 为了与shiki-v3兼容，创建一个transformLines选项
    const transformLines: LineOption[] = []

    // 你的原始处理逻辑
    const { code } = ctx

    return {
      code,
      options: {
        transformLines,
        ...(options || {})
      }
    }
  }
}
