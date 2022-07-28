---
title: DevDrawer
transform: true
group:
  title: 开发辅助
---

> 本地单跑时候的菜单,支持切换公司,传入systemId和onTitleClick

```jsx
/**
 * iframe: true
    compact: true
 */
import React from 'react';
import { DevDrawer } from '@core/rc-components';
import 'antd/dist/antd.min.css'
export default () => {
 
  return (
    <DevDrawer
    systemId="167096554103328853"
     onTitleClick={({
        key,id,meta,name
     })=>{
        console.log(key)
     }}
    ></DevDrawer>
  );
};
```

<API exports='["default"]'></API>
