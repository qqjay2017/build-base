---
title: FileTypeIcon
group:
  title: 业务组件
---

> 文件类型图标,根据文件名称判断

```jsx
import React from 'react';
import { FileTypeIcon } from '@core/rc-components';

export default () => {
  return (
    <div>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.png"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.dwg"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.excel"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.jpg"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.svg"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.mp4"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.pdf"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.ppt"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.text"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.word"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.doc"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.docx"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.111"></FileTypeIcon>
      <FileTypeIcon fileName="f1630895d4bd4510b9cdb287f6e6039e.PdF"></FileTypeIcon>
    </div>
  );
};
```

<API exports='["default"]'></API>

```jsx
import React from 'react';
import { FileTypeIcon } from '@core/rc-components';

export default () => {
  return (
    <div>
      <FileTypeIcon fileName="123.PdF"></FileTypeIcon>
    </div>
  );
};
```
