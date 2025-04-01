import { Plugin } from 'vite';
interface Options {
    distDir?: string;
    overwrite?: boolean;
}
export declare function copyPublicPlugin(options?: Options): Plugin;
export {};
