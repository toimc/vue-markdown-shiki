import type { RangeProcessorOptions } from '../utils/create-range-processor';
import type { Processor } from '../types';
export interface HighlightProcessorOptions extends RangeProcessorOptions {
    hasHighlightedLinesClass?: string;
    hasHighlightClass?: string;
    highlightTag?: string;
}
export declare function createHighlightProcessor(options?: HighlightProcessorOptions): Processor;
