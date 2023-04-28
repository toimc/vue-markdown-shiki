import type { PropType } from 'vue';
import type { MarkdownOptions } from '../markdown';
declare const _sfc_main: import("vue").DefineComponent<{
    options: {
        type: PropType<MarkdownOptions>;
        default: {
            theme: string;
            defaultHighlightLang: string;
        };
    };
    class: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<MarkdownOptions>;
        default: {
            theme: string;
            defaultHighlightLang: string;
        };
    };
    class: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    class: string;
    options: MarkdownOptions;
}>;
export default _sfc_main;
