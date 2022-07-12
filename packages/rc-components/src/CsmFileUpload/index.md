---
title: 文件上传
---


> multiple必传,传1的时候,value会变成对象处理,大于1 的时候,会当数组处理

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
      maxSize={10* 1024 * 1024}
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

<API></API>
