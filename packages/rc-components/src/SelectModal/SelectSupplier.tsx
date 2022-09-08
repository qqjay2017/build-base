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

import {
  aliasColumn,
  contactNameColumn,
  contactPhoneColumn,
  keyWorldColumn,
  nameColumn,
} from '../utils/columnConfig';
import { getCompanyId } from '@core/shared';

const defaultColumns: SelectProTableProps<any>['columns'] = [
  keyWorldColumn,
  {
    title: '名称',

    search: false,
    ...nameColumn,
  },

  aliasColumn,
  contactNameColumn,
  contactPhoneColumn,
];

function SelectSupplierModal<D = any>(props: ShowModalCompProps<ShowModalCompCustomProps<D>>) {
  const { initSearch, headers, requestInfo = {}, ...rest } = props;
  const type = initSearch.type || 'customer';
  return (
    <BaseSingleSelectModal<BaseModel>
      defaultColumns={defaultColumns}
      labelPath="name"
      initSearch={{
        companyId: getCompanyId(),
        companyStatus: [1, 2],
        valid: 1,
        ...initSearch,
      }}
      requestInfo={{
        dataPath: 'rows',
        totalPath: 'total',
        method: 'post',
        url: `/api/scm/v1/${type}/table`,
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
  companyId?: string;
  valid?: number | string;
  type: 'supplier' | 'customer';
}>;

export function selectSupplier({ modalProps = {}, ...rest }: ISelectSupplierProps = {}): Promise<
  SelectModalPromise<ISupplierRow>
> {
  return showModal(
    SelectSupplierModal,
    {
      ...rest,
    },
    {
      title: '选择客户',

      ...modalProps,
    },
  );
}
