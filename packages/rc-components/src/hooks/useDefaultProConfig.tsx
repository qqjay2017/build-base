import { tableParams2Api } from './utils';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import type { ActionType, ProTableProps } from '@ant-design/pro-table';
import { myRequest } from '@core/service-api';
import React, { MutableRefObject, useContext, useMemo, useRef, useState } from 'react';

import { ProFormInstance } from '@ant-design/pro-components';
import get from 'lodash/get';
import { onError } from '../utils/onError';
import { ConfigContext } from '../ConfigProvider/context';
const defaultPageSizeOptions = ['10', '20', '50', '100'];
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
): {
  tableCommonConfig: any;
  tableCommonSearchConfig: any;
  formRef: MutableRefObject<ProFormInstance<any>>;
  actionRef: MutableRefObject<ActionType>;
  tableParam: Record<string, any>;
} {
  const initialValues = useRef({
    ...(initSearch || {}),
  });
  const [tableParam, setTableParam] = useState<Record<string, any>>({});

  const configContext = useContext(ConfigContext);

  const {
    url,
    headers = {},
    method = 'post',
    dataPath = 'rows',
    totalPath = 'total',
  } = requestInfo || {};

  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

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
      actionRef: actionRef,
      formRef: formRef,
      onSubmit: (p) => {
        setTableParam(p);
      },

      pagination: {
        showLessItems: true,
        pageSize: defaultPageSize || 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total: number, range: number[]) => {
          return `共 ${total} 条记录 `;
        },
        // current: 1,
        size: 'default',
        pageSizeOptions: defaultPageSizeOptions.includes(String(defaultPageSize))
          ? defaultPageSizeOptions
          : defaultPageSizeOptions
              .concat([String(defaultPageSize)])
              .sort((a, b) => Number(a) - Number(b)),
      },
      // dateFormatter: 'string',
      tableAlertRender: false,
      search: searchConfig,
      form: {
        initialValues: initialValues.current,
      },
      rowClassName: (record, index) => {
        return index % 2 === 1 ? 'odd' : 'even';
      },
      request: url
        ? async (params) => {
            return myRequest(url, {
              API_URL: configContext.API_URL,
              method: method,
              headers: headers || {},
              data: {
                ...tableParams2Api({
                  ...initSearch,
                  ...params,
                }),
              },
              onError: onError,
            })
              .then((res) => {
                const _data = get(res, dataPath, []);
                const _total = get(res, totalPath, _data.length);

                return Promise.resolve({
                  success: true,
                  data: _data,
                  total: _total,
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
    actionRef,
    tableParam,
  };
}
