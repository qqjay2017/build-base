---
title: 选择弹窗集中营
---

## 选择应用子系统

```jsx
import React , { useState} from 'react';
import { selectApplicationSystem } from '@core/rc-components';



export default ()=>{
    const [selected,setSelected] = useState(null)

    const [projectSystem,setProjectSystem] = useState(null)
    const handleSelectSystem = ()=>{
        selectApplicationSystem({
           defaultValue: selected
        }).then(res=>{
            setSelected(res)
        })
    }





    return <div>
        <div ><button onClick={()=>handleSelectSystem()}>选择应用子系统</button></div>
     
    </div>
}

```

<API src="./SelectApplicationSystem.tsx"></Api>

## 选择合同

```jsx
import React , { useState} from 'react';
import { selectPurchaseContract} from '@core/rc-components';



export default ()=>{

    const [purchaseContract,setPurchaseContract] = useState(null)

  
    const handleSelectPurchaseContract = ()=>{
        selectPurchaseContract({
            defaultValue:purchaseContract,
            initSearch:{
                contrType:'2',
                project:{
                    projectId:'154636547420115038',
                    projectName:'测试文件'
                }
              
            }
        }).then(res=>{
            setPurchaseContract(res)
        })
    }
    const handleSelectPurchaseContract2 = ()=>{
         selectPurchaseContract({
            defaultValue:purchaseContract,
            initSearch:{
                contrType:'1',
                
              
            }
        }).then(res=>{
            setPurchaseContract(res)
        })
    }

 

    return <div>
      
        <div ><button onClick={()=>handleSelectPurchaseContract()}>选择合同(带默认项目)</button></div>
        <div ><button onClick={()=>handleSelectPurchaseContract2()}>选择采购合同(不带默认项目)</button></div>
       
    </div>
}

```


<API src="./SelectPurchaseContract.tsx"></Api>

## 选择项目


```jsx
import React , { useState} from 'react';
import { selectProjectSystem } from '@core/rc-components';



export default ()=>{
   
    const [projectSystem,setProjectSystem] = useState(null)
  

     const handleSelectProjectSystem = ()=>{
        selectProjectSystem({
            defaultValue:projectSystem,
            initSearch:{
              
            }
        }).then(res=>{
            setProjectSystem(res)
        })
    }

    const handleSelectProjectSystem2 = ()=>{
        selectProjectSystem({
            defaultValue:projectSystem,
            initSearch:{
              keyword:'测试'
            }
        }).then(res=>{
            setProjectSystem(res)
        })
    }

    return <div>
      
      
        <div ><button onClick={()=>handleSelectProjectSystem()}>选择项目</button></div>
        <div ><button onClick={()=>handleSelectProjectSystem2()}>选择项目(带默认搜索)</button></div>
    </div>
}

```

<API src="./SelectProjectSystem.tsx"></Api>

## 选择供应商

```jsx
import React , { useState} from 'react';
import { selectSupplier } from '@core/rc-components';



export default ()=>{
   
    const [selectValue,setSelectValue] = useState(null)
  

     const handleSelect = ()=>{
        selectSupplier({
            defaultValue:selectValue,
            initSearch:{
              
            }
        }).then(res=>{
            setSelectValue(res)
        })
    }

   

    return <div>
      
      
        <div ><button onClick={()=>handleSelect()}>选择供应商</button></div>
    
    </div>
}

```