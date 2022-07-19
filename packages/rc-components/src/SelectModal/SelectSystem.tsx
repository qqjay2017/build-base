import { findConstantLabel, ossDevSystemType } from '@core/shared';
import React from 'react';
import { ColumnRenderFormItem } from '../ColumnRenderFormItem';
import { showModal, ShowModalCompProps } from '../showModal';
import { BaseModel, BaseSingleSelectModal, SelectProTableProps } from './base';

const columns: SelectProTableProps<any>['columns'] = [
  {
    title: '子系统名称',
    dataIndex: 'name',

    renderFormItem: ColumnRenderFormItem,
  },
  {
    title: '类型',
    dataIndex: 'portalType',
    search: false,
    render: (_, entity) => findConstantLabel(entity.portalType, ossDevSystemType),
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    search: false,

    width: 100,
  },
];

function SelectSystemModal<D = any>(
  props: ShowModalCompProps<{
    defaultValue?: D;
    headers?: any;
  }>,
) {
  const { modalProps, handles, headers, defaultValue } = props;
  return (
    <BaseSingleSelectModal<BaseModel>
      defaultValue={defaultValue}
      columns={columns}
      modalProps={modalProps}
      requestInfo={{
        url: '/api/uims/v1/oss/application/system/page',
        headers: headers || {
          'depend-method': 'POST',
          'depend-uri': '/api/cms/v1/system/article/table',
        },
      }}
      handles={handles}
    />
  );
}

export function selectSystem(defaultValue?: BaseModel) {
  return showModal(
    SelectSystemModal,
    {
      defaultValue: defaultValue,
    },
    {
      title: '选择开发子系统',
    },
  );
}
