import { LanguageRegistration } from 'shiki';
import { Logger } from 'vite';
import { ThemeOptions } from '../markdown';
import { HighlightPlugin } from '../shared';
export declare function highlight(theme?: ThemeOptions, languages?: LanguageRegistration[], defaultLang?: string, logger?: Pick<Logger, 'warn'>): Promise<HighlightPlugin>;
