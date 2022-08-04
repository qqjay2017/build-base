import { Modal } from 'antd';
import { ShowModalCompCustomProps } from '../SelectModal';
import { showModal, ShowModalCompProps } from '../showModal';
import React, { useRef } from 'react';
import { useRequest } from 'ahooks';
import {
  IMaterialsTypeRow,
  scmGetMaterialsTypeDetailApi,
  scmPutMaterialsType,
} from '@core/service-api';
import { useMemo } from 'react';
import {
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { SpinnersDot } from '../Spinners';
import { onError } from '../utils';

function MaterialsTypeEditModal({
  modalProps,
  handles,
  parentId,
  id,
  defaultParentCode = 'SY',
  defaultParentName = '物资分类',
}: ShowModalCompProps<ShowModalCompCustomProps<any>>) {
  const formRef = useRef<ProFormInstance>();
  // 新建时候获取父级信息
  const { data: treeParentDetailData, loading: treeParentDataLoading } = useRequest(
    () =>
      scmGetMaterialsTypeDetailApi({
        id: parentId,

        options: {
          onError: onError,
        },
      }),
    {
      ready: !id && !!parentId && parentId !== '0',
    },
  );
  // 编辑时候获取父级信息
  const { data: treeDetailData, loading: treeDataLoading } = useRequest(
    () =>
      scmGetMaterialsTypeDetailApi({
        id,
        options: {
          onError: onError,
        },
      }),
    {
      ready: !!id,
    },
  );
  const treeDetailDataMemo = useMemo<Partial<IMaterialsTypeRow> | undefined>(() => {
    if (!!id) {
      const memo = treeDetailData
        ? {
            ...treeDetailData,
            parentName: treeDetailData.parentName || defaultParentName,
            parentCode: treeDetailData.parentCode || defaultParentCode,
          }
        : treeDetailData;

      if (memo) {
        memo.code = memo.code.slice(memo.parentCode.length);
      }

      return memo;
    }

    if (parentId === '0') {
      return {
        parentId,
        parentCode: defaultParentCode,
        parentName: defaultParentName,
      };
    }
    if (!treeParentDetailData) {
      return treeParentDetailData;
    }
    return {
      parentCode: treeParentDetailData.code || defaultParentCode,
      parentName: treeParentDetailData.name || defaultParentName,
    };
  }, [treeParentDetailData, parentId, treeDetailData, id]);
  const onOk = () => {
    formRef.current.validateFields().then(() => {
      const val = formRef.current.getFieldsValue(true);

      scmPutMaterialsType({
        data: {
          ...val,
          companyId: 0,
          companyName: '系统',
          id: id || undefined,
          parentCode: undefined,
          parentName: undefined,
          parentId: treeDetailDataMemo.parentId,
          sourceType: 1,
          code: (treeDetailDataMemo.parentCode || '') + val.code,
        },
        options: {
          method: parentId === '0' ? 'post' : 'put',
          onError: onError,
        },
      }).then(() => {
        handles.resolve({});
        handles.remove();
      });
    });
  };
  const onCancel = () => {
    handles.remove();
  };
  return (
    <Modal
      {...modalProps}
      title={id ? '编辑分类信息' : '新建分类信息'}
      onOk={() => onOk()}
      onCancel={() => onCancel()}
    >
      {treeDetailDataMemo ? (
        <ProForm
          submitter={false}
          layout="vertical"
          grid={true}
          formRef={formRef}
          initialValues={treeDetailDataMemo}
        >
          <ProFormText label="父级分类" name="parentName" disabled></ProFormText>

          <ProFormText
            label="分类名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入分类名称',
              },
            ]}
          ></ProFormText>
          <ProFormText
            addonBefore={(treeDetailDataMemo.parentCode || defaultParentCode) + ' +'}
            label="分类编码"
            name="code"
          ></ProFormText>
          <ProFormDigit
            label="排序码"
            name="sort"
            min={0}
            max={999}
            placeholder="请输入整数排序码!"
            rules={[
              {
                required: true,
                message: '请输入整数排序码',
              },
            ]}
          />
          <ProFormTextArea
            label="说明备注（对用户展示）"
            name="remark"
            fieldProps={{
              maxLength: 200,
              showCount: true,
            }}
          />
        </ProForm>
      ) : (
        <SpinnersDot />
      )}
    </Modal>
  );
}
/**
 * 编辑传id,新建传parentId
 * @param param0
 * @returns
 */
export function showMaterialsTypeEditModal({ parentId, id }: { parentId: string; id?: string }) {
  return showModal(MaterialsTypeEditModal, { id, parentId }, {});
}
