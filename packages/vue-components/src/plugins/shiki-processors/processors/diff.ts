import type { Processor } from '../types'
import type { RangeProcessorOptions } from '../utils/create-range-processor'

import { createRangeProcessor } from '../utils/create-range-processor'
import { addClass } from '../utils'

export interface DiffProcessorOptions extends RangeProcessorOptions {
	commonDiffClass?: string
	removedLinesClasses?: string[]
	addedLinesClasses?: string[]
	removeLineTag?: string
	addLineTag?: string
	hasDiffClass?: string
}

export function createDiffProcessor(options: DiffProcessorOptions = {}): Processor {
	const commonDiffClass = options.commonDiffClass ?? 'diff'
	const removedLinesClasses = options.removedLinesClasses ?? ['remove']
	const addedLinesClasses = options.removedLinesClasses ?? ['add']
	const removeLineTag = options.removeLineTag ?? '--'
	const addLineTag = options.addLineTag ?? '++'
	const hasDiffClass = options.hasDiffClass ?? 'has-diff'
	return {
		name: 'diff',
		handler: createRangeProcessor({
			[removeLineTag]: [commonDiffClass, ...removedLinesClasses],
			[addLineTag]: [commonDiffClass, ...addedLinesClasses],
		}, options),
		postProcess: ({ code }) => {
			if (!code.includes(commonDiffClass)) {
				return code
			}

			return addClass(code, hasDiffClass, 'pre')
		},
	}
}
