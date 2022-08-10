---
title: 文件下载组装
group:
  title: 业务组件
---


```jsx

import React from 'react';
import { FileItem } from '@core/rc-components';


const fileObj = {"id":"199643715466203214","delFlag":0,"dataVersion":1,"createdId":"140962061877542947","createdEmplId":"152792531586043941","createdDatetime":1658820816125,"modiId":"140962061877542947","modiEmplId":"152792531586043941","modiDatetime":1658820816125,"busCode":"cms1007","busId":"199643715382317082","bucket":"images","objectName":"cms1007/bd7fbc2bed2147d682d22ad3c80ba21b.mp4","fileName":"1.mp4","fileSize":"4144534","fileType":"MP4","contentType":"video/mp4","pieceNum":1,"blockNum":0,"transactionHash":"","txHash":null,"docId":null,"contentHash":null,"transactionId":null,"resource":0,"proofWay":null,"identifier":"edffb17266bde1a1fd38fdb7478f21b2","fileSrcUrl":"http://ymsl-minio.kxgcc.com:30872/images/cms1007/bd7fbc2bed2147d682d22ad3c80ba21b.mp4","uploadId":null};

export default ()=>{

    return <div>
        <FileItem {...fileObj} />
    </div>
}

```