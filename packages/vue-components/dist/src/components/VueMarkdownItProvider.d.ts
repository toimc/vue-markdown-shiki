import type { PropType } from 'vue';
import type { MarkdownOptions } from '../markdown';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
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
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
