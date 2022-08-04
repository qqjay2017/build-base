---
title: 可编辑材料目录树
group:
  title: 业务组件
---

## 可编辑材料目录树

### TODO 输入框搜索

```jsx
import React from 'react';
import { MaterialsTypeEditTree } from '@core/rc-components';

export default () => {
  const onDataInit = (data) => {
    console.log(data, 'data');
  };
  return <MaterialsTypeEditTree onDataInit={onDataInit} />;
};
```
