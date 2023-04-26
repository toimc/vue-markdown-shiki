import type { RangeProcessorOptions } from '../utils/create-range-processor'
import type { Processor } from '../types'

import { createRangeProcessor } from '../utils/create-range-processor'
import { addClass } from '../utils/add-class'

export interface HighlightProcessorOptions extends RangeProcessorOptions {
	hasHighlightedLinesClass?: string
	hasHighlightClass?: string
	highlightTag?: string
}

export function createHighlightProcessor(options: HighlightProcessorOptions = {}): Processor {
	const hasHighlightClass = options.hasHighlightClass ?? 'has-highlight'
	const hasHighlightedLinesClass = options.hasHighlightedLinesClass ?? 'has-highlighted-lines'
	const highlightTag = options.highlightTag ?? 'hl'
	return {
		name: 'highlight',
		handler: createRangeProcessor({
			[highlightTag]: [hasHighlightClass],
		}, options),
		postProcess: ({ code }) => {
			if (!code.includes(hasHighlightClass)) {
				return code
			}

			return addClass(code, hasHighlightedLinesClass, 'pre')
		},
	}
}
