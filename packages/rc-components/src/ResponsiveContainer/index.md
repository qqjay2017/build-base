---
title: 缩放容器
group:
  title: 布局容器
---

## 将 dom 按比例,居中缩放放在父容器中

```jsx
import React from 'react';
import { ResponsiveContainer } from '@core/rc-components';

export default () => {
  return (
    <div style={{ width: '300px', height: '300px', border: '1px solid #000' }}>
      <ResponsiveContainer width={500} height={600}>
      <div style={{width: '500px', height: '600px'}}>

        <h1 style={{lineHeight:'600px',textAlign:'center'}}>123321213141212</h1>
      </div>
      </ResponsiveContainer>
    </div>
  );
};
```


<API></API>
