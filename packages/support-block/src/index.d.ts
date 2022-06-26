import "./index.css";
interface SupportWebsiteBlockOptions {
    /**
     * 渲染前会调用
     */
    beforeRender?: () => void;
    /**
     * 渲染后会调用
     */
    afterRender?: () => void;
    /**
     * 使用自带请求,发生错误时候会调用  type = 'http'
     */
    httpError?: (code?: number, data?: any) => void;
    systemId: string;
    baseURL: string;
    platformCode?: string;
    initMenuCode?: string;
}
export declare class CreateSupportBlock {
    constructor(opt: SupportWebsiteBlockOptions);
    container: Document | Element | ShadowRoot | DocumentFragment | undefined;
    beforeRender: any;
    afterRender: any;
    systemId: string;
    categoryId: string;
    baseURL: string;
    platformCode: string;
    httpError: (code?: number, data?: any) => void;
    mount(): void;
    setMenuCode(menuCode: string): void;
    unmount(): void;
}
export {};
