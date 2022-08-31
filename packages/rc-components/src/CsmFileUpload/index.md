---
title: CsmFileUpload
group:
  title: 表单组件
---

> multiple 必传,传 1 的时候,value 会变成对象处理,大于 1 的时候,会当数组处理

## 基本使用

```jsx
import React, { useState } from 'react';
import { CsmFileUpload } from '@core/rc-components';
const videoApiData = { bucket: 'images', objectPathPre: 'cms1007' };
export default () => {
  const [fileList, setFileList] = useState([]);
  return (
    <CsmFileUpload
      value={fileList}
      onChange={setFileList}
      multiple={3}
      apiData={videoApiData}
    ></CsmFileUpload>
  );
};
```

## 文件类型检验

```jsx
import React, { useState } from 'react';
import { CsmFileUpload } from '@core/rc-components';
const videoApiData = { bucket: 'images', objectPathPre: 'cms1007' };
export default () => {
  const [fileList, setFileList] = useState([]);
  return (
    <CsmFileUpload
      value={fileList}
      onChange={setFileList}
      multiple={3}
      accept=".rar,.jpg,.png"
      apiData={videoApiData}
    ></CsmFileUpload>
  );
};
```

## 文件大小限制

```jsx
import React, { useState } from 'react';
import { CsmFileUpload } from '@core/rc-components';
const videoApiData = { bucket: 'images', objectPathPre: 'cms1007' };
export default () => {
  const [fileList, setFileList] = useState([]);
  return (
    <CsmFileUpload
      value={fileList}
      onChange={setFileList}
      multiple={3}
      maxSize={10 * 1024 * 1024}
      apiData={videoApiData}
    ></CsmFileUpload>
  );
};
```

## 显示文字自定义

```jsx
import React, { useState } from 'react';
import { CsmFileUpload } from '@core/rc-components';
const videoApiData = { bucket: 'images', objectPathPre: 'cms1007' };
export default () => {
  const [fileList, setFileList] = useState([]);
  return (
    <CsmFileUpload
      value={fileList}
      onChange={setFileList}
      multiple={3}
      typeText="爱传不传爱传不传"
      apiData={videoApiData}
    ></CsmFileUpload>
  );
};
```

## 关闭下载功能

```jsx
import React, { useState } from 'react';
import { CsmFileUpload } from '@core/rc-components';
const videoApiData = { bucket: 'images', objectPathPre: 'cms1007' };
export default () => {
  const [fileList, setFileList] = useState([]);
  return (
    <CsmFileUpload
      needDownload={false}
      value={fileList}
      onChange={setFileList}
      multiple={3}
      typeText="关闭下载功能"
      apiData={videoApiData}
    ></CsmFileUpload>
  );
};
```

## disabled

```jsx
import React, { useState } from 'react';
import { CsmFileUpload } from '@core/rc-components';
const videoApiData = { bucket: 'images', objectPathPre: 'cms1007' };
export default () => {
  const [fileList, setFileList] = useState([
    {
      id: null,
      delFlag: null,
      dataVersion: null,
      createdId: null,
      createdEmplId: null,
      createdDatetime: null,
      modiId: null,
      modiEmplId: null,
      modiDatetime: null,
      busCode: null,
      busId: null,
      bucket: 'images',
      objectName: 'cms1007/1e281cd67aa34488a4dd47279b9633be.png',
      fileName: '1.png',
      fileSize: '37234',
      fileType: 'PNG',
      contentType: 'image/png',
      pieceNum: 1,
      blockNum: null,
      transactionHash: null,
      txHash: null,
      docId: null,
      contentHash: null,
      transactionId: null,
      resource: null,
      proofWay: null,
      identifier: '9b2224905ad9241a87337108ee12576f',
      fileSrcUrl:
        'https://test-minio.kxgcc.com:31149/images/cms1007/1e281cd67aa34488a4dd47279b9633be.png',
      uploadId: null,
    },
  ]);
  return (
    <CsmFileUpload
      disabled={true}
      value={fileList}
      onChange={setFileList}
      multiple={3}
      typeText="禁用"
      apiData={videoApiData}
    ></CsmFileUpload>
  );
};
```

<API></API>

```
{"id":null,"delFlag":null,"dataVersion":null,"createdId":null,"createdEmplId":null,"createdDatetime":null,"modiId":null,"modiEmplId":null,"modiDatetime":null,"busCode":null,"busId":null,"bucket":"images","objectName":"cms1007/1e281cd67aa34488a4dd47279b9633be.png","fileName":"1.png","fileSize":"37234","fileType":"PNG","contentType":"image/png","pieceNum":1,"blockNum":null,"transactionHash":null,"txHash":null,"docId":null,"contentHash":null,"transactionId":null,"resource":null,"proofWay":null,"identifier":"9b2224905ad9241a87337108ee12576f","fileSrcUrl":"https://test-minio.kxgcc.com:31149/images/cms1007/1e281cd67aa34488a4dd47279b9633be.png","uploadId":null}
```
