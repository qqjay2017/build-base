export declare type ResizeListener = (element: HTMLDivElement) => void;
export declare function observe(element: HTMLDivElement | null, callback: ResizeListener): boolean;
export declare function unobserve(element: HTMLDivElement | null, callback: ResizeListener): boolean;
