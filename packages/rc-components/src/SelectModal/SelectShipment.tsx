import React, { useMemo, useRef, useState } from 'react';

import { showModal, ShowModalCompProps } from '../showModal';
import {
  BaseModel,
  BaseSingleSelectModal,
  SelectModalPromise,
  SelectProTableProps,
  ShowModalCompCustomProps,
  ShowModalFnPropsBase,
} from './base';

import { noLabelColumn } from '../utils/columnConfig';

import { ProFormInstance } from '@ant-design/pro-components';
import { ColumnRenderFormItem, ISupplierRow, selectSupplier } from '..';
import { busType, findConstantLabel, getCompanyId } from '@core/shared';

function SelectShipmentModal<D = any>(props: ShowModalCompProps<ShowModalCompCustomProps<D>>) {
  const { headers, initSearch = {}, requestInfo = {}, ...rest } = props;
  const { bizType, type, listType } = initSearch;
  const bizTypeZh = useBizTypeZh({
    bizType: initSearch.bizType,
    type: initSearch.type,
  });

  const [tableParams, setTableParams] = useState({});

  const formRef = useRef<ProFormInstance>();
  const _headers: any = {
    'depend-uri': getShipmentsApiUrl({
      type,
      listType,
      bizType,
      endWorld: '/table',
    }),
    'depend-method': 'POST',
  };

  const isSup = initSearch.type === '2';
  const dateTitle =
    bizType === 'return' ? '退货日期' : bizType === 'receive' ? '收货日期' : '发货日期';
  const dateIndex =
    bizType === 'return' ? 'returnDate' : bizType === 'receive' ? 'receiveDate' : 'shipmentsDate';
  const defaultColumns: SelectProTableProps<any>['columns'] = [
    // filterStrColumn,
    {
      ...noLabelColumn,
      title: `单据名称/项目/${type === '2' ? '客户' : '供应商'}搜索`,
      dataIndex: 'keyWorld',
      hideInTable: true,
      fieldProps: {
        placeholder: `输入单据名称/项目/${type === '2' ? '客户' : '供应商'}搜索`,
      },
      renderFormItem: ColumnRenderFormItem,
    },

    // {
    //   title: dateTitle,
    //   hideInTable: true,
    //   valueType: 'dateRange',

    //   dataIndex: dateIndex,
    // },
    {
      title: bizTypeZh + '编号',
      search: false,
      dataIndex: 'code',
    },
    {
      title: dateTitle,
      search: false,
      valueType: 'date',
      dataIndex: dateIndex,
    },
    {
      title: type === '1' ? '供应商' : '客户',
      search: false,
      dataIndex: 'partycName',
    },
    {
      title: '项目',
      search: false,
      dataIndex: 'projectName',
    },
    {
      title: '业务类型',
      dataIndex: 'busType',
      search: false,

      request: async () => busType,
      render: (_, record) => {
        return findConstantLabel(record.busType, busType);
      },
    },
  ];

  return (
    <BaseSingleSelectModal<BaseModel>
      defaultColumns={defaultColumns}
      labelPath="code"
      initSearch={{
        // acceptCompanyId: getCompanyId(),
        // companyId: getCompanyId(),
        orderStatus: 54,

        ...initSearch,
      }}
      tableProps={{
        formRef: formRef,
        params: {
          ...tableParams,
        },
      }}
      requestInfo={{
        url: getShipmentsChoiceApiUrl({
          type,
          listType,
          bizType,
        }),
        headers: {
          // 'depend-method': 'POST',
          // 'depend-uri': '/api/purchase-system/v1/purchase',
          ..._headers,
          ...headers,
        },
        ...requestInfo,
      }}
      {...rest}
    />
  );
}

export type ISelectShipmentProps = ShowModalFnPropsBase<{
  /**
   * 1. 采购 2. 销售
   */
  type?: '1' | '2';
  orderStatus?: number;
  listType?: '1' | '2';
  bizType?: 'return' | 'shipments' | 'notice' | 'receive';

  /**
   * 选择采购方合同
   */

  /**
   * 选择供货方合同
   */
}>;

export interface IShipmentsNoticeAuthorityModel {
  edit: boolean;
  delete: boolean;
  back: boolean;
  reject: boolean;
  receive: boolean;
  reReceive: boolean;
  reStart: boolean;
  record: boolean;
  chain: boolean;
  formDetail: boolean;
  release: boolean;
  invalid: boolean;
  accept: boolean;
  refuse: boolean;
  offer: boolean;
  startOffer: boolean;
  endOffer: boolean;
  comparison: boolean;
  pricing: boolean;
  replenish: boolean;
  replenishBak: boolean;
}

export interface IShipmentRow {
  id: string;
  dataVersion: number;
  tenantId: string;
  createdId: string;
  createdEmplId: string;
  createdEmplName: string;
  createdName: string;
  createdDatetime: any;
  settleDate: any;
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
  returnRemark?: string;
  returnStatus: number;
  receiveUserId: string;
  receiverIds: string;
  unitType: number;
  unitApproveState: number;
  authorityModel: IShipmentsNoticeAuthorityModel;
  code: string;
  name: string;
  busType: number;
  shipmentsDate: any;
  refOrderType: number;
  refOrderId: string;
  refOrderCode: string;
  refOrderName: string;
  senderIds: string;
  senderNames: string;
  returnIds: string;
  returnNames: string;
  senderFace: number;
  receiverFace: number;
  receiverNames?: string;
  shipmentsType: number;
  companyName: string;
  partybId: string;
  partybName: string;
  partycId: string;
  partycName: string;
  procInstKey: string;
  lastProcInst: boolean;
  orderStatus: number;
  procInstId: string;
  taskId: string;
  planToDate?: number;
  shipmentAddress: string;
  transportUnit: string;
  transportCode: string;
  remark: string;
  items: any[];
  attachFiles: any[];
}

