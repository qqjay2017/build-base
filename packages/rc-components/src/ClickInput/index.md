---
title: 点击打开弹窗的input
group:
  title: 表单组件
---

## 基本使用(受控)

```jsx
import React, { useState } from 'react';
import { ClickInput } from '@core/rc-components';

export default () => {
  const [value, setValue] = useState('');
  const onSearchClick = (e, props) => {
    console.log(e, props);
  };

  return <ClickInput value={value} onChange={setValue} onSearchClick={onSearchClick} />;
};
```

### writable 属性: 左边打字的,点击右边的才会触发弹窗

```jsx
import React, { useState } from 'react';
import { ClickInput } from '@core/rc-components';

export default () => {
  const [value, setValue] = useState('');
  const onSearchClick = (e, props) => {
    console.log(e, props);
  };

  return (
    <ClickInput value={value} onChange={setValue} writable={true} onSearchClick={onSearchClick} />
  );
};
```

### 结合弹窗使用,可以保存一个对象(选择供应商)

```jsx
import React, { useState } from 'react';
import { ClickInput, selectSupplier } from '@core/rc-components';

export default () => {
  const [applicationSystem, setApplicationSystem] = useState(null);
  const onSearchClick = (e, props) => {
    selectSupplier({}).then((res) => {
      setApplicationSystem(res.selectedRow);
    });
  };

  return (
    <div>
      <p>{JSON.stringify(applicationSystem)}</p>
      <ClickInput
        value={applicationSystem}
        valuePath="name"
        onChange={(val) => {
          setApplicationSystem(val);
        }}
        onSearchClick={onSearchClick}
      />
    </div>
  );
};
```

### 选完之后想改值

```jsx
import React, { useState } from 'react';
import { ClickInput, selectSupplier } from '@core/rc-components';

export default () => {
  const [applicationSystem, setApplicationSystem] = useState(null);
  const onSearchClick = (e, props) => {
    selectSupplier({}).then((res) => {
      setApplicationSystem(res.selectedRow);
    });
  };

  return (
    <div>
      <p>{JSON.stringify(applicationSystem)}</p>
      <ClickInput
        value={applicationSystem}
        valuePath="name"
        onChange={(val) => {
          setApplicationSystem(val);
        }}
        writable={true}
        onSearchClick={onSearchClick}
      />
    </div>
  );
};
```

## 结合 form 使用

```jsx
import React, { useState, useRef } from 'react';
import { ClickInput, selectSupplier } from '@core/rc-components';
// import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';

export default () => {
  const formRef = useRef();
  const onSearchClick = () => {
    selectSupplier({}).then((res) => {
      formRef?.current?.setFieldsValue({
        dataSource: res.selectedRow,
      });
    });
  };

  // trigger="onValuesChange"
  return (
    <div>
      <h2>选完之后要通过formRef?.current?.setFieldsValue赋值</h2>
      <ProForm
        formRef={formRef}
        onFinish={async (values) => {
          console.log(values, 'values');
        }}
      >
        <ProForm.Item label="供应商" name="dataSource">
          <ClickInput writable={true} onSearchClick={onSearchClick} />
        </ProForm.Item>
      </ProForm>
    </div>
  );
};
```

## 支持多选

```jsx
import React, { useState } from 'react';
import { ClickArrInput, selectSupplier } from '@core/rc-components';

export default () => {
  const [applicationSystem, setApplicationSystem] = useState([]);
  const onSearchClick = (e, props) => {
    selectSupplier({
      multiple: true,
      defaultValue: applicationSystem,
    }).then((res) => {
      setApplicationSystem(res.selectedRow);
    });
  };

  return (
    <div>
      <p>{JSON.stringify(applicationSystem)}</p>
      <ClickArrInput
        placeholder="必须给我选"
        value={applicationSystem}
        valuePath="name"
        keyPath="id"
        onChange={(val) => {
          setApplicationSystem(val);
        }}
        onSearchClick={onSearchClick}
      />
    </div>
  );
};
```

<API ></API>
