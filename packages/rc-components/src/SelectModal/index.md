---
title: 封装好的各种弹窗
group:
  title: 弹窗系列
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

  const handleSelectSystem2 = () => {
    selectApplicationSystem({
      defaultValue: selected,
      multiple: true,
    }).then((res) => {
      console.log(res, 'res');
      setSelected(res.selectedRow);
    });
  };

  const handleSelectSystem3 = () => {
    selectApplicationSystem({
      defaultValue: [
        {
          id: '197805253117120538',
        },
      ],
      multiple: true,
    }).then((res) => {
      console.log(res, 'res');
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSelectSystem()}>选择应用子系统</button>
        <button onClick={() => handleSelectSystem2()}>多选应用子系统(multiple=true)</button>
        <button onClick={() => handleSelectSystem3()}>多选应用子系统回显(multiple=true)</button>
      </div>
    </div>
  );
};
```

## 覆盖默认请求配置 requestInfo

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
      requestInfo: {
        url: '/api/uims/v1/oss/system/table',
      },
    }).then((res) => {
      formDataRef.current = res.formData;

      setSelected(res.selectedRow);
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSelectSystem()}>选择应用子系统带排序</button>
      </div>
    </div>
  );
};
```

<API src="./SelectApplicationSystem.tsx"></Api>

## 多选单选切换

1. 传入泛型 true(默认是 false 单选)
2. 传入属性 multiple = true (默认是 false 单选) ,自动变成多选,返回值为数组
3. 单选返回值为对象
4. 单选 defaultValue 是对象,多选 defaultValue 是数组

```


selectApplicationSystem<true>({
   multiple:true
})
.then(res=>{
  console.log(res.selectedRow)
})


```

## 支持 alert(alertProps)

```jsx
import React, { useState, useRef } from 'react';
import { selectPurchaseContract } from '@core/rc-components';

export default () => {
  const [purchaseContract, setPurchaseContract] = useState([]);

  const [multiple, setMultiple] = useState(false);
  const toggleMul = () => {
    setMultiple((m) => !m);
    setPurchaseContract(null);
  };
  const handleSelectPurchaseContract2 = () => {
    selectPurchaseContract({
      defaultValue: purchaseContract,

      multiple,
      alertProps: {
        message: '给我选一个项目',
        type: 'error',
      },
    }).then((res) => {
      console.log(res);

      setPurchaseContract(res.selectedRow);
    });
  };

  return (
    <div>
      <h6>{JSON.stringify(purchaseContract)}</h6>
      <div>
        <button onClick={() => toggleMul()}>{multiple ? '多选模式' : '单选模式'} </button>
      </div>
      <div>
        <button onClick={() => handleSelectPurchaseContract2()}>
          选择合同(带回显选中项目+alert)
        </button>
      </div>
    </div>
  );
};
```

## 选择合同

- initSearch.contrType 指定合同类型,如果有影响接口请求的 initSearch,记得要传,不然会被内部默认值覆盖

```jsx
import React, { useState, useRef } from 'react';
import { selectPurchaseContract } from '@core/rc-components';

export default () => {
  const [purchaseContract, setPurchaseContract] = useState(null);
  const formDataRef = useRef();
  const handleSelectPurchaseContract = () => {
    selectPurchaseContract({
      defaultValue: purchaseContract,
      initSearch: {
        contrType: '2',
        busType: 2,
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
      initSearch: {
        contrType: '1',
        busType: 2,
        ...formDataRef.current,
      },
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
import React, { useState, useRef } from 'react';
import { selectProjectSystem } from '@core/rc-components';

export default () => {
  const [projectSystem, setProjectSystem] = useState(null);

  const formDataRef = useRef();
  const handleSelectProjectSystem = () => {
    selectProjectSystem({
      defaultValue: projectSystem,
      initSearch: formDataRef.current,
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
      columns: [
        {
          title: '称名目项',
          dataIndex: 'name',
        },
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
import React, { useState, useRef } from 'react';
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

## 基于选择供应商,通过参数变成选择客户

```jsx
import React, { useState, useRef } from 'react';
import { selectSupplier } from '@core/rc-components';

