import type { Highlighter, HighlighterOptions as ShikiHighlighterOptions } from 'shiki';
import type { Processor } from './types';
export interface HighlighterOptions extends ShikiHighlighterOptions {
    processors?: Processor[];
}
export declare function getHighlighter(options?: HighlighterOptions): Promise<Highlighter>;
