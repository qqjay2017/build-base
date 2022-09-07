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

import { keyWorldColumn } from '../utils/columnConfig';
import { ProFormInstance } from '@ant-design/pro-components';

const defaultColumns: SelectProTableProps<any>['columns'] = [
  //   projectKeywordColumn,
  //   {
  //     ...nameColumn,

  //     title: '项目名称',
  //   },

  //   projectCodeColumn,
  //   createdDatetimeColumn,
  {
    ...keyWorldColumn,
    title: '仓库编号/名称',
  },
  {
    dataIndex: 'code',
    title: '仓库编号',
    search: false,
  },
  {
    dataIndex: 'name',
    title: '仓库名称',
    search: false,
  },
];

function SelectWarehouseModal<D = any>(props: ShowModalCompProps<ShowModalCompCustomProps<D>>) {
  const { initSearch, headers, requestInfo = {}, ...rest } = props;
  const formRef = useRef<ProFormInstance>();
  return (
    <BaseSingleSelectModal<BaseModel>
      defaultColumns={defaultColumns}
      labelPath="name"
      tableProps={{
        formRef,
      }}
      initSearch={{
        status: '0',
        // approveState: 3,
        ...initSearch,
      }}
      requestInfo={{
        dataPath: 'rows',
        totalPath: 'total',
        method: 'post',
        url: '/api/scm/v1/oss/warehouse/table',
        headers: {
          // 'depend-method': 'POST',
          // 'depend-uri': '/api/purchase-system/v1/purchase',
          ...headers,
        },
        ...requestInfo,
      }}
      {...rest}
    />
  );
}

export interface IWarehouseRow extends Record<string, any> {
  id: string;
  delFlag: number;
  dataVersion: number;
  createdId: string;
  createdEmplId: string;
  createdEmplName: string;
  createdName: string;
  createdDatetime: any;
  modiId: string;
  modiEmplId: string;
  modiEmplName: string;
  modiName: string;
  modiDatetime: any;
  code: string;
  companyId: string;
  companyName: string;
  name: string;
  status: number;
}
export type ISelectWarehouseProps = ShowModalFnPropsBase<{
  companyId?: string;
  type?: number | string;
  approveState?: number | string;
}>;
export function selectWarehouse({
  modalProps = {},
  initSearch = {},
  ...rest
}: ISelectWarehouseProps = {}): Promise<SelectModalPromise<IWarehouseRow>> {
  if (initSearch.companyId == undefined || initSearch.companyId == null) {
    initSearch.companyId = getCompanyId();
  }

  return showModal(
    SelectWarehouseModal,
    {
      initSearch,
      ...rest,
    },
    {
      title: '选择仓库',

      ...modalProps,
    },
  );
}
