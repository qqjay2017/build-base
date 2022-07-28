import { InputNumber, InputNumberProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { parsePx } from '../utils';

export type IDayNumberInputProps = InputNumberProps;

const InputNumberStyle  = styled(InputNumber)<{width?:any}>`

width:${props=>props.width};

`

export const  CronDayNumberInput = ({width,...rest}: IDayNumberInputProps)=> {
  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <InputNumberStyle  width={parsePx(width)} defaultValue={1} min={1} max={9999} step={1} precision={0} {...rest} />
    </span>
  );
}


