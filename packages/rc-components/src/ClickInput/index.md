---
title: 点击打开弹窗的input
---

## 基本使用(受控)

```jsx
import React ,{useState} from 'react';
import { ClickInput } from '@core/rc-components';

export default () => {
  const [value,setValue] = useState('')
  const onSearchClick = (e, props) => {
    console.log(e, props);
  };

  return <ClickInput value={value}  onChange={setValue}   onSearchClick={onSearchClick} />;
};
```

### writable属性: 左边打字的,点击右边的才会触发弹窗

```jsx
import React ,{useState}  from 'react';
import { ClickInput } from '@core/rc-components';

export default () => {
  const [value,setValue] = useState('')
  const onSearchClick = (e, props) => {
    console.log(e, props);
  };

  return <ClickInput value={value}  onChange={setValue}  writable={true} onSearchClick={onSearchClick} />;
};
```

### 结合弹窗使用,可以保存一个对象

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

  return <div>
   <p>{JSON.stringify(applicationSystem)}</p>
    <ClickInput value={applicationSystem} 
        valuePath="name"
        onChange={(val)=>{
          setApplicationSystem(val)
        }}
  writable={true} onSearchClick={onSearchClick} />
  </div>
};
```


<API ></API>