export function selectShipment({
  initSearch = {
    type: '2',
  },
  modalProps = {},
  ...rest
}: ISelectShipmentProps = {}): Promise<
  SelectModalPromise<
    IShipmentRow,
    {
      orderStatus?: string | number;
    }
  >
> {
  return showModal(
    SelectShipmentModal,
    {
      initSearch,

      ...rest,
    },
    {
      ...modalProps,
    },
  );
}

export function useBizTypeZh({ bizType, type }: IShipmentsTableProps) {
  const bizTypeZh = useMemo(() => {
    // if (type === '1') {
    //   return '单据';
    // }
    if (bizType === 'notice') {
      return '通知单';
    }
    if (bizType === 'return') {
      return '退货单';
    }
    if (bizType === 'shipments') {
      return '发货单';
    }
    if (bizType === 'receive') {
      return '收货单';
    }
    return '';
  }, [bizType, type]);
  return bizTypeZh;
}

export interface IShipmentsTableProps {
  /**
   * 1. 采购方
   * 2. 销售方
   *
   */
  type?: '1' | '2';
  /**
   * 1. 列表
   * 2. 接收列表
   */
  listType?: '1' | '2';
  /**
   * 业务类型
   * shipments: 发货单/到货单
   * return: 退货单
   * notice : 发货通知
   * receive 收货单
   */
  bizType?: 'return' | 'shipments' | 'notice' | 'receive';
  endWorld?: string;
  isReceiveApi?: boolean;
}

const apiLogistic = '/api/logistic';

export function getShipmentsApiUrl({
  type = '2',
  listType = '1',
  bizType = 'shipments',
  endWorld = '/table',
  isReceiveApi = false,
}: IShipmentsTableProps) {
  if (bizType === 'shipments') {
    if (listType === '1' || isReceiveApi) {
      return `${apiLogistic}/v1/shipments${endWorld}`;
    } else {
      return `${apiLogistic}/v1/shipments/receiver${endWorld}`;
    }
  }
  if (bizType === 'return') {
    if (type === '1') {
      if (listType === '1' || isReceiveApi) {
        // 采购发起退货
        return `${apiLogistic}/v1/purchase/return${endWorld}`;
      } else {
        // 采购接收退货
        return `${apiLogistic}/v1/purchase/return/receiver${endWorld}`;
      }
    } else {
      //
      if (listType === '1' || isReceiveApi) {
        // 销售发起退货
        return `${apiLogistic}/v1/sale/return${endWorld}`;
      } else {
        // 销售接收退货
        return `${apiLogistic}/v1/sale/return/receiver${endWorld}`;
      }
    }
  }
  if (bizType === 'notice') {
    if (listType === '1' || isReceiveApi) {
      return `${apiLogistic}/v1/shipments/notice${endWorld}`;
    }
    if (listType === '2') {
      return `${apiLogistic}/v1/shipments/notice/receiver${endWorld}`;
    }
  }
  if (bizType === 'receive') {
    if (listType === '1' || isReceiveApi) {
      return `${apiLogistic}/v1/receive/goods${endWorld}`;
    }
    if (listType === '2') {
      return `${apiLogistic}/v1/receive/goods/receiver${endWorld}`;
    }
  }
  return '';
}

export function getShipmentsChoiceApiUrl({
  type = '2',
  listType = '1',
  bizType = 'shipments',
}: IShipmentsTableProps) {
  const endWorld = listType === '2' ? '/receiver-choice-table' : '/choice-table';
  if (bizType === 'shipments') {
    return `${apiLogistic}/v1/shipments${endWorld}`;
  }
  if (bizType === 'return') {
    if (type === '1') {
      return `${apiLogistic}/v1/purchase/return${endWorld}`;
    } else {
      return `${apiLogistic}/v1/sale/return${endWorld}`;
    }
  }
  if (bizType === 'notice') {
    return `${apiLogistic}/v1/shipments/notice${endWorld}`;
  }
  if (bizType === 'receive') {
    return `${apiLogistic}/v1/receive/goods${endWorld}`;
  }
  return '';
}

export function getShipmentsItemListApiUrl({ type, bizType = 'shipments' }: IShipmentsTableProps) {
  if (bizType === 'shipments') {
    return `${apiLogistic}/v1/shipments/item/list`;
  }
  if (bizType === 'return') {
    if (type === '1') {
      return `${apiLogistic}/v1/purchase/return/item/list`;
    } else {
      return `${apiLogistic}/v1/sale/return/item/list`;
    }
  }
  if (bizType === 'notice') {
    return `${apiLogistic}/v1/shipments/notice/item/list`;
  }
  if (bizType === 'receive') {
    return `${apiLogistic}/v1/receive/goods/item/list`;
  }
  return '';
}
