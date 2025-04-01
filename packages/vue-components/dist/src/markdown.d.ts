import { HeadersPluginOptions } from '@mdit-vue/plugin-headers';
import { TocPluginOptions } from '@mdit-vue/plugin-toc';
import { default as MarkdownIt } from 'markdown-it';
import { default as anchorPlugin } from 'markdown-it-anchor';
import { LanguageRegistration, ThemeRegistration } from 'shiki';
import { Logger } from 'vite';
import { HighlightPlugin } from './shared';
export type ThemeOptions = string | ThemeRegistration | {
    light: ThemeRegistration;
    dark: ThemeRegistration;
};
export interface MarkdownOptions {
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
    languages?: LanguageRegistration[];
    toc?: TocPluginOptions;
    externalLinks?: Record<string, string>;
    html?: boolean;
    linkify?: boolean;
    xhtmlOut?: boolean;
    breaks?: boolean;
    langPrefix?: string;
    quotes?: string | string[];
    highlight?: (str: string, lang: string, attrs: string) => string;
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
export declare const createMarkdownRenderer: (options?: MarkdownOptions, base?: string, logger?: Pick<Logger, "warn">) => Promise<MarkdownType>;
