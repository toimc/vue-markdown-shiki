import type { Processor, ProcessorResult } from './types'

/**
 * Defines a processor.
 */
export function defineProcessor(processor: Processor): Processor {
	return processor
}

/**
 * Transforms code through the given processors.
 */
export function process(processors: Processor[], code: string, lang: string) {
	return processors.reduce((options, processor) => {
		const { code, lineOptions } = processor.handler?.({
			code: options.code,
			lang,
		}) ?? options

		return {
			code,
			lineOptions: [
				...options.lineOptions,
				...lineOptions,
			],
		}
	}, {
		code,
		lineOptions: [],
	} as ProcessorResult)
}

/**
 * Transforms final code through the given processors.
 */
export function postProcess(processors: Processor[], code: string, lang: string) {
	return processors.reduce((code, processor) => processor.postProcess?.({
		code,
		lang,
	}) ?? code, code)
}
