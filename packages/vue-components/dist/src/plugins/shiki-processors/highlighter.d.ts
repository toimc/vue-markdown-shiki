import { Highlighter } from 'shiki';
import { Processor } from './types';
export interface HighlighterOptions {
    themes?: string[] | string;
    langs?: string[];
    processors?: Processor[];
}
export declare function getHighlighter(options?: HighlighterOptions): Promise<Highlighter>;
