import { Plugin } from 'vite';

interface Options {
    distDir?: string;
    overwrite?: boolean;
}
declare function copyPublicPlugin(options?: Options): Plugin;

export { copyPublicPlugin };
