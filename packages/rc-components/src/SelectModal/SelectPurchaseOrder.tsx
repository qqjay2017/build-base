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
  keyWorldColumn,
  nameColumn,
  noLabelColumn,
  partybColumn,
  projectNameColumn,
  projectNameSearchColumn,
  renderFormItemColumnBase,
  signDateColumn,
} from '../utils/columnConfig';
import { IProjectSystemRow, selectProjectSystem } from './SelectProjectSystem';
import { ProFormInstance } from '@ant-design/pro-components';
import { ISupplierRow, selectSupplier } from '..';
import { getCompanyId } from '@core/shared';

function SelectPurchaseOrderModal<D = any>(props: ShowModalCompProps<ShowModalCompCustomProps<D>>) {
  const { headers, initSearch = {}, requestInfo = {}, ...rest } = props;

  const [tableParams, setTableParams] = useState({});

  const formRef = useRef<ProFormInstance>();

  const isSup = initSearch.type === '2';

  const defaultColumns: SelectProTableProps<any>['columns'] = [
    // filterStrColumn,
    {
      ...keyWorldColumn,
      title: '编号/名称',
    },

    {
      ...nameColumn,
      title: '订单名称',
    },
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
    {
      ...noLabelColumn,
      title: isSup ? '客户' : '供应商',
      dataIndex: 'acceptCompanyRow',
      hideInTable: true,
      renderFormItem: (...p) =>
        ColumnRenderClickInput(...p)({
          disabled: initSearch && initSearch['acceptCompanyRow'],
          onSearchClick: () => {
            selectSupplier({
              defaultValue: formRef.current?.getFieldValue('acceptCompanyRow') || null,
              modalProps: {
                title: isSup ? '选择客户' : '选择供应商',
              },
            }).then((res) => {
              formRef.current?.setFieldsValue({
                acceptCompanyRow: res.selectedRow || null,
              });
              if (res.selectedRow) {
                setTableParams((p) => ({
                  ...p,
                  acceptCompanyRow: undefined,
                  acceptCompanyId: res.selectedRow.partnerCompanyId,
                }));
              } else {
                setTableParams((p) => ({
                  ...p,
                  acceptCompanyRow: undefined,
                  acceptCompanyId: undefined,
                }));
              }
            });
          },
        }),
    },

    {
      ...projectNameColumn,
      search: false,
      ...noLabelColumn,
      ...renderFormItemColumnBase,
    },

    {
      ...partybColumn,
      title: initSearch.type === '2' ? '客户' : '供应商',
      search: false,

      dataIndex: initSearch.type === '2' ? 'acceptCompanyName' : 'acceptCompanyName',

      ...noLabelColumn,
      ...renderFormItemColumnBase,
    },
    {
      ...signDateColumn,
      dataIndex: 'signTime',
    },
  ];

  return (
    <BaseSingleSelectModal<BaseModel>
      defaultColumns={defaultColumns}
      labelPath="code"
      initSearch={{
        contrType: 2,
        // acceptCompanyId: getCompanyId(),
        // companyId: getCompanyId(),
        orderStatus: 54,

        ...initSearch,
      }}
      tableProps={{
        formRef: formRef,
        params: {
          projectId: initSearch.projectRow?.id,
          acceptCompanyId: initSearch.acceptCompanyRow?.id,

          ...tableParams,
        },
      }}
      requestInfo={{
        url:
          initSearch.type == '2'
            ? '/api/scm/v1/purchase/order/provider/table'
            : '/api/scm/v1/purchase/order/table',
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

export type ISelectPurchaseOrderProps = ShowModalFnPropsBase<{
  /**
   * 1. 采购 2. 销售
   */
  type: '1' | '2';
  orderStatus?: number;
  projectRow?: IProjectSystemRow | null;

  acceptCompanyRow?: ISupplierRow | null;

  /**
   * 选择采购方合同
   */

  /**
   * 选择供货方合同
   */
}>;

export interface IPurchaseOrderRow {
  id: string;
  dataVersion: number;
  tenantId: string;
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
  projectId: string;
  projectName: string;
  projectCode: string;
  approveState: number;
  companyId: string;
  returnStatus: number;
  receiveUserId: string;
  unitType: number;
  unitApproveState: number;
  authorityModel: any;
  code: string;
  name: string;
  type: number;
  busType: number;
  companyName: string;
  acceptCompanyId: string;
  acceptCompanyName: string;
  refOrderName: string;
  refOrderCode: string;
  refOrderType: number;
  expectedArrivalTime: number;
  signTime: any;
  invoiceType: number;
  tax: string;
  totalAmount: string;
  noTaxAmount: string;
  preSettleAmount: string;
  settledAmount: string;
  offsetAmount: string;
  receiverIds: string;
  receiverNames: string;
  receiverFace: number;
  senderIds: string;
  senderNames: string;
  invoicedAmount: string;
  paidAmount: string;
  addrRemark: string;
  remark: string;
  orderVersion: number;
  changeStatus: number;
  procInstKey: string;
  lastProcInst: boolean;
  orderStatus: number;
  refOrderId: string;
  procInstId: string;
  changeId: string;
}

export function selectPurchaseOrder({
  initSearch = {
    type: '2',
  },
  modalProps = {},
  ...rest
}: ISelectPurchaseOrderProps = {}): Promise<
  SelectModalPromise<
    IPurchaseOrderRow,
    {
      filterStr?: string;

      projectRow?: IProjectSystemRow | null;

      acceptCompanyRow?: ISupplierRow | null;
    }
  >
> {
  return showModal(
    SelectPurchaseOrderModal,
    {
      initSearch,

      ...rest,
    },
    {
      title: initSearch.type === '1' ? '选择采购订单' : '选择销售订单',

      ...modalProps,
    },
  );
}
