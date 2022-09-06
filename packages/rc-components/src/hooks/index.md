---
title: hook
group:
  title: hooks
---

## 基本使用

```jsx
import React from 'react';
import { useToolbarMenuItems } from '@core/rc-components';
import { orderStatusTypeEnum } from '@core/shared';
import { ProTable } from '@ant-design/pro-components';

export default () => {
  const { toolbarMenu } = useToolbarMenuItems({
    apiData: [
      { approveState: -1, orderStatus: -1, num: 31 },
      { num: 2 },
      { orderStatus: 1, num: 14 },

      { orderStatus: 2, num: 4 },
      //   { orderStatus: 4, num: 14 },
      { orderStatus: 54, num: 14 },
      { orderStatus: 63, num: 14 },
    ],
    statusList: [orderStatusTypeEnum.all, 1, 2, 4, 54, 63],
    onChange: (key) => {},
  });
  console.log(toolbarMenu, 'toolbarMenu');
  return (
    <div>
      <ProTable toolbar={toolbarMenu}></ProTable>
    </div>
  );
};
```
