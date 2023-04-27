import type { ILanguageRegistration } from 'shiki';
import type { Logger } from 'vite';
import type { ThemeOptions } from '../markdown';
import type { HighlightPlugin } from '../shared';
export declare function highlight(theme?: ThemeOptions, languages?: ILanguageRegistration[], defaultLang?: string, logger?: Pick<Logger, 'warn'>): Promise<HighlightPlugin>;
