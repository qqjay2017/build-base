import React from 'react';
import styled from 'styled-components';
import { Tree } from 'antd';
import { ICmsGetHelpGetCategoryApiRes } from '@core/service-api';

// import { SpinnersDot } from '../../Spinners';
const TreeStyle = styled(Tree)`
  box-sizing: border-box;
  width: 200px;
  .ant-tree-switcher {
    width: 12px;
  }
`;

const TitleRenderDiv = styled.div`
  width: 95px;
  max-width: 95px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const SearchLeft = styled.div`
  width: 268px;
  border-right: 1px solid rgba(232, 232, 232, 1);
  padding: 38px 8px 148px 24px;
  min-height: 700px;
  background-color: #fff;
  overflow-x: hidden;
`;
export function SearchLeftTree({
  data,
  selectId,
  artDtMemo,
  setSelectId,
  loading,
}: {
  loading?: boolean;
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

  // if(loading){
  //   return  <SearchLeft>
  //     <SpinnersDot />
  //   </SearchLeft>
  // }
  if (!data || !data.length) {
    return <SearchLeft></SearchLeft>;
  }
  //  ant-tree-switcher
  return (
    <SearchLeft>
      <TreeStyle
        titleRender={({ name, title }: any) => {
          return <TitleRenderDiv title={name || title}>{name || title}</TitleRenderDiv>;
        }}
        defaultExpandedKeys={artDtMemo && artDtMemo.parentId ? [artDtMemo.parentId] : []}
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
