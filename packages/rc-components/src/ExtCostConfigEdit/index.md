---
title: 展期天数编辑
group:
  title: 业务组件
---

```jsx
import React, { useState } from 'react';
import { ExtCostConfigEdit, getExtCostConfigInitDataSource } from '@core/rc-components';

export default () => {
  const [isStagePrice, setIsStagePrice] = useState(true);
  const [dataSource, setDataSource] = useState(getExtCostConfigInitDataSource(isStagePrice));
  return (
    <ExtCostConfigEdit
      isStagePrice={isStagePrice}
      dataSource={dataSource}
      setDataSource={setDataSource}
    />
  );
};
```
