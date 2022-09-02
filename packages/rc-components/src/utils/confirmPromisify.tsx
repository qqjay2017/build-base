import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, ModalFuncProps } from 'antd';
import React from 'react';

export function confirmPromisify({
  title = '确认删除',
  content = '是否确认删除',
  ...rest
}: ModalFuncProps) {
  return new Promise<void>((resolve, reject) => {
    Modal.confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确定',
      content,
      ...rest,
      onOk() {
        resolve();
      },
      onCancel() {
        reject();
      },
    });
  });
}
