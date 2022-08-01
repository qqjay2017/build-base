---
title: 材料目录树
group:
  title: 业务组件
---

## 材料目录树

### TODO 输入框搜索

```jsx
import React from 'react';
import { MaterialsTypeTree, ConfigProvider } from '@core/rc-components';

export default () => {
  return (
    <ConfigProvider
      config={{
        API_URL: 'https://test-ymsl.kxgcc.com:30195',
      }}
    >
      <MaterialsTypeTree />{' '}
    </ConfigProvider>
  );
};
```

<API></API>