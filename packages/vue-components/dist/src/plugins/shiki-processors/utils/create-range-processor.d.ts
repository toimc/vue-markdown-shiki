import { ProcessorHandler } from '../types';
type TagClassesDictionary = Record<string, string[]>;
export interface RangeProcessorOptions {
    [key: string]: any;
}
export declare const createRangeProcessor: (classesMap: TagClassesDictionary, options?: RangeProcessorOptions) => ProcessorHandler;
export {};
