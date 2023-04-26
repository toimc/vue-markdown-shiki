import type { Highlighter, HighlighterOptions as ShikiHighlighterOptions } from 'shiki'
import type { Processor } from './types'

import { getHighlighter as getShikiHighlighter } from 'shiki'
import { postProcess, process } from './processor'

export interface HighlighterOptions extends ShikiHighlighterOptions {
	processors?: Processor[]
}

export async function getHighlighter(options: HighlighterOptions = {}): Promise<Highlighter> {
	const highlighter = await getShikiHighlighter(options)
	const processors = options.processors ?? []

	return {
		...highlighter,
		codeToHtml: (str, htmlOptions) => {
			const lang = typeof htmlOptions === 'object'
				? htmlOptions.lang!
				: htmlOptions!

			const baseLineOptions = typeof htmlOptions === 'object'
				? htmlOptions.lineOptions ?? []
				: []

			const theme = typeof htmlOptions === 'object'
				? htmlOptions.theme
				: undefined

			const { code, lineOptions } = process(processors, str, lang)

			const highlighted = highlighter.codeToHtml(code, {
				lang,
				theme,
				lineOptions: [
					...lineOptions,
					...baseLineOptions,
				],
			})

			return postProcess(processors, highlighted, lang)
		},
	}
}
