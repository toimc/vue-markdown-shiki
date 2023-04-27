import type { RangeProcessorOptions } from '../utils/create-range-processor'
import type { Processor } from '../types'

import { createRangeProcessor } from '../utils/create-range-processor'
import { addClass } from '../utils/add-class'

export interface FocusProcessorOptions extends RangeProcessorOptions {
	hasFocusedLinesClass?: string
	hasFocusClass?: string
	focusTag?: string
}

export function createFocusProcessor(options: FocusProcessorOptions = {}): Processor {
	const hasFocusClass = options.hasFocusClass ?? 'has-focus'
	const hasFocusedLinesClass = options.hasFocusedLinesClass ?? 'has-focused-lines'
	const focusTag = options.focusTag ?? 'focus'
	return {
		name: 'focus',
		handler: createRangeProcessor(
			{
				[focusTag]: [hasFocusClass],
			},
			options,
		),
		postProcess: ({ code }) => {
			if (!code.includes(hasFocusClass)) {
				return code
			}

			return addClass(code, hasFocusedLinesClass, 'pre')
		},
	}
}
