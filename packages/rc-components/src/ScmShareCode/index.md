---
title: scm分享码
group:
  title: 业务组件
---

```jsx
import React from 'react';
import { ScmShareCode } from '@core/rc-components';

export default () => {
  return (
    <ScmShareCode
      apiData={{
        busCode: 'scm1010',
      }}
      headers={{
        'depend-uri': '/api/activiti/v1/tasks/{taskId}/complete/formdata',
        'depend-method': 'POST',
      }}
    />
  );
};
```

<API src="./index.tsx"></API>

## apiData

http://xjjchain-scm.xjj-chain-dev.192.168.11.251.nip.io:30872/doc.html#/default/%E5%85%AC%E5%85%B1%E6%9C%8D%E5%8A%A1%E6%8E%A5%E5%8F%A3/generateShareCodeUsingPOST

## busCode 大全

http://pms.xjjchain.com:31951/pages/viewpage.action?pageId=24150437 拉到最后
