import React, { useMemo } from 'react';
import { Select } from 'antd';
import { ConstantType } from '@core/shared';
import type { SelectProps } from 'antd';
import styled from 'styled-components';
import { CronSelectCustomProps } from './base';
import { memo } from 'react';
import { parsePx } from '../utils';
function getDaySelectOption(): ConstantType[] {
  const dayArr = Array(31).fill(null);
  return dayArr.map((m, index) => {
    return {
      label: index + 1 + '',
      value: index+1,
    };
  });
}

function useDaySelect() {
  const daySelectOptionMemo = useMemo(() => {
    return getDaySelectOption();
  }, []);

  return {
    daySelectOptionMemo,
  };
}
const SelectStyle = styled(Select)<{width?:any}>`
  width: ${props=>props.width||'70px'};
`;

export type IDaySelectProps =  CronSelectCustomProps & SelectProps;
export const  CronDaySelect = memo((props: IDaySelectProps) =>{
  let { labelFormat, ...selectProps } = props;
  const { daySelectOptionMemo } = useDaySelect();

  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <SelectStyle width={parsePx(props.width)} defaultValue={1} {...(selectProps as any)}>
        {daySelectOptionMemo.map((m) => (
          <Select.Option defaultValue={1} key={m.value} value={m.value}>
            {labelFormat ? labelFormat(m) : m.label}
          </Select.Option>
        ))}
      </SelectStyle>
    </span>
  );
})