export default () => {
  const [selectValue, setSelectValue] = useState(null);
  const formDataRef = useRef();
  const handleSelect = () => {
    selectSupplier({
      defaultValue: selectValue,
      initSearch: {
        valid: 1,
      },
      modalProps: {
        title: '选择客户',
      },
    }).then((res) => {
      setSelectValue(res.selectedRow);
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSelect()}>选择客户</button>
      </div>
    </div>
  );
};
```

## 选择材料(默认多选)

```jsx
import React, { useState, useRef } from 'react';
import { selectMaterials } from '@core/rc-components';

export default () => {
  const [selectValue, setSelectValue] = useState(null);
  const formDataRef = useRef();
  const handleSelect = () => {
    selectMaterials({
      defaultValue: selectValue,
    }).then((res) => {
      console.log(res, '选择材料 res');

      setSelectValue(res.selectedRow);
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSelect()}>选择材料</button>
      </div>
    </div>
  );
};
```

## 选择订单

```jsx
import React, { useState, useRef } from 'react';
import { selectPurchaseOrder } from '@core/rc-components';

export default () => {
  const handleSelect1 = () => {
    selectPurchaseOrder({
      initSearch: {
        type: '1',
      },
    }).then((res) => {
      console.log(res);
    });
  };

  const handleSelect2 = () => {
    selectPurchaseOrder({
      initSearch: {
        type: '2',
      },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <button onClick={() => handleSelect1()}>选择采购订单</button>
      <button onClick={() => handleSelect2()}>选择销售订单</button>
    </div>
  );
};
```

## 选择合同里面的材料

```jsx
import React, { useState, useRef } from 'react';
import { selectMaterialItem } from '@core/rc-components';

export default () => {
  const handleSelect1 = () => {
    selectMaterialItem({
      multiple: true,
      initSearch: {
        id: '214474665043943455',
        bizType: 'contract',
      },
    }).then((res) => {
      console.log(res.selectedRow);
    });
  };

  const handleSelect2 = () => {
    selectMaterialItem({
      multiple: true,
      initSearch: {
        id: '214481836733177893',
        bizType: 'order',
      },
      headers: {},
    }).then((res) => {
      console.log(res.selectedRow);
    });
  };
  const handleSelect3 = () => {
    selectMaterialItem({
      multiple: true,
      initSearch: {
        busId: '218734054017671254',
        bizType: 'notice',
        type: '2',
      },
      headers: {},
    }).then((res) => {
      console.log(res.selectedRow);
    });
  };

  return (
    <div>
      <button onClick={() => handleSelect1()}>选择合同材料</button>
      <button onClick={() => handleSelect2()}>选择销售订单里面的材料</button>
      <button onClick={() => handleSelect3()}>选择销售发货通知里面的材料</button>
    </div>
  );
};
```

## 选择仓库

```jsx
import React, { useState, useRef } from 'react';
import { selectWarehouse } from '@core/rc-components';

export default () => {
  const handleSelect1 = () => {
    selectWarehouse({
      multiple: false,
      initSearch: {
        // id: '214474665043943455',
        // bizType: 'contract',
      },
    }).then((res) => {
      console.log(res.selectedRow);
    });
  };

  return (
    <div>
      <button onClick={() => handleSelect1()}>选择仓库</button>
    </div>
  );
};
```

## 选择批次号

```jsx
import React, { useState, useRef } from 'react';
import { selectBatch } from '@core/rc-components';

export default () => {
  const handleSelect1 = () => {
    selectBatch({
      multiple: false,
      initSearch: {
        // id: '214474665043943455',
        // bizType: 'contract',
      },
    }).then((res) => {
      console.log(res.selectedRow);
    });
  };

  return (
    <div>
      <button onClick={() => handleSelect1()}>选择批次</button>
    </div>
  );
};
```

## 文件上传弹窗

```jsx
import React, { useState, useRef } from 'react';
import { selectFileModal } from '@core/rc-components';

export default () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const handleSelect1 = () => {
    selectFileModal({
      defaultValue: selectedRow,
      modalProps: {
        title: '选择合格证',
      },
      initSearch: {
        readOnly: !!selectedRow.length,
        bucket: 'scm',
        objectPathPre: 'logistic1010',
      },
    }).then((res) => {
      setSelectedRow(res.selectedRow);
    });
  };

  return (
    <div>
      <button onClick={() => handleSelect1()}>选择文件</button>
    </div>
  );
};
```
