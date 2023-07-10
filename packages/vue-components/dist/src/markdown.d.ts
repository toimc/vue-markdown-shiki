import { type HeadersPluginOptions } from '@mdit-vue/plugin-headers';
import { type TocPluginOptions } from '@mdit-vue/plugin-toc';
import MarkdownIt from 'markdown-it';
import anchorPlugin from 'markdown-it-anchor';
import type { ILanguageRegistration, IThemeRegistration } from 'shiki';
import type { Logger } from 'vite';
import type { HighlightPlugin } from './shared';
export type ThemeOptions = IThemeRegistration | {
    light: IThemeRegistration;
    dark: IThemeRegistration;
};
export interface MarkdownOptions extends MarkdownIt.Options {
    lineNumbers?: boolean;
    config?: (md: MarkdownIt) => void;
    anchor?: anchorPlugin.AnchorOptions;
    attrs?: {
        leftDelimiter?: string;
        rightDelimiter?: string;
        allowedAttributes?: string[];
        disable?: boolean;
    };
    defaultHighlightLang?: string;
    headers?: HeadersPluginOptions | boolean;
    theme?: ThemeOptions;
    languages?: ILanguageRegistration[];
    toc?: TocPluginOptions;
    externalLinks?: Record<string, string>;
}
export type MarkdownRenderer = MarkdownIt;
export type MarkdownType = {
    md: MarkdownRenderer;
    highlighter: HighlightPlugin['highlighter'];
    loadLang: HighlightPlugin['loadLang'];
};
/**
 * Create a markdown renderer with options.
 *
 * @param {MarkdownOptions} [options={}] - The markdown options.
 * @param {string} [base='/'] - The base URL.
 * @param {Pick<Logger, 'warn'>} [logger=console] - The logger.
 * @returns {Promise<MarkdownType>} The markdown renderer, highlighter, and loadLang function.
 */
export declare const createMarkdownRenderer: (options?: MarkdownOptions, base?: string, logger?: Pick<Logger, 'warn'>) => Promise<MarkdownType>;
