---
title: 自动grid容器
group:
  title: 布局容器
---

### 规则

- col 指定默认列数
- 屏幕宽度大于 1400px 时,{col}列 n 行
- 屏幕宽度为 992px-1400px 时,将变成 2 列 n 行
- 小于 992px 时,将会变成一列 n 行

```jsx
import React from 'react';
import { SmartGrid } from '@core/rc-components';

export default () => (
  <div>
    <SmartGrid>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
    </SmartGrid>
  </div>
);
```

### col 指定默认列

```jsx
import React from 'react';
import { SmartGrid } from '@core/rc-components';

export default () => (
  <div>
    <SmartGrid col={3}>
      <h1>123a</h1>
      <h1>123b</h1>
      <h1>123c</h1>
      <h1>123d</h1>
      <h1>123e</h1>
      <h1>123f</h1>
      <h1>123g</h1>
    </SmartGrid>
  </div>
);
```

### 开启 overflow:hidden,如果内容过长,建议开启

```jsx
import React from 'react';
import { SmartGrid } from '@core/rc-components';

export default () => (
  <div>
    <SmartGrid col={3} needOverHidden={true}>
      <h1>123a123a123a123a123a123a123a123a123a123a123a</h1>
      <h1>123b123b123b123b123b123b123b123b123b123b123b</h1>
      <h1>123c123c123c123c123c123c123c123c123c123c123c123c</h1>
      <h1>123d123d123d123d123d123d123d123d</h1>
      <h1>123e123e123e123e123e123e123e</h1>
      <h1>123f123f123f123f123f123f123f123f</h1>
      <h1>123g123g123g123g123g123g123g123g</h1>
    </SmartGrid>
  </div>
);
```

<API ></API>
