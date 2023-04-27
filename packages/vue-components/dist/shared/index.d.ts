import type { Highlighter, Lang } from 'shiki';
export declare const EXTERNAL_URL_RE: RegExp;
export declare const PATHNAME_PROTOCOL_RE: RegExp;
export declare const APPEARANCE_KEY = "vitepress-theme-appearance";
export declare const HASH_RE: RegExp;
export declare const EXT_RE: RegExp;
export declare const inBrowser: boolean;
export interface Header {
    /**
     * The level of the header
     *
     * `1` to `6` for `<h1>` to `<h6>`
     */
    level: number;
    /**
     * The title of the header
     */
    title: string;
    /**
     * The slug of the header
     *
     * Typically the `id` attr of the header anchor
     */
    slug: string;
    /**
     * Link of the header
     *
     * Typically using `#${slug}` as the anchor hash
     */
    link: string;
    /**
     * The children of the header
     */
    children: Header[];
}
export declare function isActive(currentPath: string, matchPath?: string, asRegex?: boolean): boolean;
export declare function normalize(path: string): string;
export declare function isExternal(path: string): boolean;
export declare function sanitizeFileName(name: string): string;
export interface HighlightPlugin {
    plugin: (str: string, lang: string, attrs: string) => string;
    highlighter: Highlighter;
    loadLang: (lang: Lang) => Promise<void>;
}
export declare const MarkdownSymbol: unique symbol;
export declare const getLangs: () => string[];
export declare const transform: Record<string, string>;
