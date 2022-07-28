---
title: base-可选table 
group:
  title: 弹窗系列
---

## 将弹窗内部组件也暴露出来,可能 ts 类型不是很完善

### selectTable

- 需要配合 useTableSelect 使用

```jsx
import React, { useState, useRef } from 'react';
import { SelectTable, useTableSelect } from '@core/rc-components';

export default () => {
  const rowKey = 'id';
  const multiple = false;
  const defaultValue = null;
  const { selectedRow, ...rest } = useTableSelect({
    rowKey,
    multiple,
    defaultValue: defaultValue,
  });

  const columns = [
    {
      title: '简称',
      dataIndex: 'alias',

      search: false,
    },
    {
          title: '名称啊',
      dataIndex: 'name',
    },
  ];

  const requestInfo = {
    dataPath: 'rows',
    totalPath: 'total',
    method: 'post',
    url: '/api/scm/v1/supplier/table',
    headers: {
      // 'depend-method': 'POST',
      //   'depend-uri': '/api/purchase-system/v1/purchase',
    },
  };

  const initSearch = {};
  const defaultPageSize = 5;

  return (
    <div>
      <h6>{JSON.stringify(selectedRow)}</h6>
      <SelectTable
        columns={columns}
        requestInfo={requestInfo}
        initSearch={initSearch}
        defaultPageSize={defaultPageSize}
        rowKey={rowKey}
        multiple={multiple}
        selectedRow={selectedRow}
        {...rest}
      />
    </div>
  );
};
```



### selectTable多选

- multiple = true 时候是多选

```jsx
import React, { useState, useRef } from 'react';
import { SelectTable, useTableSelect } from '@core/rc-components';

export default () => {

  const multiple = true;
  const defaultValue = [];
  const { selectedRow, ...rest } = useTableSelect({

    multiple,
    defaultValue: defaultValue,
  });

  const columns = [
    {
      title: '简称',
      dataIndex: 'alias',

      search: false,
    },
    {
         title: '名称啊',
      dataIndex: 'name',
    },
  ];

  const requestInfo = {
    dataPath: 'rows',
    totalPath: 'total',
    method: 'post',
    url: '/api/scm/v1/supplier/table',
    headers: {
      // 'depend-method': 'POST',
      //   'depend-uri': '/api/purchase-system/v1/purchase',
    },
  };

  const initSearch = {};
  const defaultPageSize = 5;

  return (
    <div>
      <h6>{JSON.stringify(selectedRow)}</h6>
      <SelectTable
        columns={columns}
        requestInfo={requestInfo}
        initSearch={initSearch}
        defaultPageSize={defaultPageSize}

        multiple={multiple}
        selectedRow={selectedRow}
        {...rest}
      />
    </div>
  );
};
```

### useTableSelect API

<API src="./useTableSelect.ts"></API>

### SelectTable API

<API src="./SelectTable.tsx"></API>
