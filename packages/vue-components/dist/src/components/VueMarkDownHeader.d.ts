declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {
        copyRef: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    lang: {
        type: StringConstructor;
        default: string;
    };
    copyTxt: {
        type: StringConstructor;
        default: string;
    };
    copiedTxt: {
        type: StringConstructor;
        default: string;
    };
    item: {
        type: StringConstructor;
        default: string;
    };
    downloadTxt: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    lang: {
        type: StringConstructor;
        default: string;
    };
    copyTxt: {
        type: StringConstructor;
        default: string;
    };
    copiedTxt: {
        type: StringConstructor;
        default: string;
    };
    item: {
        type: StringConstructor;
        default: string;
    };
    downloadTxt: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    lang: string;
    copyTxt: string;
    copiedTxt: string;
    item: string;
    downloadTxt: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {
    copyRef: HTMLDivElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
