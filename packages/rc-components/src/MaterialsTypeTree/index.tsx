import { IDependHeader, IMaterialsTypeRow, scmGetMaterialsTypeApi } from '@core/service-api';
import { getCompanyId } from '@core/shared';
import { useRequest } from 'ahooks';
import { Input, Tree, TreeProps } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ConfigProvider } from '../ConfigProvider';
import { ConfigContext } from '../ConfigProvider/context';
import { onError } from '../utils/onError';
import { materialsFilterByName } from './base';
const TreeContainer = styled.div`
  padding: 18px;
  padding-top: 24px;
  padding-right: 0;
  border-right: 1px solid rgba(240, 242, 245, 1);
  min-height: 100%;
`;
const TreeWrap = styled.div`
  padding-top: 12px;
  height: 386px;
  overflow: auto;
`;
const TreeInner = styled.div`
  overflow: auto;
`;
const InputWrap = styled.div`
  padding-right: 24px;
  padding-bottom: 12px;
`;
export interface IMaterialsTypeTreeProps {
  headers?: IDependHeader;
  companyId?: string;
  treeProps?: TreeProps;
  onSelect?: (type: IMaterialsTypeRow) => void;
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
  const [searchVal, setSearchVal] = useState('');
  const configContext = useContext(ConfigContext);
  const { data: typeData, loading } = useRequest(() =>
    scmGetMaterialsTypeApi(
      {
        companyId,
        headers,
      },
      {
        API_URL: configContext.API_URL,
        onError: onError,
      },
    ),
  );

  const treeDataMemo = useMemo(() => {
    if (!typeData || !typeData.materialsTypeTable) {
      return null;
    }
    const searchValTrim = searchVal.trim();
    if (!searchValTrim) {
      return [
        {
          name: '全部分类',
          expanded: true,
          id: '-1',
          lower: typeData.materialsTypeTable || [],
        },
      ];
    }
    return [
      {
        name: '全部分类',
        expanded: true,
        id: '-1',
        lower: typeData.materialsTypeTable || [],
      },
    ];
  }, [typeData]);

  const _onSelect = (keys, info) => {
    if (info && info.node) {
      onSelect && onSelect(info.node);
    }
  };

  return (
    <TreeContainer>
      <InputWrap>
        <Input.Search
          placeholder="请输入关键字"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </InputWrap>
      <TreeWrap>
        <TreeInner>
          {treeDataMemo ? (
            <Tree
              defaultExpandedKeys={['-1']}
              defaultSelectedKeys={['-1']}
              onSelect={_onSelect}
              treeData={treeDataMemo as any[]}
              titleRender={({ name }) => {
                const searchValTrim = (searchVal || '').trim();
                if (searchVal && searchValTrim && name) {
                  const rHtml = name.replace(
                    searchValTrim,
                    `<span style="color: #f55;" >${searchValTrim}</span>`,
                  );

                  return (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: rHtml,
                      }}
                    ></div>
                  );
                } else {
                  return name;
                }
              }}
              fieldNames={{
                title: 'name',
                key: 'id',
                children: 'lower',
              }}
              {...treeProps}
            />
          ) : null}
        </TreeInner>
      </TreeWrap>
    </TreeContainer>
  );
}
