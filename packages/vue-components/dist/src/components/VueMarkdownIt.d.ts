import type { PropType, CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
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
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}, {}>;
export default _default;
