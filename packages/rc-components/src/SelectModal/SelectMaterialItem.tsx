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

import { noLabelColumn, renderFormItemColumnBase } from '../utils/columnConfig';
import { ProFormInstance } from '@ant-design/pro-components';

const defaultColumns: SelectProTableProps<any>['columns'] = [
  {
    ...noLabelColumn,
    ...renderFormItemColumnBase,

    dataIndex: 'materialName',

    title: '材料名称',
  },

  {
    title: '型号规格',
    search: false,
    dataIndex: 'spec',
  },
  {
    title: '材料分类',
    search: false,
    dataIndex: 'materialTypeName',
  },
  {
    title: '合同/订单量',
    search: false,
    dataIndex: 'orderNum',
  },
  {
    title: '其他要求及说明',
    search: false,
    dataIndex: 'otherDesc',
  },
];

function SelectMaterialItemModal<D = any>(props: ShowModalCompProps<ShowModalCompCustomProps<D>>) {
  const { initSearch, headers, requestInfo = {}, tableProps = {}, postData, ...rest } = props;

  const formRef = useRef<ProFormInstance>();
  return (
    <BaseSingleSelectModal<BaseModel>
      defaultColumns={defaultColumns}
      labelPath="name"
      tableProps={{
        formRef,
        postData,
        ...tableProps,
      }}
      initSearch={{
        ...initSearch,
      }}
      requestInfo={{
        dataPath:
          initSearch.bizType === 'contract'
            ? `contractItemRequest`
            : initSearch.bizType === 'order'
            ? `items`
            : initSearch.bizType === 'notice'
            ? `items`
            : '',
        totalPath: 'table.total',
        method: 'get',
        url:
          initSearch.bizType === 'contract'
            ? `/api/scm/v1/contract/${initSearch.id}`
            : initSearch.bizType === 'order'
            ? `/api/scm/v1/purchase/order/${initSearch.id}`
            : initSearch.bizType === 'notice'
            ? `/api/scm/v1/shipments/notice/${initSearch.id}`
            : '',
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

export interface IMaterialItemRow extends Record<string, any> {
  brandDesc: string;
  busId: string;
  contractType: number;
  dataVersion: number;
  delFlag: number;
  executedNum: string;
  id: string;
  materialId: string;
  materialName: string;
  materialTypeId: string;
  materialTypeName: string;
  materialsBrand: string;
  materialsCategory: string;
  materialsCode: string;
  noTaxAmount: string;
  noticeNum: string;
  orderNum: string;
  originDesc: string;
  otherDesc: string;
  price: string;
}
export type ISelectMaterialItemProps = ShowModalFnPropsBase<{
  companyId?: string;
  type?: number | string;
  approveState?: number | string;
  id?: string;
  bizType?: 'order' | 'contract' | 'notice';
}>;
export function selectMaterialItem({
  modalProps = {},
  initSearch = {},
  ...rest
}: ISelectMaterialItemProps = {}): Promise<SelectModalPromise<IMaterialItemRow[]>> {
  // if (initSearch.companyId == undefined || initSearch.companyId == null) {
  //   initSearch.companyId = getCompanyId();
  // }

  return showModal(
    SelectMaterialItemModal,
    {
      postData(data: any[] = [], query: any = {}) {
        console.log(query, 'query');
        const materialName = query.materialName;
        if (materialName) {
          return data.filter((d) => d.materialName.includes(materialName));
        } else {
          return data;
        }
      },
      initSearch,
      tableProps: {
        pagination: false,
      },
      multiple: true,

      ...rest,
    },
    {
      title: '选择材料',

      ...modalProps,
    },
  );
}
