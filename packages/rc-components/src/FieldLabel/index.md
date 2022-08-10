---
title: 字段展示
group:
  title: 页面展示
---

## 基本使用

```jsx
import React, { useState } from 'react';
import { FieldLabel } from '@core/rc-components';

export default () => {
  return <FieldLabel label="labellabel" value="valuevaluevaluevalue"></FieldLabel>;
};
```

## 自定义value

```jsx
import React, { useState } from 'react';
import { FieldLabel } from '@core/rc-components';

export default () => {
  return <FieldLabel label="labellabel" >
    <div>AAAAAA</div>
  </FieldLabel>;
};
```
## 自定义分隔符

```jsx
import React, { useState } from 'react';
import { FieldLabel } from '@core/rc-components';

export default () => {
  return <FieldLabel label="labellabel" delimiter="$$$$">
    <div>AAAAAA</div>
  </FieldLabel>;
};
```


<API src="./index.tsx"></API>