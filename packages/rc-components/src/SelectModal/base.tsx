import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { ShowModalCompProps } from '../showModal';
import ProTable, { ActionType, ProTableProps } from '@ant-design/pro-table';

import styled from 'styled-components';
import { useDefaultProConfig, RequestInfo } from '../hooks/useDefaultProConfig';
import { get } from 'lodash-es';
// TODO
// import { Table as ProTable } from '@core/free-antd';

export type SelectProTableProps<D> = ProTableProps<D, any>;

export type BaseModel = {
  id?: string;
};

export interface IBaseSingleSelectModalProps<D> {
  columns?: SelectProTableProps<D>['columns'];
  defaultValue?: D | null;
  requestInfo?: RequestInfo;

  initSearch?: Record<string, any>;
  defaultPageSize?: number;
  labelPath?: string;
  tableProps?:ProTableProps<any,any,any>
}

const ModalStyle = styled(Modal)`
  .ant-modal-footer {
    display: flex;
  }
`;

const ProTableStyle = styled(ProTable)`
  .ant-pro-table .ant-pro-table-search {
    margin-bottom: 0;
  }
  .ant-pro-card-body {
    padding-bottom: 0;
  }
  .ant-table-row.odd {
    background-color: #fafafa;
  }
  .ant-table-row.even {
    background-color: #fff;
  }
  .ant-pagination-total-text {
    flex: 1;
  }
  .ant-pro-table .ant-pro-table-search {
    margin-bottom: 0;
  }
  .ant-table-thead {
    .ant-table-cell {
      &::before {
        display: none;
      }
    }
  }
`;

const SelectedRowWrap = styled.div`
  flex: 1;
  line-height: 32px;
  font-size: 14px;
  text-align: left;
`;

const SelectedRowLabel = styled.span`
  font-weight: 400;
  color: #595959;
`;

const SelectedRowName = styled.span`
  font-weight: 400;
  color: #1677ff;
`;

export function BaseSingleSelectModal<D extends BaseModel>(
  props: ShowModalCompProps<IBaseSingleSelectModalProps<D>>,
) {
  const {
    handles,
    modalProps,
    columns,
    requestInfo,
    initSearch,
    defaultPageSize = 5,
    labelPath = 'name',
    tableProps={}
  } = props;
  const [selectedRow, setSelectedRow] = useState<D>(props.defaultValue||null);
  const { tableCommonConfig } = useDefaultProConfig(requestInfo, initSearch, defaultPageSize);

  const onOk = () => {
    handles.resolve(selectedRow);
    handles.remove();
  };

  const onCancel = () => {
    handles.reject(selectedRow);
    handles.remove();
  };

  const onRowClick = (record) => {
    record && setSelectedRow(record);
  };

  return (
    <ModalStyle
      okText="确认"
      cancelText="取消"
      width={864}
      onOk={onOk}
      onCancel={onCancel}
      bodyStyle={{ padding: '0' }}
      className="baseSingleSelectModal"
      footer={[
        selectedRow ? (
          <SelectedRowWrap className="selectedRowWrap">
            <SelectedRowLabel className="selectedRowLabel">已选：</SelectedRowLabel>
            <SelectedRowName className="selectedRowName">
              {get(selectedRow, labelPath, '')}
            </SelectedRowName>
          </SelectedRowWrap>
        ) : (
          <SelectedRowWrap className="selectedRowWrap"></SelectedRowWrap>
        ),
        <Button key="cancel_btn" onClick={() => onCancel()}>
          取消
        </Button>,
        <Button key="ok_btn" onClick={() => onOk()} type="primary">
          确认
        </Button>,
      ]}
      {...modalProps}
    >
      <ProTableStyle
        {...tableCommonConfig}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectedRow ? [selectedRow.id] : [],
          onChange: (selectedRowKeys, selectedRows) => {
            onRowClick(selectedRows[0]);
          },
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
        {...tableProps}
      ></ProTableStyle>
    </ModalStyle>
  );
}
