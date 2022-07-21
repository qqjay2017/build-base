import React, { useMemo, useRef } from 'react';
import { Input, InputProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';



export interface IClickInputProps extends InputProps {
  valuePath?: string;
  writable?: boolean;
  label?: '';
  onSearchClick?: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    props: {
      value?: any;
    },
  ) => void;
}

const InputStyle = styled(Input)`
    .ant-input-suffix {
        color: rgba(0, 0, 0, 0.25);
    }
`
export function ClickInput(props: IClickInputProps) {
  const { onSearchClick, label = '', valuePath = 'name', writable = false,value, ...restProps } = props;
  const valueObjRef = useRef(value)
  if(typeof value === 'object'){
    valueObjRef.current = value
  }
  const inputValueMemo = useMemo(()=>{
    if(value===null || value ===undefined){
        return ''
    }
    if(typeof value ==='string'){
        return value
    }
   
    return value[valuePath]
  },[value])
   
  const _onSearchClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (onSearchClick) {
      onSearchClick(e, {
        value: props.value as string,
      });
    }
  };
  const _onClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (writable) {
      return false;
    }
    if (onSearchClick) {
      onSearchClick(e, {
        value: props.value as string,
      });
    }
  };
  const _onChange:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
    console.log(typeof e.target.value,'typeof e.target.value')
    if( typeof e.target.value === 'object'){
        debugger
    }
  }
  return (
    <InputStyle
    value={inputValueMemo}
    onChange={(e)=>_onChange(e)}
      onClick={writable ? undefined : (e) => _onClick(e)}
      suffix={<SearchOutlined onClick={(e) => _onSearchClick(e)} />}
      {...restProps}
    />
  );
}
