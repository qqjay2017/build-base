import { ProColumns } from '@ant-design/pro-table';
import {
  dateFormat,
  findConstantLabel,
  formatOrderStatus,
  getBadgeStatus,
  ossDevSystemType,
} from '@core/shared';
import { Badge } from 'antd';
import React from 'react';
import { ColumnRenderFormItem } from '../ColumnRenderFormItem';

type ColumnType = ProColumns<any, any>;

export const renderFormItemColumnBase = {
  renderFormItem: ColumnRenderFormItem,
};

export const noLabelColumn = {
  formItemProps: {
    label: '',
  },
};
export const commonColumnConfig = {
  ellipsis: true,
};

export const filterStrColumn: ColumnType = {
  ...noLabelColumn,
  title: '关键字',
  hideInTable: true,
  dataIndex: 'filterStr',

  renderFormItem: ColumnRenderFormItem,
};
export const contractCodeColumn: ColumnType = {
  title: '合同编号',
  dataIndex: 'code',

  search: false,
  ...commonColumnConfig,
};
export const projectNameColumn: ColumnType = {
  title: '项目名称',
  dataIndex: 'projectName',
  search: false,
  ...commonColumnConfig,
};
export const projectNameSearchColumn: ColumnType = {
  ...noLabelColumn,
  hideInTable: true,
  title: '项目名称',
  dataIndex: 'projectName',
  renderFormItem: ColumnRenderFormItem,
};

export const partybColumn: ColumnType = {
  title: '供应商',
  dataIndex: 'partyb',
  search: false,
  ...commonColumnConfig,
};
export const signDateColumn: ColumnType = {
  title: '签订日期',
  dataIndex: 'signDate',
  search: false,

  render: (_) => {
    return dateFormat(_ as string);
  },
  ...commonColumnConfig,
};

export const nameColumn: ColumnType = {
  dataIndex: 'name',
  search: false,
  ...commonColumnConfig,
};

export const applicationSystemNameColumn: ColumnType = {
  ...noLabelColumn,
  title: '子系统名称',
  dataIndex: 'name',

  renderFormItem: ColumnRenderFormItem,
  ...commonColumnConfig,
};

export const aliasColumn: ColumnType = {
  title: '简称',
  dataIndex: 'alias',

  search: false,
  ...commonColumnConfig,
};

export const portalTypeColumn: ColumnType = {
  title: '类型',
  dataIndex: 'portalType',
  search: false,
  render: (_, entity) => findConstantLabel(entity.portalType, ossDevSystemType),
  ...commonColumnConfig,
};

export const orderNumColumn: ColumnType = {
  title: '排序',
  dataIndex: 'orderNum',
  search: false,

  width: 100,
  ...commonColumnConfig,
};

export const projectKeywordColumn: ColumnType = {
  ...noLabelColumn,
  title: '项目名称、编号',
  dataIndex: 'keyword',
  hideInTable: true,

  renderFormItem: ColumnRenderFormItem,
};

export const projectCodeColumn: ColumnType = {
  title: '项目编号',
  dataIndex: 'code',

  search: false,
  ...commonColumnConfig,
};
export const createdDatetimeColumn: ColumnType = {
  title: '项目建立时间',
  dataIndex: 'createdDatetime',

  search: false,
  render: (_) => dateFormat(_ as string),
  ...commonColumnConfig,
};

export const keyWorldColumn: ColumnType = {
  ...noLabelColumn,
  title: '名称/简称',
  dataIndex: 'keyWorld',
  hideInTable: true,
  renderFormItem: ColumnRenderFormItem,
};

export const contactNameColumn: ColumnType = {
  title: '联系人',
  dataIndex: 'contactName',

  search: false,
  ...commonColumnConfig,
};
export const contactPhoneColumn: ColumnType = {
  title: '联系方式',
  dataIndex: 'contactPhone',

  search: false,
  ...commonColumnConfig,
};

export const nameSearchColumn: ColumnType = {
  ...noLabelColumn,
  title: '名称/简称',
  dataIndex: 'name',
  // hideInTable: true,
  renderFormItem: ColumnRenderFormItem,
};

export const specificationsColumn: ColumnType = {
  title: '型号规格',
  dataIndex: 'specifications',

  search: false,
  ...commonColumnConfig,
};
export const unitColumn: ColumnType = {
  title: '计量单位',
  dataIndex: 'unit',

  search: false,
  ...commonColumnConfig,
};

export const materialCodeColumn: ColumnType = {
  title: '编码',
  dataIndex: 'code',

  search: false,
  ...commonColumnConfig,
};
export const brandDescColumn: ColumnType = {
  title: '品牌',
  dataIndex: 'brandDesc',

  search: false,
  ...commonColumnConfig,
};

export const orderStatusColumn: ColumnType = {
  title: '单据状态',
  dataIndex: 'orderStatus',
  search: false,
  render: (_, record) => {
    return (
      <Badge
        status={getBadgeStatus(record.orderStatus)}
        text={formatOrderStatus(record.orderStatus)}
      />
    );
  },
};
