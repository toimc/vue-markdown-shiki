import { RangeProcessorOptions } from '../utils/create-range-processor';
import { Processor } from '../types';
export interface FocusProcessorOptions extends RangeProcessorOptions {
    hasFocusedLinesClass?: string;
    hasFocusClass?: string;
    focusTag?: string;
}
export declare function createFocusProcessor(options?: FocusProcessorOptions): Processor;
