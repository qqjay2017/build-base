---
title: 点击打开弹窗的input
---

## 基本使用

```jsx
import React from 'react';
import { ClickInput } from '@core/rc-components';

export default () => {
  const onSearchClick = (e, props) => {
    console.log(e, props);
  };

  return <ClickInput onSearchClick={onSearchClick} />;
};
```

### 左边打字的,点击右边的才会触发弹窗

```jsx
import React from 'react';
import { ClickInput } from '@core/rc-components';

export default () => {
  const onSearchClick = (e, props) => {
    console.log(e, props);
  };

  return <ClickInput writable={true} onSearchClick={onSearchClick} />;
};
```

### 结合弹窗使用

```jsx
import React, { useState } from 'react';
import { ClickInput, selectApplicationSystem } from '@core/rc-components';

export default () => {
  const [applicationSystem, setApplicationSystem] = useState(null);
  const onSearchClick = (e, props) => {
    console.log(props,'props')
    selectApplicationSystem().then((res) => {
      setApplicationSystem(res);
    });
  };

  return <ClickInput value={applicationSystem} writable={true} onSearchClick={onSearchClick} />;
};
```
