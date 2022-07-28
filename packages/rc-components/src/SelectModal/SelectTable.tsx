import ProTable, { ProTableProps } from '@ant-design/pro-table';
import React from 'react';
import styled from 'styled-components';
import { RequestInfo, useDefaultProConfig } from '../hooks';

const ProTableStyle = styled(ProTable)`
  .ant-pro-table-search {
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

export interface ISelectTableProps {
  requestInfo?: RequestInfo;
  initSearch?: Record<string,any>;
  defaultPageSize?: number;
  rowKey?: string;
  multiple?: boolean;

  selectedRow: any;
  setSelectedRow: (row:any)=>void;
  handleRemoveSelect: any;
  onSelect: Function;
  onRowClick: Function;
  onSelectAll: Function;
  columns?: any[];
  formRef?: any;
  tableProps?: ProTableProps<any,any>;
}
export function SelectTable({
  requestInfo,
  initSearch = {},
  defaultPageSize = 5,
  rowKey = 'id',
  multiple = false,
  selectedRow,
  setSelectedRow,
  handleRemoveSelect,
  onSelect,
  onRowClick,
  onSelectAll,
  columns,
  formRef,
  tableProps = {},
}: ISelectTableProps) {
  const { tableCommonConfig } = useDefaultProConfig(requestInfo, initSearch, defaultPageSize);
  return (
    <ProTableStyle
      {...tableCommonConfig}
      rowKey={rowKey}
      rowSelection={{
        type: multiple ? 'checkbox' : 'radio',

        selectedRowKeys: multiple
          ? selectedRow.map((s) => s && s[rowKey])
          : selectedRow
          ? [selectedRow[rowKey]]
          : [],
        onSelectAll: (selected, selectedRows, changeRows) => {
          if (selected) {
            onSelectAll(changeRows);
          } else if (changeRows && changeRows.length) {
            changeRows.forEach((c) => {
              handleRemoveSelect(c);
            });
          }
        },
        onSelect: (record, selected, selectedRows) => {
          if (selected) {
            onSelect(record);
          } else {
            handleRemoveSelect(record);
          }

          //
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
      formRef={formRef}
      {...tableProps}
    ></ProTableStyle>
  );
}
