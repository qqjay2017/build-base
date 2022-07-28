import { get } from "lodash-es";
import { useState } from "react";


function formatDefaultValue(defaultValue, multiple,rowKey='id') {
    if (defaultValue === null || defaultValue === undefined || ( !Array.isArray(defaultValue) && !get(defaultValue, rowKey, ''))) {
      return multiple ? [] : null;
    }
    // 对象转数组
    if (!Array.isArray(defaultValue) && multiple) {
      return [defaultValue];
    }
    return defaultValue;
  }

export const useTableSelect :(v:{
  /**
   * 回显用的,当前已选中的值
   * 单选传对象(没选中是null),多选传数组
   * @default null
   */
  defaultValue:any; 
  /**
   * 是否多选,默认单选
   * @default false
   */
  multiple?:boolean; 
  /**
   * table的rowKey
   * @default 'id'
   */
  rowKey?:string;
})=>{
  onSelect:any;
  selectedRow:any;
  setSelectedRow:any;
  handleRemoveSelect:any;
  onRowClick:any;
  onSelectAll:any;
}= ({
    defaultValue,

    multiple=false,
    rowKey='id'
})=>{
    const [selectedRow, setSelectedRow] = useState<any>(
        formatDefaultValue(defaultValue, multiple,rowKey),
      );

      const onSelect = (record) => {
        if (record) {
          if (multiple) {
            setSelectedRow((row) => (row || []).concat(record) as any);
          } else {
            setSelectedRow(record);
          }
        }
      };

      const handleRemoveSelect = (record?: any) => {
        if (!multiple) {
          // 单选,取消选择,直接null
          setSelectedRow(null);
        } else {
          // 多选,做一个新数组
        
    
          setSelectedRow((row)=>row.filter((r) => {
            return r && r[rowKey] && r[rowKey] != record[rowKey];
          }) as any);
        }
      };

      const onRowClick = (record) => {
    
        if (record) {
          if (!multiple) {
            // 单选直接null
            if (selectedRow && selectedRow[rowKey] === record[rowKey]) {
              handleRemoveSelect();
              return;
            }
          } else {
            if (selectedRow.find((s) => s &&  s[rowKey] == record[rowKey])) {
              handleRemoveSelect(record);
              return;
            }
          }
    
          onSelect(record);
        }
      };

      const onSelectAll = (changeRows:any[])=>{
        if(changeRows && changeRows.length ){
          setSelectedRow(row=>(row.concat(changeRows) )as any);
        }
        
      }


    return {
        onSelect,
        selectedRow,
        setSelectedRow,
        handleRemoveSelect,
        onRowClick,
        onSelectAll
    }
    
}