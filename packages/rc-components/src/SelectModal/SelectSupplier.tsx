import { IDependHeader } from '@core/service-api';
import { dateFormat, getCompanyId,} from '@core/shared';
import React from 'react';
import { ColumnRenderFormItem } from '../ColumnRenderFormItem';
import { showModal, ShowModalCompProps } from '../showModal';
import { BaseModel, BaseSingleSelectModal, SelectProTableProps } from './base';
import type { ModalProps } from 'antd/lib/modal';
import { noLabelColumn } from '../utils/columnConfig';

const columns: SelectProTableProps<any>['columns'] = [
  {
    ...noLabelColumn,
    title:'名称/简称',
    dataIndex: 'keyWorld',
    hideInTable:true,
    renderFormItem:ColumnRenderFormItem,
  },
  {
    title: '供应商名称',
    dataIndex: 'name',
    ellipsis: true,
    search:false,
   
  },
 
  {
    title: '简称',
    dataIndex: 'alias',
  
    ellipsis: true,
    search:false,
    
  },
  {
    title: '联系人',
    dataIndex: 'contactName',
  
    ellipsis: true,
    search:false,
    
  },
  {
    title: '联系方式',
    dataIndex: 'contactPhone',
  
    ellipsis: true,
    search:false,
    
  },


];

function SelectSupplierModal<D = any>(
  props: ShowModalCompProps<{
    defaultValue?: D;
    initSearch?:Record<string,any>;
    headers?: any;
  }>,
) {
  const { modalProps, handles, headers, defaultValue } = props;
  return (
    <BaseSingleSelectModal<BaseModel>
      defaultValue={defaultValue}
      columns={columns}
      labelPath="name"
      initSearch={{
        ...props.initSearch,
      }}
      modalProps={modalProps}
      requestInfo={{
        dataPath:'rows',
        totalPath:'total',
        method:'post',
        url: '/api/scm/v1/supplier/table',
        headers: {
          // 'depend-method': 'POST',
          // 'depend-uri': '/api/purchase-system/v1/purchase',
          ...headers,
        },
        
      }}
      handles={handles}
    />
  );
}



export interface ISupplierRow {
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
export interface ISelectSupplierProps {
  defaultValue?: Partial<BaseModel> | null;
  headers?: IDependHeader;
  modalProps?: ModalProps;
 
  initSearch?:{
   
    keyWorld?:string;
  };
}
export function selectSupplier({
  defaultValue,
  headers,
  modalProps = {},
  initSearch={}
}: ISelectSupplierProps): Promise<ISupplierRow> {
  
 
  return showModal(
    SelectSupplierModal,
    {
      defaultValue: defaultValue,
      initSearch,
      headers: headers || {},
    },
    {
      title:'选择供应商',

      ...modalProps,
    },
  );
}
