import { Modal } from 'antd';
import React, { useState } from 'react';
import { ShowModalCompProps } from '../showModal';
import ProTable, { ActionType, ProTableProps } from '@ant-design/pro-table';
import './base.less';
import { useDefaultProConfig, RequestInfo } from '../hooks/useDefaultProConfig';
// TODO
// import { Table as ProTable } from '@core/free-antd';

export type SelectProTableProps<D> = ProTableProps<D, any>;

export interface BaseModel {
  id?: string;
}

export interface IBaseSingleSelectModalProps<D> {
  columns?: SelectProTableProps<D>['columns'];
  defaultValue?: D;
  requestInfo?: RequestInfo;

  initSearch?: Record<string, any>;
  defaultPageSize?: number;
}

export function BaseSingleSelectModal<D extends BaseModel>(
  props: ShowModalCompProps<IBaseSingleSelectModalProps<D>>,
) {
  const { handles, modalProps, columns, requestInfo, initSearch, defaultPageSize = 5 } = props;
  const [selectedRow, setSelectedRow] = useState<D[]>(
    props.defaultValue ? [props.defaultValue] : [],
  );
  const { tableCommonConfig } = useDefaultProConfig(requestInfo, initSearch, defaultPageSize);

  const onOk = () => {
    handles.resolve(selectedRow[0]);
    handles.remove();
  };

  const onCancel = () => {
    handles.reject(selectedRow[0]);
    handles.remove();
  };

  const onRowClick = (record) => {
    record && setSelectedRow([record]);
  };

  return (
    <Modal {...modalProps} width={864} onOk={onOk} bodyStyle={{ padding: '0' }} onCancel={onCancel}>
      <ProTable
        {...tableCommonConfig}
        rowClassName={(record) => {
          if (!selectedRow || !selectedRow.length) {
            return '';
          }
          if (selectedRow[0].id == record.id) {
            return 'selected';
          }
        }}
        onRow={(record) => {
          return {
            onClick: (event) => onRowClick(record), // 点击行
          };
        }}
        search={{
          optionRender: () => [],
          span: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            xxl: 12,
          },
          labelWidth: 0,
        }}
        columns={columns}
      ></ProTable>
    </Modal>
  );
}
