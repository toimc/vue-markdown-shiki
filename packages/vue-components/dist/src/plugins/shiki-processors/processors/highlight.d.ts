import { RangeProcessorOptions } from '../utils/create-range-processor';
import { Processor } from '../types';
export interface HighlightProcessorOptions extends RangeProcessorOptions {
    hasHighlightedLinesClass?: string;
    hasHighlightClass?: string;
    highlightTag?: string;
}
export declare function createHighlightProcessor(options?: HighlightProcessorOptions): Processor;
