import { PluginOption } from 'vite';

interface Options {
    distDir?: string;
    overwrite?: boolean;
}
declare function copyPublicPlugin(options?: Options): PluginOption;

export { copyPublicPlugin };
