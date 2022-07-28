---
title: cron组装组件
group:
  title: Cron系列
---


## CronGroupBase

- 传入items数组,生成cronGroup,如果是组件,记得给key

```jsx

import React from 'react';
import { CronGroupBase , CronDayNumberInput } from '@core/rc-components';
export default function SettlementDayRule() {
  return (
    <CronGroupBase
      items={[
        '现结，货到',
        <CronDayNumberInput key={'SettlementDayRule'} />,

        '天结算',
      ]}
    />
  );
}

```

<API  src="./CronGroup.tsx"></API>