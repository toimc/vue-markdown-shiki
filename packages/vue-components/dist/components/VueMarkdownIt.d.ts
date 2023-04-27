import type { PropType, CSSProperties } from 'vue';
import type { Lang } from 'shiki';
import type MarkdownIt from 'markdown-it';
declare const _sfc_main: import("vue").DefineComponent<{
    content: {
        type: StringConstructor;
        required: true;
    };
    style: {
        type: PropType<CSSProperties>;
        default: () => void;
    };
    class: {
        type: StringConstructor;
        default: string;
    };
    stream: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    render: import("vue").Ref<string>;
    md: import("vue").Ref<MarkdownIt | undefined>;
    loadLangFn: import("vue").Ref<((lang: Lang) => Promise<void>) | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    content: {
        type: StringConstructor;
        required: true;
    };
    style: {
        type: PropType<CSSProperties>;
        default: () => void;
    };
    class: {
        type: StringConstructor;
        default: string;
    };
    stream: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    style: CSSProperties;
    class: string;
    stream: boolean;
}>;
export default _sfc_main;
