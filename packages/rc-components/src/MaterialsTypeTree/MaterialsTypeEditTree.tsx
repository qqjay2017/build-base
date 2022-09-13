import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
} from '@ant-design/icons';
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
import { showMaterialsTypeEditModal } from './MaterialsTypeEditModal';
import { useMaterialsTypeEditTree } from './useMaterialsTypeEditTree';
const TreeContainer = styled.div`
  padding: 18px;
  padding-top: 24px;
  border-right: 1px solid rgba(240, 242, 245, 1);
  min-height: 100%;
`;
const TreeWrap = styled.div`
  padding-top: 0;
`;

const CategoryWrap = styled.div`
  display: flex;
  color: rgba(0, 0, 0, 0.85);
  margin-top: 16px;
  height: 24px;
  margin-right: 4px;
  line-height: 24px;
  margin-bottom: 4px;
  padding-left: 4px;
  &.active {
    background-color: #bae0ff;
  }
`;

const CategoryIconWrap = styled.div`
  color: rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const CategoryText = styled.div`
  flex: 1;
  cursor: pointer;
`;

export interface IMaterialsTypeEditTreeProps {
  headers?: IDependHeader;
  companyId?: string;
  treeProps?: TreeProps;
  categoryText?: string;
  controlled?: boolean;
  defaultSelectKeys?: string[];
  materialsTypeTable?: Partial<IMaterialsTypeRow>[];
  onAdd?: Function;
  onSelect?: (type: IMaterialsTypeRow) => void;
  onDataInit?: (data: { materialsCount: number; materialsTypeTable: IMaterialsTypeRow[] }) => void;
}

const titleIconStyle = { fontSize: '16px', color: 'rgba(0, 0, 0, 0.45)', marginLeft: '4px' };

const TitleRenderWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  .titleName {
    flex: 1;
    color: rgba(0, 0, 0, 0.65);

    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`;

export function MaterialsTypeEditTree({
  headers = {
    'depend-uri': '/api/activiti/v1/tasks/{taskId}/complete/formdata',
    'depend-method': 'POST',
  },
  companyId = '0',
  materialsTypeTable,
  treeProps = {},
  controlled = false,
  categoryText = '物资分类',
  defaultSelectKeys = ['0'],
  onAdd,
  onDataInit,

  onSelect,
}: IMaterialsTypeEditTreeProps) {
  const [searchVal, setSearchVal] = useState('');
  const [selectKeys, setSelectKeys] = useState(defaultSelectKeys);
  const configContext = useContext(ConfigContext);
  const [selectInfo, setSelectInfo] = useState<Partial<IMaterialsTypeRow>>({
    id: '0',
  });
  const {
    data: typeData,
    loading,
    mutate,
    run,
    refresh,
  } = useRequest(
    () =>
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
    {
      ready: !controlled,
      onSuccess: (data) => {
        if (!typeData) {
          onDataInit && onDataInit(data);
        }
      },
    },
  );
  const { handleAddCategory, handleDelete } = useMaterialsTypeEditTree();
  const treeDataMemo = useMemo(() => {
    if (!typeData || !typeData.materialsTypeTable) {
      return [];
    }
    const searchValTrim = searchVal.trim();
    const materialsTypeTable = typeData.materialsTypeTable;
    if (!searchValTrim) {
      return materialsTypeTable;
    }
    return materialsFilterByName(materialsTypeTable, searchValTrim);
  }, [typeData, searchVal]);

  const _onSelect = (keys, info) => {
    if (info && info.node) {
      onSelect && onSelect(info.node);
      setSelectInfo(info.node);
    }
    if (keys) {
      setSelectKeys(keys);
    }
  };

  const addCallback = () => {
    onAdd && onAdd();
    if (!controlled) {
      console.log(refresh, 'refresh');
      refresh();
    }
  };

  // 树title
  const TitleRender = (props: IMaterialsTypeRow) => {
    return (
      <TitleRenderWrap>
        <div className={'titleName'}>{props.name}</div>

        <EditOutlined
          style={titleIconStyle}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddCategory({
              id: props.id,
              callback: addCallback,
            });
          }}
        />
        <PlusCircleOutlined
          style={titleIconStyle}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddCategory({
              parentId: props.id,
              callback: addCallback,
            });
          }}
        />
        <DeleteOutlined
          style={titleIconStyle}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete({
              id: props.id,
              callback: () => {
                if (selectKeys.includes(props.id)) {
                  _onSelect([props.parentId || '0'], {
                    node: {
                      id: props.parentId || '0',
                    },
                  });
                }

                setTimeout(() => {
                  addCallback();
                }, 0);
              },
            });
          }}
        />
      </TitleRenderWrap>
    );
  };

  return (
    <TreeContainer>
      <Input.Search
        placeholder="请输入关键字"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <CategoryWrap className={`${selectKeys.find((k) => k === '0') ? 'active' : ''}`}>
        <CategoryText
          onClick={() =>
            _onSelect(['0'], {
              id: '0',
              parentId: '00',
              name: categoryText,
              node: {
                id: '0',
                parentId: '00',
                name: categoryText,
                materialsCount: treeDataMemo.length,
                remark: '',
              },
            })
          }
        >
          {categoryText}
        </CategoryText>
        <CategoryIconWrap
          onClick={() => {
            handleAddCategory({
              parentId: '0',
              callback: addCallback,
            });
          }}
        >
          <PlusCircleOutlined style={titleIconStyle} />
        </CategoryIconWrap>
      </CategoryWrap>
      <TreeWrap>
        <Tree
          blockNode
          selectedKeys={selectKeys}
          autoExpandParent
          onSelect={_onSelect}
          treeData={treeDataMemo as any[]}
          titleRender={TitleRender}
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
