---
title: 选择弹窗集中营
---

```jsx
import React , { useState} from 'react';
import { selectApplicationSystem ,selectPurchaseContract , selectProjectSystem} from '@core/rc-components';



export default ()=>{
    const [selected,setSelected] = useState(null)
    const [purchaseContract,setPurchaseContract] = useState(null)
    const [projectSystem,setProjectSystem] = useState(null)
    const handleSelectSystem = ()=>{
        selectApplicationSystem({
           defaultValue: selected
        }).then(res=>{
            setSelected(res)
        })
    }

    const handleSelectPurchaseContract = ()=>{
        selectPurchaseContract({
            defaultValue:purchaseContract,
            initSearch:{
                contrType:'2',
                projectName:'测试文件',
                  projectId:'154636547420115038'
            }
        }).then(res=>{
            setPurchaseContract(res)
        })
    }

     const handleSelectProjectSystem = ()=>{
        selectProjectSystem({
            defaultValue:projectSystem,
            initSearch:{
              
            }
        }).then(res=>{
            setProjectSystem(res)
        })
    }

    return <div>
        <div ><button onClick={()=>handleSelectSystem()}>选择应用子系统</button></div>
        <div ><button onClick={()=>handleSelectPurchaseContract()}>选择合同</button></div>
        <div ><button onClick={()=>handleSelectProjectSystem()}>选择项目</button></div>
    </div>
}

```



