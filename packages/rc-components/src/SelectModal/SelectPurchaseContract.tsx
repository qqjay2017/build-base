import React, { useRef, useState } from 'react';

import { showModal, ShowModalCompProps } from '../showModal';
import {
  BaseModel,
  BaseSingleSelectModal,
  SelectModalPromise,
  SelectProTableProps,
  ShowModalCompCustomProps,
  ShowModalFnPropsBase,
} from './base';

import { ColumnRenderClickInput } from '../ClickInput';
import {
  contractCodeColumn,
  filterStrColumn,
  noLabelColumn,
  partybColumn,
  projectNameColumn,
  signDateColumn,
} from '../utils/columnConfig';
import { IProjectSystemRow, selectProjectSystem } from './SelectProjectSystem';
import { ProFormInstance } from '@ant-design/pro-components';
import { ISupplierRow, selectSupplier } from '..';

function SelectPurchaseContractModal<D = any>(
  props: ShowModalCompProps<ShowModalCompCustomProps<D>>,
) {
  const { headers, initSearch, requestInfo = {}, ...rest } = props;

  const [tableParams, setTableParams] = useState({});

  const formRef = useRef<ProFormInstance>();
  // 销售方
  const isSup = initSearch.contrType === '2';
  const partyKey = isSup ? `partya` : `partyb`;
  const partyRowKey = isSup ? `partyaRow` : `partybRow`;

  const defaultColumns: SelectProTableProps<any>['columns'] = [
    {
      ...noLabelColumn,
      title: '项目',
      dataIndex: 'projectRow',
      hideInTable: true,
      renderFormItem: (...p) =>
        ColumnRenderClickInput(...p)({
          disabled: initSearch && initSearch.projectRow,
          onSearchClick: () => {
            selectProjectSystem({
              defaultValue: formRef.current?.getFieldValue('projectRow') || null,
            }).then((res) => {
              formRef.current?.setFieldsValue({
                projectRow: res.selectedRow,
              });
              setTableParams((p) => ({
                ...p,

                projectRow: undefined,
                projectId: res.selectedRow?.id,
              }));
            });
          },
        }),
    },
    /**
     * partyb 我是采购方-> 供应商
     * partya 我是销售方-> 客户
     */
    {
      ...noLabelColumn,
      title: isSup ? '客户' : '供应商',
      dataIndex: partyKey + 'Row',
      hideInTable: true,
      renderFormItem: (...p) =>
        ColumnRenderClickInput(...p)({
          disabled: initSearch && initSearch[partyRowKey],
          onSearchClick: () => {
            selectSupplier({
              defaultValue: formRef.current?.getFieldValue(partyRowKey) || null,
              modalProps: {
                title: isSup ? '选择客户' : '选择供应商',
              },
            }).then((res) => {
              formRef.current?.setFieldsValue({
                [partyRowKey]: res.selectedRow || null,
              });

              setTableParams((p) => ({
                ...p,
                [partyRowKey]: undefined,

                [`${partyKey}Id`]: res.selectedRow?.companyId,
              }));
            });
          },
        }),
    },
    filterStrColumn,
    contractCodeColumn,

    projectNameColumn,
    {
      ...partybColumn,
      dataIndex: partyKey,
      title: isSup ? '客户' : '供应商',
    },
    signDateColumn,
  ];

  return (
    <BaseSingleSelectModal<BaseModel>
      defaultColumns={defaultColumns}
      labelPath="code"
      initSearch={{
        contrType: '2',

        orderStatus: 54,
        ...initSearch,
      }}
      tableProps={{
        formRef: formRef,
        params: {
          projectId: initSearch.projectRow?.id,
          partyaId: initSearch.partyaRow?.companyId,
          partybId: initSearch.partybRow?.companyId,
          ...tableParams,
        },
      }}
      requestInfo={{
        url: '/api/scm/v1/contract/table',
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

export interface IPartybList {
  id: any;
  partycId: string;
  contrId: string;
  partyc: string;
}

export interface IContractRow extends Record<string, any> {
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
export type ISelectPurchaseContractProps = ShowModalFnPropsBase<{
  contrType: '1' | '2';
  orderStatus?: number;
  projectRow?: any;
  partybRow?: any;
  partyaRow?: any;

  partyaId?: string;

  partybId?: string;
}>;

export function selectPurchaseContract({
  initSearch = {
    contrType: '2',
  },
  modalProps = {},
  ...rest
}: ISelectPurchaseContractProps = {}): Promise<
  SelectModalPromise<
    IContractRow,
    {
      filterStr?: string;
      partybRow?: ISupplierRow | null;
      partyaRow?: ISupplierRow | null;
      projectRow?: IProjectSystemRow | null;
      projectId?: string;
    }
  >
> {
  return showModal(
    SelectPurchaseContractModal,
    {
      initSearch,
      ...rest,
    },
    {
      title: initSearch.contrType === '1' ? '选择采购合同' : '选择销售合同',

      ...modalProps,
    },
  );
}
