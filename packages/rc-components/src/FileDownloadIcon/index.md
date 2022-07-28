---
title: FileDownloadIcon
group:
  title: 业务组件
---

> 文件下载图标,把接口返回的透传,内置下载请求(大于100mb时候不会走blob,因为要很久,走浏览器原生下载)

```jsx
import React from 'react';
import { FileDownloadIcon } from '@core/rc-components';

export default () => {
  const fileInfo = {
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
    objectName: 'cms1007/f1630895d4bd4510b9cdb287f6e6039e.png',
    fileName: '541E242C-A8CD-4029-B874-AD4D5516617D.png',
    fileSize: '7852',
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
    identifier: '4cfa6906da0c6e994411bba6c9f22f4a',
    fileSrcUrl:
      'https://test-minio.kxgcc.com:31149/images/cms1007/f1630895d4bd4510b9cdb287f6e6039e.png',
    uploadId: null,
  };
  return (
    <FileDownloadIcon
     {...fileInfo}
    ></FileDownloadIcon>
  );
};
```

<API exports='["default"]'></API>
