import {
  IDependHeader,
  IMaterialsTypeRow,
  scmGetMaterialsTypeApi,
  uimsPostGetDepartmentTreeApi,
} from '@core/service-api';
import { getCompanyId } from '@core/shared';
import { useRequest } from 'ahooks';
import { Input, Tree, TreeProps } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ConfigProvider } from '../ConfigProvider';
import { ConfigContext } from '../ConfigProvider/context';
import { onError } from '../utils/onError';
const TreeContainer = styled.div`
  padding: 18px;

  border-right: 1px solid rgba(240, 242, 245, 1);
  min-height: 100%;
  padding-top: 0;
`;
const TreeWrap = styled.div`
  padding-top: 24px;
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
  const { data: treeData, loading } = useRequest(
    () =>
      uimsPostGetDepartmentTreeApi({
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
      <TreeWrap>
        <Tree
          expandedKeys={selectedKeys}
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
      </TreeWrap>
    </TreeContainer>
  );
}
