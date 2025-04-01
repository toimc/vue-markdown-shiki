import { PropType } from 'vue';
import { MarkdownOptions } from '../markdown';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
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
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
}>> & Readonly<{}>, {
    options: MarkdownOptions;
    class: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
