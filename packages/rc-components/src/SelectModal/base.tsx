import { Alert, AlertProps, Button, Modal, ModalProps } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { ShowModalCompProps } from '../showModal';
import { ProTableProps } from '@ant-design/pro-table';

import styled from 'styled-components';
import { RequestInfo } from '../hooks/useDefaultProConfig';
import { get } from 'lodash-es';
import { ProFormInstance } from '@ant-design/pro-components';

import { useTableSelect } from './useTableSelect';
import { SelectTable } from './SelectTable';

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
  /**
   * 是否渲染table
   */
  ready?: boolean;
  beforeOk?: (values: any) => Promise<any>;
}

const ModalStyle = styled(Modal)`
  .ant-modal-footer {
    display: flex;
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

const SelectTableWrap = styled.div`
  display: flex;
`;
const TableWrap = styled.div`
  flex: 1;
`;

export type IsMultipleType = true | false;
export interface SelectModalPromise<R = any, F = any, isMultiple extends IsMultipleType = false> {
  selectedRow: isMultiple extends true ? R[] : R | null;
  formData: F;
}

export function BaseSingleSelectModal<D extends BaseModel>(
  props: ShowModalCompProps<IBaseSingleSelectModalProps<D>>,
) {
  const {
    children,
    alertProps,
    handles,
    modalProps,
    columns: _columns = [],
    multiple = false,
    requestInfo,
    initSearch,
    ready = true,
    defaultPageSize = 5,
    labelPath = 'name',
    tableProps = {},
    beforeOk = () => Promise.resolve(),
    defaultColumns = [],
  } = props;
  const rowKey: string = (tableProps.rowKey || 'id') as unknown as string;

  const { selectedRow, ...rest } = useTableSelect({
    rowKey,
    multiple,
    defaultValue: props.defaultValue,
  });

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
    const resolveData = getResolveData();
    beforeOk(resolveData).then(() => {
      handles.resolve(resolveData);
      handles.remove();
    });
  };

  const onCancel = () => {
    handles.reject(getResolveData());
    handles.remove();
  };

  return (
    <ModalStyle
      okText="确认"
      cancelText="取消"
      maskClosable={false}
      width={864}
      onOk={onOk}
      onCancel={onCancel}
      bodyStyle={{ padding: '0' }}
      className="baseSingleSelectModal"
      footer={[
        selectedRow && (!multiple || selectedRow.length) ? (
          <SelectedRowWrap key={'SelectedRowWrap1'} className="selectedRowWrap">
            <SelectedRowLabel className="selectedRowLabel">已选：</SelectedRowLabel>
            <SelectedRowName className="selectedRowName">
              {!multiple ? get(selectedRow, labelPath, '') : selectedRow.length + '项'}
            </SelectedRowName>
          </SelectedRowWrap>
        ) : (
          <SelectedRowWrap key={'SelectedRowWrap2'} className="selectedRowWrap"></SelectedRowWrap>
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

      <SelectTableWrap>
        {children}
        <TableWrap>
          {ready && (
            <SelectTable
              columns={columns}
              requestInfo={requestInfo}
              initSearch={initSearch}
              defaultPageSize={defaultPageSize}
              rowKey={rowKey}
              multiple={multiple}
              selectedRow={selectedRow}
              formRef={formRef}
              tableProps={tableProps}
              {...rest}
            />
          )}
        </TableWrap>
      </SelectTableWrap>
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
  requestInfo?: RequestInfo;
  /**
   * 确认前的校验,如果返回Promise.reject()  ,可以阻止ok按钮的点击事件
   */
  beforeOk?: (args: any) => Promise<void>;
}

export type ShowModalFnPropsBase<S extends Record<string, any>> = ShowModalCompCustomProps<
  Partial<BaseModel>,
  S
> & {
  modalProps?: ModalProps;
};
