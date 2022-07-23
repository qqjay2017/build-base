

import React from 'react';

import { showModal, ShowModalCompProps } from '../showModal';
import { BaseModel, BaseSingleSelectModal, SelectModalPromise, SelectProTableProps, ShowModalCompCustomProps, ShowModalFnPropsBase } from './base';

import { applicationSystemNameColumn, orderNumColumn, portalTypeColumn } from '../utils/columnConfig';
const defaultColumns: SelectProTableProps<any>['columns'] = [
  applicationSystemNameColumn,
  portalTypeColumn,
  orderNumColumn,
];

function SelectSystemModal<D = any>(
  props: ShowModalCompProps<ShowModalCompCustomProps<D>>,
) {
  const { modalProps, handles, headers, defaultValue={},initSearch={} ,columns} = props||{};
  return (
    <BaseSingleSelectModal<BaseModel>
      defaultValue={defaultValue}
      columns={columns}
      defaultColumns={defaultColumns}
      initSearch={{
        status: 'Y',
        ...initSearch,
      }}
      
      handles={handles}
      modalProps={modalProps}
      requestInfo={{
        url: '/api/uims/v1/oss/application/system/page',
        headers: {
          'depend-method': 'POST',
          'depend-uri': '/api/cms/v1/system/article/table',
          ...(headers || {}),
        },
      }}
     
    />
  );
}

export interface ISystemRow  extends Record<string,any>{
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

export type ISelectApplicationSystemProps = ShowModalFnPropsBase<{}>

export function selectApplicationSystem({
  defaultValue,
  headers,
  columns,
  modalProps = {},
  initSearch = {},
}: ISelectApplicationSystemProps={}): Promise<SelectModalPromise<ISystemRow>> {
  return showModal(
    SelectSystemModal,
    {
      defaultValue: defaultValue||{},
      initSearch,
      columns,
      headers: headers || {},
    },
    {
      title: '选择应用子系统',

      ...modalProps,
    },
  );
}
