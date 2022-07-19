import { IDependHeader } from '@core/service-api';
import { findConstantLabel, ossDevSystemType } from '@core/shared';
import React from 'react';
import { ColumnRenderFormItem } from '../ColumnRenderFormItem';
import { showModal, ShowModalCompProps } from '../showModal';
import { BaseModel, BaseSingleSelectModal, SelectProTableProps } from './base';
import type { ModalProps } from 'antd/lib/modal';
const columns: SelectProTableProps<any>['columns'] = [
  {
    title: '合同类型',
    dataIndex: 'contrTypeName',
    search: false,
    // renderFormItem: ColumnRenderFormItem,
  },
  {
    title: '合同编号',
    dataIndex: 'contractNo',
    search: false,
    // render: (_, entity) => findConstantLabel(entity.portalType, ossDevSystemType),
  },
  {
    title: '关键字',
    hideInTable: true,
    dataIndex: 'filterStr',

    renderFormItem: ColumnRenderFormItem,
  },
  {
    title: '合同名称',
    dataIndex: 'contractName',
    search: false,

    // width: 100,
  },
];

function SelectPurchaseContractModal<D = any>(
  props: ShowModalCompProps<{
    defaultValue?: D;
    headers?: any;
  }>,
) {
  const { modalProps, handles, headers, defaultValue } = props;
  return (
    <BaseSingleSelectModal<BaseModel>
      defaultValue={defaultValue}
      columns={columns}
      labelPath="contractName"
      initSearch={{
        // status: 'Y',
        // tags: ['PURCHASE_CONTRACT', 'SUB_CONTRACT'],
        contrRole: 1,
        // 关键字
        filterStr: '',
      }}
      modalProps={modalProps}
      requestInfo={{
        url: '/api/contract/v1/contract/server/table',
        headers: {
          'depend-method': 'POST',
          'depend-uri': '/api/purchase-system/v1/purchase',
          ...headers,
        },
      }}
      handles={handles}
    />
  );
}

export interface IPartybList {
  id: any;
  partycId: string;
  contrId: string;
  partyc: string;
}

export interface IContractRow {
  id: string;
  contractNo: string;
  contractName: string;
  projectId: string;
  projectName: string;
  projectCode: string;
  totalAmount: string;
  contrTypeId: string;
  contrTypeName: string;
  payId: string;
  payName: string;
  partybId: string;
  partybName: string;
  partybList: IPartybList[];
  supplierId: string;
  supplierName: string;
  signedDate: any;
  tag: string;
  approveState: number;
}

export function selectPurchaseContract({
  defaultValue,
  headers,
  modelProps = {},
}: {
  defaultValue?: BaseModel | null;
  headers?: IDependHeader;
  modelProps?: ModalProps;
}): Promise<IContractRow> {
  return showModal(
    SelectPurchaseContractModal,
    {
      defaultValue: defaultValue,

      headers: headers || {},
    },
    {
      title: '选择合同',

      ...modelProps,
    },
  );
}
