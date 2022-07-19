import { tableParams2Api } from './utils';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ProTableProps } from '@ant-design/pro-table';
import { myRequest } from '@core/service-api';
import React, { useMemo, useRef } from 'react';

import { ProFormInstance } from '@ant-design/pro-components';
import get from 'lodash/get';
export interface RequestInfo {
  url?: string;
  headers?: {
    'depend-uri': string;
    'depend-method': 'POST' | 'GET';
  };
  method?: 'post' | 'get' | 'delete' | 'put';
  dataPath?: string;
  totalPath?: string;
}

export function useDefaultProConfig(
  requestInfo?: RequestInfo,
  initSearch: Record<string, any> = {},
  defaultPageSize: number = 10,
) {
  const initialValues = useRef({
    ...initSearch,
  });

  const {
    url,
    headers,
    method = 'post',
    dataPath = 'rows',
    totalPath = 'total',
  } = requestInfo || {};
  const formRef = useRef<ProFormInstance>();

  const setTableSearchProps = useMemo(() => {
    return (doms: React.ReactNode[]) => {
      return doms.map((dom, index) => {
        const isSearch = index === 1;
        return React.cloneElement(dom as any, {
          type: isSearch ? 'primary' : 'default',
          ghost: !!isSearch,

          icon: isSearch ? <SearchOutlined /> : <ReloadOutlined />,
        });
      });
    };
  }, []);
  const searchConfig = useMemo<ProTableProps<any, any>['search']>(() => {
    return {
      defaultCollapsed: false,
      labelWidth: 'auto',

      span: {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 12,
      },
      optionRender: (a, b, dom) => {
        return [...setTableSearchProps(dom)];
      },
    };
  }, [setTableSearchProps]);
  const config = useMemo<ProTableProps<any, any>>(() => {
    return {
      toolBarRender: () => [],
      options: false,
      rowKey: 'id',
      formRef: formRef,

      pagination: {
        pageSize: defaultPageSize || 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total: number, range: number[]) => {
          return `共 ${total} 条记录 `;
        },
        current: 1,
        size: 'default',
      },
      // dateFormatter: 'string',
      tableAlertRender: false,
      search: searchConfig,
      form: {
        initialValues: initialValues.current,
      },
      request: url
        ? async (params) => {
            return myRequest(url, {
              method: method,
              data: {
                ...tableParams2Api({
                  // ...initSearch,
                  ...params,
                }),
              },
            })
              .then((res) => {
                return Promise.resolve({
                  success: true,
                  data: get(res, dataPath, []),
                  total: get(res, totalPath, 0),
                });
              })
              .catch(() => {
                return Promise.resolve({
                  success: false,
                  data: [],
                  total: 0,
                });
              });
          }
        : undefined,
    };
  }, [searchConfig, method]);

  return {
    tableCommonConfig: config,
    tableCommonSearchConfig: searchConfig,
    formRef,
  };
}
