---
title: showModal
group:
  title: 弹窗系列
---

### 使用步骤

1. 写一个 modal 单文件组件并导出

```ts
import { ShowModalCompProps } from '@core/rc-components';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

function Modal1(props: ShowModalCompProps<{ aaaaaa: string }>) {
  // modalProps 透传给Modal的属性
  // handles 回调操作
  const { modalProps, handles } = props;

  const [name, setName] = useState(props.aaaaaa);
  const handleOk = () => {
    handles.resolve({ name: name });
    handles.remove();
  };
  const handleCancel = () => {
    handles.reject({ name: name });
    handles.remove();
  };
  const handleSetName = () => {
    setName(String(Math.random() * 1000));
  };
  return (
    <Modal  maskClosable={false} {...modalProps}  onOk={handleOk} onCancel={handleCancel}>
      <div>
        Modal1
        <h1>{name}</h1>
        <Button onClick={() => handleSetName()}>handleSetName</Button>
      </div>
    </Modal>
  );
}

export default Modal1;
```

2. 去调用这个 Modal

```ts
import Modal1 from "./Modal1";
const openModal1 = () => {
  const p = {
    aaaaaa: 'initName111',
  };
  showModal<{ name: string }>(Modal1, p, {
    title: 'huang111',
  })?.then(
    (res) => {
      console.log(res, 'resresres');
    },
    (err) => {
      console.log(err, 'err');
    },
  );
};

<Button onClick={() => openModal1()}> 打开弹窗</Button>;
```

<API ></API>
