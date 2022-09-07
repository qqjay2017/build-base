import { getCompanyId } from '@core/shared';
import React, { useRef } from 'react';

import { showModal, ShowModalCompProps } from '../showModal';
import {
  BaseModel,
  BaseSingleSelectModal,
  SelectModalPromise,
  SelectProTableProps,
  ShowModalCompCustomProps,
  ShowModalFnPropsBase,
} from './base';

import { ProFormInstance } from '@ant-design/pro-components';
import { keyWorldColumn } from '../utils';

const defaultColumns: SelectProTableProps<any>['columns'] = [
  {
    ...keyWorldColumn,
    title: '批次号',
  },
  {
    dataIndex: 'code',
    title: '批次号',
    search: false,
  },
  {
    dataIndex: 'materialName',
    title: '材料名称',
    search: false,
  },
  {
    dataIndex: 'specifications',
    title: '规格型号',
    search: false,
  },
  {
    dataIndex: 'factoryBatchCode',
    title: '出厂批号',
    search: false,
  },
];

function SelectBatchModal<D = any>(props: ShowModalCompProps<ShowModalCompCustomProps<D>>) {
  const { initSearch, headers, requestInfo = {}, ...rest } = props;
  const formRef = useRef<ProFormInstance>();
  return (
    <BaseSingleSelectModal<BaseModel>
      defaultColumns={defaultColumns}
      labelPath="code"
      tableProps={{
        formRef,
        rowKey: 'code',
      }}
      initSearch={{
        // approveState: 3,
        ...initSearch,
      }}
      requestInfo={{
        dataPath: 'rows',
        totalPath: 'total',
        method: 'post',
        url: '/api/scm/v1/batch/table',
        // url: '/api/scm/v1/supplier/table',
        headers: {
          // 'depend-method': 'POST',
          // 'depend-uri': '/api/purchase-system/v1/purchase',
          // 'depend-method': 'GET',
          // 'depend-uri': '/api/cms/v1/help/index/1',
          ...headers,
        },
        ...requestInfo,
      }}
      {...rest}
    />
  );
}

export interface IBatchRow extends Record<string, any> {
  id: string;
  delFlag: number;
  dataVersion: number;
  tenantId: string;
  createdId: string;
  createdEmplId: string;
  createdEmplName: string;
  createdName: string;
  createdDatetime: number;
  modiId: string;
  modiEmplId: string;
  modiEmplName: string;
  modiName: string;
  modiDatetime: number;
  code: string;
  companyId: string;
  companyName: string;
  materialId: string;
  materialName: string;
  factory: string;
  factoryBatchCode: string;
  factoryTime: number;
  checkFileFlag: number;
  certificateFileFlag: number;
}
export type ISelectBatchProps = ShowModalFnPropsBase<{
  companyId?: string;
  type?: number | string;
  approveState?: number | string;
}>;
export function selectBatch({
  modalProps = {},
  initSearch = {},
  ...rest
}: ISelectBatchProps = {}): Promise<SelectModalPromise<IBatchRow>> {
  if (initSearch.companyId == undefined || initSearch.companyId == null) {
    initSearch.companyId = getCompanyId();
  }

  return showModal(
    SelectBatchModal,
    {
      initSearch,
      ...rest,
    },
    {
      title: '选择批次号',

      ...modalProps,
    },
  );
}
