import { IDependHeader, IMaterialsTypeRow, scmGetMaterialsTypeApi } from '@core/service-api';
import { getCompanyId } from '@core/shared';
import { useRequest } from 'ahooks';
import { Input, Tree, TreeProps } from 'antd';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
const TreeContainer = styled.div`
    padding:18px;
    padding-top:24px;
    border-right:1px solid rgba(240, 242, 245, 1);
    min-height:100%;
`
const TreeWrap = styled.div`
padding-top:24px;
`
export interface IMaterialsTypeTreeProps {
  headers?: IDependHeader;
  companyId?: string;
  treeProps?: TreeProps;
  onSelect?:(type:IMaterialsTypeRow)=>void
}

function filterByName(arr:IMaterialsTypeRow[],name:string){
     const f = arr.filter(a=>{
        const flag = a.name.indexOf(name)>-1
        if(flag){
            return true
        }
        
        return false;
    })
    console.log(f)

    return f
}
export function MaterialsTypeTree({
  headers = {
    'depend-uri': '/api/activiti/v1/tasks/{taskId}/complete/formdata',
    'depend-method': 'POST',
  },
  companyId = getCompanyId(),
  treeProps = {},
  onSelect,
}: IMaterialsTypeTreeProps) {
    const [searchVal,setSearchVal] = useState('')
  const { data:typeData, loading } = useRequest(() => scmGetMaterialsTypeApi({
      companyId,
      headers,
    }),
  );

  const treeDataMemo = useMemo(()=>{
    if(!typeData||!typeData.materialsTypeTable){
        return []
    }
    const searchValTrim = searchVal.trim()
    if(!searchValTrim){
        return typeData.materialsTypeTable
    }
    return filterByName(typeData.materialsTypeTable,searchValTrim)
  },[typeData,searchVal])

  const _onSelect = (keys,info)=>{
    if(info && info.node){
        onSelect && onSelect(info.node)
    }
    
  }

 
  return (
    <TreeContainer>
        <Input.Search placeholder='请输入关键字' value={searchVal}  onChange={(e)=>setSearchVal(e.target.value)} />
      <TreeWrap>
      <Tree
      onSelect={_onSelect}
        treeData={treeDataMemo as any[]}
        fieldNames={{
          title: 'name',
          key: 'id',
          children: 'lower',
        }}
        {...treeProps}
      />
      </TreeWrap>
    </TreeContainer>
  );
}
