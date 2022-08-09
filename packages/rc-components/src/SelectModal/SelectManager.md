---
title: 选择经办人
group:
  title: 弹窗系列
---

```jsx
import React, { useState, useRef } from 'react';
import { selectManage } from '@core/rc-components';
import { message } from 'antd';

export default () => {
  const [selected, setSelected] = useState(null);
  const formDataRef = useRef();

  const [projectSystem, setProjectSystem] = useState(null);
  const handleSelectManage = () => {
    selectManage({
      multiple: true,
      alertProps: {
        message: '最多选择999999人',
      },
      beforeOk: (val) => {
        console.log(val);
        if (val && val.selectedRow && val.selectedRow.length > 10) {
          // 校验是不是多选了
          message.warning('最多选择10人');
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      },
      // 回显的数组
      defaultValue: selected,

      requestInfo: {
        // headers写这里,
        // headers: {
        //   // 'depend-uri':'xxx'
        // },
      },
    }).then((res) => {
      console.log(res, 'res');
      // 选完之后把数组存起来
      setSelected(res.selectedRow);
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSelectManage()}>选择经办人</button>
      </div>
    </div>
  );
};
```
