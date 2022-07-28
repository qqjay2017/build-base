import React, { memo, useMemo, useState } from 'react';
import { Select } from 'antd';
import { ConstantType } from '@core/shared';
import type { SelectProps } from 'antd';
import styled from 'styled-components';
import { number2MonthText } from '@core/shared';
import { CronSelectCustomProps, LabelFormatFn } from './base';
import { parsePx } from '../utils';
function getMonSelectOption(): ConstantType[] {
  const monArr = Array(12).fill(null);
  return monArr.map((m, index) => {
    return {
      label: number2MonthText(index),
      value: index,
    };
  });
}

function useMonSelect() {
  const monSelectOptionMemo = useMemo(() => {
    return getMonSelectOption();
  }, []);

  return {
    monSelectOptionMemo,
  };
}
const SelectStyle = styled(Select)<{width?:any}>`
  width: ${props=>props.width||'120px'};
`;

export type IMonSelectProps =   CronSelectCustomProps & SelectProps;
export const  CronMonSelect = memo((props: IMonSelectProps) =>{
  //   const [open, setOpen] = useState(false);
  let { labelFormat,width, ...selectProps } = props;
  const { monSelectOptionMemo } = useMonSelect();

  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <SelectStyle width={parsePx(width)} defaultValue={0} {...(selectProps as any)}>
        {monSelectOptionMemo.map((m) => (
          <Select.Option key={m.value} value={m.value}>
            {labelFormat ? labelFormat(m) : m.label}
          </Select.Option>
        ))}
      </SelectStyle>
    </span>
  );
})

