
import {  getCompanyId } from '@core/shared';
import React, { useRef } from 'react';

import { showModal, ShowModalCompProps } from '../showModal';
import { BaseModel, BaseSingleSelectModal, SelectModalPromise, SelectProTableProps, ShowModalCompCustomProps, ShowModalFnPropsBase } from './base';

import { createdDatetimeColumn, nameColumn, nameSearchColumn, noLabelColumn, projectCodeColumn, projectKeywordColumn, projectNameColumn } from '../utils/columnConfig';
import { ProFormInstance } from '@ant-design/pro-components';

const defaultColumns: SelectProTableProps<any>['columns'] = [
  projectKeywordColumn,
  {
    ...nameColumn,
   
    title:'项目名称'
  },

  projectCodeColumn,
  createdDatetimeColumn
];

function SelectProjectSystemModal<D = any>(
  props: ShowModalCompProps<ShowModalCompCustomProps<D>>,
) {
  const {  initSearch, headers,...rest} = props;
  const formRef = useRef<ProFormInstance>();
  return (
    <BaseSingleSelectModal<BaseModel>
      
      defaultColumns={defaultColumns}
      labelPath="name"
      tableProps={{
        formRef,
      }}
      initSearch={{
        approveState:3,
        ...initSearch,
      }}
    
      requestInfo={{
        dataPath: 'table.rows',
        totalPath: 'table.total',
        method: 'get',
        url: '/api/project-system/v1/project/table',
        headers: {
          // 'depend-method': 'POST',
          // 'depend-uri': '/api/purchase-system/v1/purchase',
          ...headers,
        },
      }}
   
      {...rest}
    />
  );
}

export interface IProjectSystemRow  extends Record<string,any>{
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
export type ISelectProjectSystemProps  = ShowModalFnPropsBase<{
  companyId?: string;
  approveState?:number|string;
}>
export function selectProjectSystem({
  


  modalProps = {},
  initSearch={},
  ...rest
 
}: ISelectProjectSystemProps={}): Promise<SelectModalPromise<IProjectSystemRow>> {
  if (initSearch.companyId == undefined || initSearch.companyId == null) {
    initSearch.companyId = getCompanyId();
  }

  return showModal(
    SelectProjectSystemModal,
    {
      initSearch,
     ...rest
    },
    {
      title: '选择项目',

      ...modalProps,
    },
  );
}

