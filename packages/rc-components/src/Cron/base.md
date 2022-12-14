---
title: cron基本组件
group:
  title: Cron系列
---

## 天选择器,从 1 开始

```jsx
import React, { useState } from 'react';
import { CronDaySelect } from '@core/rc-components';

export default () => {
  const [day, setDay] = useState(1);
  return (
    <div>
      <h1>{day}</h1>
      <CronDaySelect value={day} onChange={(e) => setDay(e)}></CronDaySelect>
    </div>
  );
};
```

## 天选择器,labelFormat

```jsx
import React, { useState } from 'react';
import { CronDaySelect } from '@core/rc-components';

export default () => {
  const [day, setDay] = useState(1);
  return (
    <div>
      <h1>{day}</h1>
      <CronDaySelect
        width={'200px'}
        value={day}
        labelFormat={({ label, value }) => value + label + 'aa'}
        onChange={(e) => setDay(e)}
      ></CronDaySelect>
    </div>
  );
};
```

<API src="./DaySelect.tsx"></API>

## 月选择器,从 0 开始

```jsx
import React, { useState } from 'react';
import { CronMonSelect } from '@core/rc-components';

export default () => {
  const [month, setMonth] = useState(1);
  return (
    <div>
      <h1>{month}</h1>
      <CronMonSelect value={month} onChange={(e) => setMonth(e)}></CronMonSelect>
    </div>
  );
};
```

## 月选择器,labelFormat

- 可以用 width={300} 指定宽度

```jsx
import React, { useState } from 'react';
import { CronMonSelect } from '@core/rc-components';

export default () => {
  const [month, setMonth] = useState(1);
  return (
    <div>
      <h1>{month}</h1>
      <CronMonSelect
        width={300}
        value={month}
        onChange={(e) => setMonth(e)}
        labelFormat={({ label, value }) => label + 'aa'}
      ></CronMonSelect>
    </div>
  );
};
```

<API src="./MonSelect.tsx"></API>

## 日数字输入框

预设了以下规则,可以覆盖

- 1. 最小 1,最大 9999
- 2. 整数
- 3. 默认值 1

```jsx
import React, { useState } from 'react';
import { CronDayNumberInput } from '@core/rc-components';

export default () => {
  const [day, setDay] = useState(1);
  return (
    <div>
      <h1>{day}</h1>
      <CronDayNumberInput value={day} onChange={(e) => setDay(e)}></CronDayNumberInput>
    </div>
  );
};
```

<API src="./DayNumberInput.tsx"></API>

### 选 年/日

计算方式（1 日 2 年）

```jsx
import React, { useState } from 'react';
import { CronDateTypeSelect } from '@core/rc-components';

export default () => {
  const [day, setDay] = useState(1);
  return (
    <div>
      <h1>{day}</h1>
      <CronDateTypeSelect value={day} onChange={(e) => setDay(e)}></CronDateTypeSelect>
    </div>
  );
};
```

<API src="./DateTypeSelect.tsx"></API>

## 钱输入框

```jsx
import React, { useState } from 'react';
import { MoneyNumberInput } from '@core/rc-components';

export default () => {
  const [day, setDay] = useState(1);
  return (
    <div>
      <h1>{day}</h1>
      <MoneyNumberInput value={day} onChange={(e) => setDay(e)}></MoneyNumberInput>
    </div>
  );
};
```
