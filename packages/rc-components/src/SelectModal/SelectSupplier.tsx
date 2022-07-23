

import React from 'react';

import { showModal, ShowModalCompProps } from '../showModal';
import {
  BaseModel,
  BaseSingleSelectModal,
  SelectModalPromise,
  SelectProTableProps,
  ShowModalCompCustomProps,
  ShowModalFnPropsBase,
} from './base';
import type { ModalProps } from 'antd/lib/modal';
import {
  aliasColumn,
  contactNameColumn,
  contactPhoneColumn,
  keyWorldColumn,
  nameColumn,
  
} from '../utils/columnConfig';

const defaultColumns: SelectProTableProps<any>['columns'] = [
  keyWorldColumn,
  {
    title: '供应商名称',

    search: false,
    ...nameColumn,
  },

  aliasColumn,
  contactNameColumn,
  contactPhoneColumn,
];

function SelectSupplierModal<D = any>(props: ShowModalCompProps<ShowModalCompCustomProps<D>>) {
  const {   headers,...rest } = props;

  return (
    <BaseSingleSelectModal<BaseModel>
    
      defaultColumns={defaultColumns}

      labelPath="name"
      initSearch={{
        ...props.initSearch,
      }}
 
      requestInfo={{
        dataPath: 'rows',
        totalPath: 'total',
        method: 'post',
        url: '/api/scm/v1/supplier/table',
        headers: {
          // 'depend-method': 'POST',
          // 'depend-uri': '/api/purchase-system/v1/purchase',
          ...headers,
        },
      }}
     {
      ...rest
     }
    />
  );
}

export interface ISupplierRow extends Record<string, any> {
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
  name: string;
  companyId: string;
  teamCode: string;
  partnerCompanyId: string;
  partnerId: string;
  alias: string;
  contactName: string;
  contactPhone: string;
  companyStatus: number;
  valid: number;
  remark: string;
  settleStatus: number;
}
export type ISelectSupplierProps = ShowModalFnPropsBase<{
  keyWorld?: string;
}>;

export function selectSupplier({
  

 
  modalProps = {},
  ...rest
 
}: ISelectSupplierProps = {}): Promise<SelectModalPromise<ISupplierRow>> {
  return showModal(
    SelectSupplierModal,
    {
   ...rest
    },
    {
      title: '选择供应商',

      ...modalProps,
    },
  );
}
