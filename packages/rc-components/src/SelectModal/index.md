---
title: 选择弹窗集中营
---

```jsx
import React , { useState} from 'react';
import { selectApplicationSystem } from '@core/rc-components';



export default ()=>{
    const [selected,setSelected] = useState(null)
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



