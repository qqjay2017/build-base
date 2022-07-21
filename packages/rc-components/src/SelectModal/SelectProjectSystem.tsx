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
    title:'项目名称、编号',
    dataIndex: 'keyword',
    hideInTable:true,
   
    
    renderFormItem:ColumnRenderFormItem,
  },
  {
    title: '项目名称',
    dataIndex: 'name',
    ellipsis: true,
    search:false,
   
  },
 
  {
    title: '项目编号',
    dataIndex: 'code',
  
    ellipsis: true,
    search:false,
    
  },
  {
    title: '项目建立时间',
    dataIndex: 'createdDatetime',
    ellipsis: true,
    search:false,
    render:(_,record)=>{
        return dateFormat(record.createdDatetime)
      }
  
  },

];

function SelectProjectSystemModal<D = any>(
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
        dataPath:'table.rows',
        totalPath:'table.total',
        method:'get',
        url: '/api/project-system/v1/project/table',
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



export interface IProjectSystemRow {
    id: string;
    code: string;
    name: string;
    bizNum: number;
    chainNum: number;
    createdDatetime: any;
    address: string;
    province: string;
    provinceName: string;
    city: string;
    cityName: string;
    county: string;
    countyName: string;
    approveState: number;
    ownerType: number;
    ownerCompId: string;
    createdCompanyName: string;
    confirmCompId: string;
    confirmCompName: string;
    chainStatus: number;
    type: number;
    stageId: string;
    stageName: string;
    statusId: string;
    statusName: string;
    planStartDate: any;
    planFinishDate: any;
    projectCost: number;
    categoryType: string;
    companyRole: number;
    createdId: string;
    linkHash: string;
    picUrl: string;
    enterFlag: number;
    enterType: number;
    enterWay: number;
    authorityModel: any;
    bim: string;
}
export interface ISelectProjectSystemProps {
  defaultValue?: Partial<BaseModel> | null;
  headers?: IDependHeader;
  modalProps?: ModalProps;
 
  initSearch?:{
   
    companyId?:string;
  };
}
export function selectProjectSystem({
  defaultValue,
  headers,
  modalProps = {},
  initSearch={}
}: ISelectProjectSystemProps): Promise<IProjectSystemRow> {
  if(initSearch.companyId==undefined||initSearch.companyId==null){
    initSearch.companyId = getCompanyId()
  }
 
  return showModal(
    SelectProjectSystemModal,
    {
      defaultValue: defaultValue,
      initSearch,
      headers: headers || {},
    },
    {
      title:'选择项目',

      ...modalProps,
    },
  );
}
