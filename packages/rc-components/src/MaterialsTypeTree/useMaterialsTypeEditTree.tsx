import { scmPostMaterialsTypeDelInfo } from '@core/service-api';
import { Modal } from 'antd';
import { onError } from '../utils/onError';
import { showMaterialsTypeEditModal } from './MaterialsTypeEditModal';

export function useMaterialsTypeEditTree() {
  const handleAddCategory = ({
    parentId,
    id,
    callback,
  }: {
    parentId?: string;
    id?: string;
    callback?: Function;
  }) => {
    showMaterialsTypeEditModal({
      parentId,
      id,
    }).then(() => {
      callback && callback();
    });
  };

  const handleDelete = ({
    id,
    companyId = '0',
    sourceType = 1,
    callback,
  }: {
    id: string;
    companyId?: string;
    sourceType?: number | string;
    callback?: Function;
  }) => {
    Modal.confirm({
      title: '删除确认',
      type: 'confirm',
      content: '分类删除后将不再同步至新用户应用子系统。',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        scmPostMaterialsTypeDelInfo({
          data: {
            companyId,
            id,
            sourceType,
          },
          options: {
            onError: onError,
          },
        }).then(() => {
          callback && callback();
        });
      },
    });
  };

  return {
    handleAddCategory,
    handleDelete,
  };
}
