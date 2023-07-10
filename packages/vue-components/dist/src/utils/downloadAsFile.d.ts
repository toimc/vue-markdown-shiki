interface languageMap {
    [key: string]: string | undefined;
}
export declare const generateRandomString: (length: Number, lowercase?: boolean) => string;
export declare const programmingLanguages: languageMap;
export declare const downloadAsFile: (lang: string, content: string, prompt?: string) => void;
export {};
