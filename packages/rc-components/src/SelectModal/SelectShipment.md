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

## getShipmentsChoiceApiUrl 选择列表

## getShipmentsApiUrl 请求头

## getShipmentsItemListApiUrl 材料明细

```
1. 采购方


采购退货单
发起方 type '1' listType '1' bizType 'return'
接收方 type '1' listType '2' bizType 'return'

销售退货单
发起方 type '2' listType '1' bizType 'return'
接收方 type '2' listType '2' bizType 'return'
'
销售发货通知单'
发起方 type '2' listType '1' bizType 'notice'
接收方 type '2' listType '2' bizType 'notice'
'
采购收货单'
发起方 type '1' listType '1' bizType 'receive'
接收方 type '1' listType '2' bizType 'receive'
'
销售发货单/供应商到货单'
发起方 type '1' listType '1' bizType 'shipments'
接收方 type '1' listType '2' bizType 'shipments'


```
