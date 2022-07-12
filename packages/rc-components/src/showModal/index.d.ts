import React from 'react';
import type { ModalProps } from "antd/lib/modal";
export declare const register: <T extends React.FC<any>>(comp: T, props?: any) => void;
export declare const unregister: (comp: any) => void;
export declare type ShowModalCompProps<T> = {
    modalProps: ModalProps;
    handles: OpenModalHandles;
} & React.PropsWithChildren<T>;
export interface OpenModalHandles {
    remove: () => void;
    resolve: (res: any) => void;
    reject: (err: any) => void;
}
export declare function showModal<R, P = Record<string, any>>(Modal: React.FC<ShowModalCompProps<P>>, modalArgs: P, modalProps?: ModalProps): Promise<R>;
