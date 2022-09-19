---
title: 交易模块弹窗
group:
  title: 弹窗系列
---

```jsx
import React, { useState, useRef } from 'react';
import { selectShipment } from '@core/rc-components';

export default () => {
  const [selected, setSelected] = useState(null);
  const formDataRef = useRef();

  const [projectSystem, setProjectSystem] = useState(null);

  const handleSelect1 = () => {
    selectShipment({
      initSearch: {
        type: '1',
        listType: '1',
        bizType: 'notice',
      },
    }).then((res) => {
      console.log(res, 'res');
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSelect1()}>选择交易</button>
      </div>
    </div>
  );
};
```

## 入参

```
1. 采购方





```
