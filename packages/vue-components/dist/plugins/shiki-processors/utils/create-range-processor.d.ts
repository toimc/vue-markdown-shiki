import type { TagClassesDictionary, ProcessorHandler } from '../types';
export interface RangeProcessorOptions {
    tagRegExp?: RegExp;
}
export declare function createRangeProcessor(dictionary: TagClassesDictionary, options?: RangeProcessorOptions): ProcessorHandler;
