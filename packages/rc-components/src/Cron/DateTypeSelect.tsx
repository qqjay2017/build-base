import { cronDateType } from '@core/shared';
import { Select, SelectProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { parsePx } from '../utils';
import { CronSelectCustomProps } from './base';

const SelectStyle = styled(Select)<{ width?: any }>`
  width: ${(props) => props.width || '70px'};
`;

export type IDateTypeSelectProps = CronSelectCustomProps & SelectProps;
export function CronDateTypeSelect(props: IDateTypeSelectProps) {
  const { labelFormat, width, ...rest } = props;
  return (
    <SelectStyle width={parsePx(width)} {...rest}>
      {cronDateType.map((item) => {
        return (
          <Select.Option key={item.value} value={item.value}>
            {labelFormat ? labelFormat(item) : item.label}
          </Select.Option>
        );
      })}
    </SelectStyle>
  );
}
