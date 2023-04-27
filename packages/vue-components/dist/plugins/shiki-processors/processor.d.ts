import type { Processor, ProcessorResult } from './types';
/**
 * Defines a processor.
 */
export declare function defineProcessor(processor: Processor): Processor;
/**
 * Transforms code through the given processors.
 */
export declare function process(processors: Processor[], code: string, lang: string): ProcessorResult;
/**
 * Transforms final code through the given processors.
 */
export declare function postProcess(processors: Processor[], code: string, lang: string): string;
