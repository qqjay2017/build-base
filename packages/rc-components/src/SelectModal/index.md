---
title: 选择弹窗集中营
---

## 选择应用子系统

```jsx
import React, { useState, useRef } from 'react';
import { selectApplicationSystem } from '@core/rc-components';

export default () => {
  const [selected, setSelected] = useState(null);
  const formDataRef = useRef();

  const [projectSystem, setProjectSystem] = useState(null);
  const handleSelectSystem = () => {
    selectApplicationSystem({
      defaultValue: selected,
      initSearch: formDataRef.current,
    }).then((res) => {
      formDataRef.current = res.formData;

      setSelected(res.selectedRow);
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSelectSystem()}>选择应用子系统</button>
      </div>
    </div>
  );
};
```

<API src="./SelectApplicationSystem.tsx"></Api>

## 选择合同

```jsx
import React, { useState,useRef } from 'react';
import { selectPurchaseContract } from '@core/rc-components';

export default () => {
  const [purchaseContract, setPurchaseContract] = useState(null);
 const formDataRef = useRef();
  const handleSelectPurchaseContract = () => {
    selectPurchaseContract({
      defaultValue: purchaseContract,
      initSearch: {
        contrType: '2',
        projectRow: {
          id: '154636547420115038',
          name: '测试文件',
        },
      },
    }).then((res) => {
      console.log(res);
      setPurchaseContract(res.selectedRow);
    });
  };
  const handleSelectPurchaseContract2 = () => {
    selectPurchaseContract({
      defaultValue: purchaseContract,
      initSearch: formDataRef.current,
    }).then((res) => {
      console.log(res);
       formDataRef.current = res.formData;
      setPurchaseContract(res.selectedRow);
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSelectPurchaseContract()}>选择合同(带默认项目)</button>
      </div>
      <div>
        <button onClick={() => handleSelectPurchaseContract2()}>选择采购合同(不带默认项目)</button>
      </div>
    </div>
  );
};
```

<API src="./SelectPurchaseContract.tsx"></Api>

## 选择项目

```jsx
import React, { useState ,useRef} from 'react';
import { selectProjectSystem } from '@core/rc-components';

export default () => {
  const [projectSystem, setProjectSystem] = useState(null);

  const formDataRef = useRef();
  const handleSelectProjectSystem = () => {
    selectProjectSystem({
      defaultValue: projectSystem,
      initSearch:formDataRef.current,
    }).then((res) => {
      console.log(res);
      formDataRef.current = res.formData;
      setProjectSystem(res.selectedRow);
    });
  };

  const handleSelectProjectSystem2 = () => {
    selectProjectSystem({
      defaultValue: projectSystem,
      initSearch: {
        keyword: '测试',
      },
    }).then((res) => {
      console.log(res);
      setProjectSystem(res.selectedRow);
    });
  };

    const handleSelectProjectSystem3 = () => {
    selectProjectSystem({
      defaultValue: projectSystem,
      columns:[
        {
          title:'称名目项',
           dataIndex: 'name',
        }
      ],
      initSearch: {
        keyword: '测试',
      },
    }).then((res) => {
      console.log(res);
      setProjectSystem(res.selectedRow);
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSelectProjectSystem()}>选择项目</button>
      </div>
      <div>
        <button onClick={() => handleSelectProjectSystem2()}>选择项目(带默认搜索)</button>
      
      </div>
      <div>
      
        <button onClick={() => handleSelectProjectSystem3()}>选择项目(自定义columns)</button>
         <h2>传入columns属性即可,会以key或者dataIndex覆盖原本的</h2>
      </div>
    </div>
  );
};
```

<API src="./SelectProjectSystem.tsx"></Api>

## 选择供应商

```jsx
import React, { useState ,useRef} from 'react';
import { selectSupplier } from '@core/rc-components';

export default () => {
  const [selectValue, setSelectValue] = useState(null);
const formDataRef = useRef();
  const handleSelect = () => {
    selectSupplier({
      defaultValue: selectValue,
      initSearch: formDataRef.current,
    }).then((res) => {
      console.log(res);
        formDataRef.current = res.formData;
      setSelectValue(res.selectedRow);
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSelect()}>选择供应商</button>
      </div>
    </div>
  );
};
```
