import { Space } from 'antd';

import React from 'react';
import styled from 'styled-components';
import { CronDayNumberInput } from '../Cron';

const DelimiterSpan = styled.span`
  margin-right: 16px;
`;

export const EditDayRight = (props: any) => {
  const { rowIndex, validateFields, ...restProps } = props;
  const onBlur = () => {
    if (validateFields) {
      validateFields();
    }
  };
  return (
    <Space>
      <DelimiterSpan>-</DelimiterSpan>
      <CronDayNumberInput onBlur={() => onBlur()} width={120} min={2} {...restProps} />
    </Space>
  );
};
