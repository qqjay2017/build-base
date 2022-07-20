import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Tree } from 'antd';


const SearchLeft = styled.div`
  width: 238px;
  border-right: 1px solid rgba(232, 232, 232, 1);
  padding: 38px 8px 148px 20px;
  min-height: 700px;
  background-color: #fff;
`;
export function SearchLeftTree({ data,selectId ,setSelectId}: { data: any,selectId:string,setSelectId:(id:string)=>void }) {
  const handleSelect = (item)=>{

    if(item ){
      setSelectId && setSelectId(item)
    }else {
      setSelectId('')
    }

  }
  return (
    <SearchLeft>
      <Tree
      selectedKeys={selectId ? [selectId]:[]}
      onSelect={(selectedKeys)=>handleSelect(selectedKeys[0])}
        treeData={data || []}
        draggable={false}
        fieldNames={{ title: 'name', key: 'id' }}
        className="support-search-tree"
        blockNode
      />
    </SearchLeft>
  );
}

  
