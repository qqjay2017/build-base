import { Alert, AlertProps, Button, Modal, ModalProps } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { ShowModalCompProps } from '../showModal';
import ProTable, { ActionType, ProTableProps } from '@ant-design/pro-table';

import styled from 'styled-components';
import { useDefaultProConfig, RequestInfo } from '../hooks/useDefaultProConfig';
import { get } from 'lodash-es';
import { ProFormInstance } from '@ant-design/pro-components';
import { IDependHeader } from '@core/service-api';
// TODO
// import { Table as ProTable } from '@core/free-antd';

export type SelectProTableProps<D> = ProTableProps<D, any>;

export type BaseModel = {
  id?: string;
};

export interface IBaseSingleSelectModalProps<D> {
  columns?: SelectProTableProps<D>['columns'];
  defaultColumns?: SelectProTableProps<D>['columns'];
  defaultValue?: D | null;
  requestInfo?: RequestInfo;
  multiple?: boolean;
  initSearch?: Record<string, any>;
  defaultPageSize?: number;
  rowKey?: string;
  labelPath?: string;
  tableProps?: ProTableProps<any, any, any>;
  alertProps?: AlertProps;
}

const ModalStyle = styled(Modal)`
  .ant-modal-footer {
    display: flex;
  }
`;

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
const AlertWrap = styled.div`
  padding: 0 24px;
  padding-top: 16px;
`;
function formatDefaultValue(defaultValue, multiple,rowKey='id') {
  if (defaultValue === null || defaultValue === undefined || ( !Array.isArray(defaultValue) && !get(defaultValue, rowKey, ''))) {
    return multiple ? [] : null;
  }
  // 对象转数组
  if (!Array.isArray(defaultValue) && multiple) {
    return [defaultValue];
  }
  return defaultValue;
}
export type IsMultipleType = true | false;
export interface SelectModalPromise<R = any, F = any, isMultiple extends IsMultipleType = false> {
  selectedRow: isMultiple extends true ? R[] : R | null;
  formData: F;
}

export function BaseSingleSelectModal<D extends BaseModel>(
  props: ShowModalCompProps<IBaseSingleSelectModalProps<D>>,
) {
  const {
    alertProps,
    handles,
    modalProps,
    columns: _columns = [],
    multiple = false,
    requestInfo,
    initSearch,
    defaultPageSize = 5,
    labelPath = 'name',
    tableProps = {},
    defaultColumns = [],
  } = props;
  const rowKey: string = (tableProps.rowKey || 'id') as unknown as string;
  const [selectedRow, setSelectedRow] = useState<D & D[]>(
    formatDefaultValue(props.defaultValue, multiple,rowKey),
  );

  const { tableCommonConfig } = useDefaultProConfig(requestInfo, initSearch, defaultPageSize);
  const formRef = tableProps.formRef ? tableProps.formRef : useRef<ProFormInstance>();
 
  const columns = useMemo(() => {
    if (!_columns || !_columns.length) {
      return defaultColumns;
    }
    if (!defaultColumns || !defaultColumns.length) {
      return _columns || [];
    }
    return defaultColumns.map((dc) => {
      const find = _columns.find(
        (c) => (c.key && c.key === dc.key) || c.dataIndex === dc.dataIndex,
      );
      return {
        ...dc,
        ...(find || {}),
      };
    });
  }, [_columns, defaultColumns]);
  const getResolveData = () => {
    const resolveData = {
      selectedRow,
      formData: formRef.current?.getFieldsValue() || {},
    };
    return resolveData;
  };
  const onOk = () => {
    handles.resolve(getResolveData());
    handles.remove();
  };

  const onCancel = () => {
    handles.reject(getResolveData());
    handles.remove();
  };

  const onSelect = (record) => {
    if (record) {
      if (multiple) {
        setSelectedRow((row) => (row || []).concat(record) as any);
      } else {
        setSelectedRow(record);
      }
    }
  };
  const handleRemoveSelect = (record?: any) => {
    if (!multiple) {
      // 单选,取消选择,直接null
      setSelectedRow(null);
    } else {
      // 多选,做一个新数组
    

      setSelectedRow((row)=>row.filter((r) => {
        return r && r[rowKey] && r[rowKey] != record[rowKey];
      }) as any);
    }
  };

  const onRowClick = (record) => {
    
    if (record) {
      if (!multiple) {
        // 单选直接null
        if (selectedRow && selectedRow[rowKey] === record[rowKey]) {
          handleRemoveSelect();
          return;
        }
      } else {
        if (selectedRow.find((s) => s &&  s[rowKey] == record[rowKey])) {
          handleRemoveSelect(record);
          return;
        }
      }

      onSelect(record);
    }
  };
  const onSelectAll = (changeRows:any[])=>{
    if(changeRows && changeRows.length ){
      setSelectedRow(row=>(row.concat(changeRows) )as any);
    }
    
  }

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
        selectedRow && (!multiple || selectedRow.length) ? (
          <SelectedRowWrap className="selectedRowWrap">
            <SelectedRowLabel className="selectedRowLabel">已选：</SelectedRowLabel>
            <SelectedRowName className="selectedRowName">
              {!multiple ? get(selectedRow, labelPath, '') : selectedRow.length + '项'}
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
      {alertProps ? (
        <AlertWrap>
          <Alert message="Warning" type="info" showIcon {...alertProps} />
        </AlertWrap>
      ) : null}

      <ProTableStyle
        {...tableCommonConfig}
        rowKey={rowKey}
        rowSelection={{
          type: multiple ? 'checkbox' : 'radio',
          

          selectedRowKeys: multiple
            ? selectedRow.map((s) =>s&& s[rowKey])
            : selectedRow
            ? [selectedRow[rowKey]]
            : [],
            onSelectAll:(selected,selectedRows,changeRows)=>{
              if(selected){
                  onSelectAll(changeRows)
              }else if(changeRows && changeRows.length){
                
                changeRows.forEach(c=>{
                  handleRemoveSelect(c);
                })
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
    </ModalStyle>
  );
}

export interface ShowModalCompCustomProps<D, S = Record<string, any>> extends Record<string, any> {
  defaultValue?: D;
  initSearch?: S;
  headers?: any;
  columns?: SelectProTableProps<any>['columns'];
  multiple?: boolean;
  alertProps?: AlertProps;
}

export type ShowModalFnPropsBase<S extends Record<string, any>> = ShowModalCompCustomProps<
  Partial<BaseModel>,
  S
> & {
  modalProps?: ModalProps;
};
