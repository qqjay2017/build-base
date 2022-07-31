import { render as reactRender, unmount as reactUnmount } from 'rc-util/lib/React/render';
import React from 'react';
import type { ModalProps } from 'antd/lib/modal';

interface ModalCallbacks {
  resolve: (args: any) => void;
  reject: (args?: any) => void;
  promise: Promise<unknown>;
}

const MODAL_REGISTRY_MAP = new Map<
  React.FC<any>,
  { comp: React.FC<any>; props?: Record<string, unknown>; fragment?: DocumentFragment }
>();

const MODAL_CALLBACK_MAP = new Map<React.FC<any>, ModalCallbacks>();

export const register = <T extends React.FC<any>>(
  comp: T,
  props?: any,
  fragment?: DocumentFragment,
): void => {
  MODAL_REGISTRY_MAP.set(comp, {
    comp,
    props,
    fragment,
  });
};

export const unregister = (comp: any): void => {
  MODAL_REGISTRY_MAP.delete(comp);
  MODAL_CALLBACK_MAP.delete(comp);
};

export type ShowModalCompProps<T> = {
  modalProps?: ModalProps;

  handles?: OpenModalHandles;
} & React.PropsWithChildren<Partial<T>>;
export interface OpenModalHandles {
  remove: () => void;
  resolve: (res: any) => void;
  reject: (err: any) => void;
}

export function showModal<R, P = Record<string, any>>(
  Modal: React.FC<ShowModalCompProps<P>>,
  modalArgs: P,
  modalProps: ModalProps = {},
) {
  const fragment = document.createDocumentFragment();
  // 存props
  if (!MODAL_REGISTRY_MAP.has(Modal)) {
    register(
      Modal as React.FC,
      {
        ...modalArgs,
      },
      fragment,
    );
  }

  // 存promise回调
  let theResolve!: (args: R | PromiseLike<R>) => void;
  let theReject!: (args?: any) => void;
  const promise = new Promise<R>((resolve, reject) => {
    theResolve = resolve;
    theReject = reject;
  });
  MODAL_CALLBACK_MAP.set(Modal, {
    resolve: theResolve,
    reject: theReject,
    promise,
  });

  const _modalProps :ModalProps= {
    visible: true,
okText:'确定',
cancelText:'取消',

    ...modalProps,
  };

  const handles: OpenModalHandles = (MODAL_CALLBACK_MAP.get(Modal) ||
    {}) as unknown as OpenModalHandles;
  handles.remove = () => {
    reactUnmount(fragment);
    unregister(Modal);
  };

  reactRender(
    <Modal {...(modalArgs as any)} modalProps={_modalProps} handles={handles} />,
    fragment,
  );

  return promise;
}

export function closeModal(Modal: React.FC<any>) {
  if (MODAL_REGISTRY_MAP.has(Modal)) {
    const fragment = MODAL_REGISTRY_MAP.get(Modal).fragment;
    fragment && reactUnmount(fragment);
    unregister(Modal);
    return true
  }
  return false
}
