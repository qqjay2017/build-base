/// <reference types="react" />
import { ModalProps } from 'antd/lib/modal/Modal';
import { ShowModalCompProps } from '.';
export declare function useShowModal<R, P = Record<string, any>>(Modal: React.FC<ShowModalCompProps<P>>, modalArgs: P, modalProps?: ModalProps): {
    showModal: () => Promise<R>;
    closeModal: () => boolean;
};
