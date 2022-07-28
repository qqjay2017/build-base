---
title: 金额处理
group:
  title: 数字处理
---

## 数字加千分位

```jsx
import React, { useState, useMemo } from 'react';
import { parseMoney } from '@core/shared';
import { Button, InputNumber } from 'antd';

export default () => {
  const [value, setValue] = useState(999998888.88888888);
  const [fractionDigits, setFractionDigits] = useState(-1);

  const parseValueMemo = useMemo(() => {
    return parseMoney(value, fractionDigits);
  }, [value, fractionDigits]);

  return (
    <div>
      <div>
        解析后的金额: <h3>{parseValueMemo}</h3>
      </div>
      <div>
        金额: <InputNumber style={{ width: '500px' }} value={value} onChange={(e) => setValue(e)} />
        <div>
          是否四舍五入:
          <InputNumber
            min={-1}
            style={{ width: '500px' }}
            value={fractionDigits}
            onChange={(e) => setFractionDigits(e)}
          />{' '}
        </div>
      </div>
    </div>
  );
};
```

## API

```ts
export type IParseMoneyFn = (money?: number | string, fractionDigits?: number) => string;
```

## 数字转中文,支持大小写中文

```jsx
import React, { useState, useMemo } from 'react';
import { money2Zh } from '@core/shared';
import { Button, InputNumber } from 'antd';

export default () => {
  const [value, setValue] = useState(999998888.88888);

  const parseValueMemo = useMemo(() => {
    return money2Zh(value, 'upper');
  }, [value]);
  const parseValueLowerMemo = useMemo(() => {
    return money2Zh(value, 'lower');
  }, [value]);

  return (
    <div>
      <div>
        解析后的金额('upper'): <h3>{parseValueMemo}</h3>
        解析后的金额('lower'): <h3>{parseValueLowerMemo}</h3>
      </div>
      <div>
        金额: <InputNumber style={{ width: '500px' }} value={value} onChange={(e) => setValue(e)} />
      </div>
    </div>
  );
};
```

### API

```ts
export type IMoney2BigZhFn = (number:number|string,type:'upper'|'lower' )=>string;

```
