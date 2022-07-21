import { IDependHeader } from '@core/service-api';
import { findConstantLabel, ossDevSystemType } from '@core/shared';
import React from 'react';
import { ColumnRenderFormItem } from '../ColumnRenderFormItem';
import { showModal, ShowModalCompProps } from '../showModal';
import { BaseModel, BaseSingleSelectModal, SelectProTableProps } from './base';
import type { ModalProps } from 'antd/lib/modal';
import { noLabelColumn } from '../utils/columnConfig';
const columns: SelectProTableProps<any>['columns'] = [
  {
    ...noLabelColumn,
    title: '子系统名称',
    dataIndex: 'name',

    renderFormItem: ColumnRenderFormItem,
  },
  {
    title: '类型',
    dataIndex: 'portalType',
    search: false,
    render: (_, entity) => findConstantLabel(entity.portalType, ossDevSystemType),
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    search: false,

    width: 100,
  },
];

function SelectSystemModal<D = any>(
  props: ShowModalCompProps<{
    defaultValue?: D;
    headers?: any;
  }>,
) {
  const { modalProps, handles, headers, defaultValue={} } = props||{};
  return (
    <BaseSingleSelectModal<BaseModel>
      defaultValue={defaultValue}
      columns={columns}
      initSearch={{
        status: 'Y',
      }}
      modalProps={modalProps}
      requestInfo={{
        url: '/api/uims/v1/oss/application/system/page',
        headers: {
          'depend-method': 'POST',
          'depend-uri': '/api/cms/v1/system/article/table',
          ...(headers || {}),
        },
      }}
      handles={handles}
    />
  );
}

export interface ISystemRow {
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
  devSystemId: string;
  systemTypeId: string;
  enabled: boolean;
  name: string;
  code: string;
  bucket: string;
  objectName: string;
  type: string;
  status: string;
  portalType: string;
  isAgreement: string;
  domainName: string;
  agreementId: string;
  description: string;
  orderNum: number;
  isShow: number;
  teamType: string;
  isEnterprise: boolean;
  directorId: any;
  director: string;
  resourceId: number;
  remark: string;
  devSystemName: string;
  useScope: number;
}

export function selectApplicationSystem({
  defaultValue,
  headers,
  modalProps = {},
}: {
  defaultValue?: Partial<BaseModel> | null;
  headers?: IDependHeader;
  modalProps?: ModalProps;
}={}): Promise<ISystemRow> {
  return showModal(
    SelectSystemModal,
    {
      defaultValue: defaultValue||{},

      headers: headers || {},
    },
    {
      title: '选择应用子系统',

      ...modalProps,
    },
  );
}
