import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Tree } from 'antd';
import { ICmsGetHelpGetCategoryApiRes } from '@core/service-api';


const TreeStyle = styled(Tree)`
  .ant-tree-switcher{
    width:12px;
  }
`
const SearchLeft = styled.div`
  width: 268px;
  border-right: 1px solid rgba(232, 232, 232, 1);
  padding: 38px 8px 148px 10px;
  min-height: 700px;
  background-color: #fff;
`;
export function SearchLeftTree({
  data,
  selectId,
  artDtMemo,
  setSelectId,
}: {
  data: any;
  selectId: string;
  setSelectId: (id: string) => void;
  artDtMemo: ICmsGetHelpGetCategoryApiRes | null;
}) {
  const handleSelect = (item) => {
    if (item) {
      setSelectId && setSelectId(item);
    } else {
      setSelectId('');
    }
  };
  if(!data||!data.length){
    return null;
  }
  //  ant-tree-switcher
  return (
    <SearchLeft>
      <TreeStyle
  defaultExpandedKeys={artDtMemo&&artDtMemo.parentId ? [artDtMemo.parentId] : []}
   
    defaultExpandParent={true}
      autoExpandParent={true}
selectedKeys={selectId ? [selectId] : []}
       
        onSelect={(selectedKeys) => handleSelect(selectedKeys[0])}
        treeData={data || []}
        draggable={false}
        fieldNames={{ title: 'name', key: 'id' }}
        className="support-search-tree"
        blockNode
      />
    </SearchLeft>
  );
}
