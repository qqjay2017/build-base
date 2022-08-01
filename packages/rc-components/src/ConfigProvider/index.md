---
title: 全局公共配置
group:
  title: 公共配置
---

## ConfigProvider



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
      <MaterialsTypeTree />
    </ConfigProvider>
  );
};
```

<API src="./index.tsx" ></API>


### IConfigContextProps

```ts
export interface IConfigContextProps {
    API_URL?:string
}

```