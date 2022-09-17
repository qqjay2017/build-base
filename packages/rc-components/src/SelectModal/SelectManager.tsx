import React, { useState } from 'react';

import { showModal, ShowModalCompProps } from '../showModal';
import {
  BaseModel,
  BaseSingleSelectModal,
  SelectModalPromise,
  SelectProTableProps,
  ShowModalCompCustomProps,
  ShowModalFnPropsBase,
} from './base';

import { nameColumn, nameSearchColumn } from '../utils/columnConfig';

import styled from 'styled-components';
import { DepartmentTree } from '../DepartmentTree';

const DepartmentTreeWrap = styled.div`
  width: 200px;
  min-width: 200px;
  height: 457px;
  overflow: auto;
`;

const defaultColumns: SelectProTableProps<any>['columns'] = [
  {
    ...nameSearchColumn,
    title: '经办人名称',
    hideInTable: true,
    dataIndex: 'userName',
  },
  {
    title: '姓名',

    ...nameColumn,
  },

  {
    title: '工号',
    search: false,
    dataIndex: 'jobNumber',
  },
  {
    title: '联系方式',
    search: false,
    dataIndex: 'mobile',
  },
  {
    title: '部门',
    search: false,
    dataIndex: 'departmentName',
  },
];

function SelectManageModal<D = any>(props: ShowModalCompProps<ShowModalCompCustomProps<D>>) {
  const { initSearch, headers, requestInfo = {}, alertProps, ...rest } = props;
  const [params, setParams] = useState({
    id: '',
  });

  const onSelect = (node) => {
    if (node.id) {
      setParams({
        id: node.id,
      });
    }
  };

  return (
    <BaseSingleSelectModal<BaseModel>
      defaultColumns={defaultColumns}
      alertProps={{
        message: '最多选择10人',
        type: 'info',
        ...alertProps,
      }}
      labelPath="name"
      initSearch={{
        // companyId: getCompanyId(),
        workFlow: true,

        ...initSearch,
      }}
      requestInfo={{
        dataPath: 'rows',
        totalPath: 'total',
        method: 'post',
        url: '/api/uims/v1/org/department-employee/page',
        headers: {
          'depend-method': 'GET',
          'depend-uri': '/api/cms/v1/help/index/1',
          ...headers,
        },
        ...requestInfo,
      }}
      ready={!!params.id}
      tableProps={{
        params: params,
      }}
      {...rest}
    >
      <DepartmentTreeWrap>
        <DepartmentTree onSelect={onSelect} headers={headers} />
      </DepartmentTreeWrap>
    </BaseSingleSelectModal>
  );
}

export interface IManageRow extends Record<string, any> {
  id: string;
  name: string;
  bucket: string;
  objectName: string;
  jobNumber: string;
  mobile: string;
  email: string;
  status: number;
  isAuth: string;
  companyId: string;
  companyName: string;
  antCompanyDid: string;
  departmentId: string;
  departmentName: string;
  userId: string;
  antUserDid: string;
  loginName: string;
  sealValid: boolean;
  isSupervisor: string;
}
export type ISelectManageProps = ShowModalFnPropsBase<{
  userName?: string;
  companyId?: string;
}>;

export function selectManage({ modalProps = {}, ...rest }: ISelectManageProps = {}): Promise<
  SelectModalPromise<IManageRow, any, true>
> {
  return showModal(
    SelectManageModal,
    {
      ...rest,
    },
    {
      title: '选择经办人',
      width: '70%',

      ...modalProps,
    },
  );
}
