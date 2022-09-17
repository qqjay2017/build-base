import { IDependHeader, IMaterialsTypeRow, uimsPostGetDepartmentTreeApi } from '@core/service-api';

import { useRequest } from 'ahooks';
import { Input, Tree, TreeProps } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';

import { ConfigContext } from '../ConfigProvider/context';
import { onError } from '../utils/onError';
const InputWrap = styled.div`
  padding: 24px 0;
`;
const TreeContainer = styled.div`
  padding: 18px;

  /* border-right: 1px solid rgba(240, 242, 245, 1); */
  min-height: 100%;
  padding-top: 0;
`;
const TreeWrap = styled.div`
  padding-top: 0px;
`;
export interface IDepartmentTreeProps {
  headers?: IDependHeader;
  companyId?: string;
  treeProps?: TreeProps;
  onSelect?: (type: IMaterialsTypeRow) => void;
}

export function DepartmentTree({
  headers = {
    'depend-uri': '/api/cms/v1/help/index/1',
    'depend-method': 'GET',
  },

  treeProps = {},
  onSelect,
}: IDepartmentTreeProps) {
  const configContext = useContext(ConfigContext);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const _onSelect = (keys, info) => {
    if (info && info.node) {
      onSelect && onSelect(info.node);
      setSelectedKeys([info.node.id]);
    }
  };
  const [searchVal, setSearchVal] = useState('');
  const {
    data: treeData,
    loading,
    refresh,
  } = useRequest(
    () =>
      uimsPostGetDepartmentTreeApi({
        data: {
          name: searchVal,
        },
        headers,
        API_URL: configContext.API_URL,
        onError: onError,
      }),
    {
      onSuccess: (data) => {
        if (data && data[0] && data[0].id) {
          const keys = [data[0].id];
          _onSelect(keys, {
            node: data[0],
          });
        }
      },
    },
  );

  const treeDataMemo = useMemo(() => {
    if (!treeData || !treeData) {
      return [];
    }
    return treeData;
  }, [treeData]);

  return (
    <TreeContainer>
      <InputWrap>
        <Input.Search
          placeholder="请输入关键字"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onSearch={() => refresh()}
        />
      </InputWrap>
      <TreeWrap>
        {selectedKeys && selectedKeys.length > 0 ? (
          <Tree
            defaultExpandedKeys={selectedKeys}
            selectedKeys={selectedKeys}
            onSelect={_onSelect}
            treeData={treeDataMemo as any[]}
            fieldNames={{
              title: 'name',
              key: 'id',
              children: 'children',
            }}
            {...treeProps}
          />
        ) : null}
      </TreeWrap>
    </TreeContainer>
  );
}
