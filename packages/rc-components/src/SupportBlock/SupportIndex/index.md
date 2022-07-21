---
title: 帮助中心首页
---

```jsx
import React from 'react';
import { SupportIndex } from '@core/rc-components';

export default ()=>{
    const handleMoreClick = (id)=>{
        console.log(id)
    }
    const handleTitleClick = (id)=>{
console.log(id)
    }
    return <SupportIndex onTitleClick={handleTitleClick}  onMoreClick={(id)=>handleMoreClick(id)} />
}

```


<API ></API>
