import { BundledLanguage } from 'shiki';
import { Processor } from './types';
/**
 * Defines a processor.
 */
export declare function defineProcessor(processor: Processor): Processor;
/**
 * Transforms code through the given processors.
 */
export declare function process<L = BundledLanguage>(processors: Processor<L>[], code: string, language: L, options?: Record<string, any>): {
    code: string;
    lineOptions: any[];
};
/**
 * Transforms final code through the given processors.
 */
export declare function postProcess<L = BundledLanguage>(processors: Processor<L>[], code: string, language: L): string;
