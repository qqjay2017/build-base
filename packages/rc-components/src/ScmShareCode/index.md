---
title: scm分享码
group:
  title: 业务组件
---


```jsx
import React from 'react';
import { ScmShareCode } from '@core/rc-components';

export default ()=>{
    return <ScmShareCode apiData={{
      busCode:'scm1010'
    }}
    headers={{
      'depend-uri': '/api/activiti/v1/tasks/{taskId}/complete/formdata',
      'depend-method': 'POST',
    }}
    />
}

```




<API src="./index.tsx"></API>


## busCode大全

http://pms.xjjchain.com:31951/pages/viewpage.action?pageId=24150437  拉到最后

