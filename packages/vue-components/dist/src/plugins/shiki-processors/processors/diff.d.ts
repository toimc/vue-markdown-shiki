import type { Processor } from '../types';
import type { RangeProcessorOptions } from '../utils/create-range-processor';
export interface DiffProcessorOptions extends RangeProcessorOptions {
    commonDiffClass?: string;
    removedLinesClasses?: string[];
    addedLinesClasses?: string[];
    removeLineTag?: string;
    addLineTag?: string;
    hasDiffClass?: string;
}
export declare function createDiffProcessor(options?: DiffProcessorOptions): Processor;
