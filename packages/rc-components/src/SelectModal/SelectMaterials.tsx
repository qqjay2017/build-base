import { getCompanyId } from '@core/shared';
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

import {
  brandDescColumn,
  keyWorldColumn,
  materialCodeColumn,
  nameColumn,
  specificationsColumn,
  unitColumn,
} from '../utils/columnConfig';
import { ProFormInstance } from '@ant-design/pro-components';
import styled from 'styled-components';
import { MaterialsTypeTree } from '../MaterialsTypeTree';
import { IMaterialsTypeRow } from '@core/service-api';

const MaterialTreeWrap = styled.div`
  width: 212px;
  height: 457px;
  overflow: auto;
`;

const MaterialTreeInner = styled.div`
  width: 400px;
  min-height: 457px;
`;

const defaultColumns: SelectProTableProps<any>['columns'] = [
  {
    ...keyWorldColumn,
    title: '关键字',
  },
  {
    ...nameColumn,

    title: '材料名称',
  },
  materialCodeColumn,
  specificationsColumn,
  unitColumn,

  brandDescColumn,
];

function SelectMaterialsModal<D = any>(props: ShowModalCompProps<ShowModalCompCustomProps<D>>) {
  const { initSearch = {}, headers, modalProps = {}, ...rest } = props;
  const formRef = useRef<ProFormInstance>();
  if (!initSearch.companyId) {
    initSearch.companyId = getCompanyId();
  }
  const [params,setParams] = useState({
    typeId:''
  })
  const onSelect = (type:IMaterialsTypeRow)=>{
  
    if(type && type.id){
      setParams(p=>({
        ...p,
        typeId:type.id
      }))
      
    }
  }
  return (
    <BaseSingleSelectModal<BaseModel>
      defaultColumns={defaultColumns}
      labelPath="name"
      tableProps={{
        formRef,
        params:params
      }}
      initSearch={{
        sourceType: 0,
      
        ...initSearch,
      }}
      modalProps={{
        width: '900px',
        ...modalProps,
      }}
      requestInfo={{
        dataPath: 'rows',
        totalPath: 'total',
        method: 'post',
        url: '/api/scm/v1/oss/materials/table',
        headers: {
          'depend-method': 'POST',
          'depend-uri': '/api/activiti/v1/tasks/{taskId}/complete/formdata',
          ...headers,
        },
      }}
      {...rest}
    >
      <MaterialTreeWrap>
        <MaterialsTypeTree  onSelect={onSelect} headers={headers} companyId={initSearch.companyId} />
      </MaterialTreeWrap>
    </BaseSingleSelectModal>
  );
}

export interface IMaterialsRow extends Record<string, any> {
  id: string;
  name: string;
  unit: string;
  typeId: string;
  typeCode: string;
  typeName: string;
  inventoryNum: number;
  specifications: string;
  remark: string;
}
export type ISelectMaterialsProps = ShowModalFnPropsBase<{
  companyId?: string;
  sourceType?: number | string;
}>;
export function selectMaterials({
  modalProps = {},
  initSearch = {},
  multiple = true,
  ...rest
}: ISelectMaterialsProps = {}): Promise<SelectModalPromise<IMaterialsRow,any,true>> {
  if (initSearch.companyId == undefined || initSearch.companyId == null) {
    initSearch.companyId = getCompanyId();
  }

  return showModal(
    SelectMaterialsModal,
    {
      multiple,
      initSearch,
      ...rest,
    },
    {
      title: '选择材料',

      ...modalProps,
    },
  );
}
