import { parseMoney } from '@core/shared';
import { InputNumber, InputNumberProps } from 'antd';
import React from 'react';

export const moneyNumberInputFormatter = (value: any) => {
  console.log(value, 'value');

  return parseMoney(value);
};

export const MoneyNumberInput = (props: InputNumberProps) => {
  return (
    <InputNumber
      min={0}
      precision={8}
      stringMode={true}
      max={99999999.99999999}
      placeholder="请输入不含税单价"
      style={{ width: '100%' }}
      formatter={moneyNumberInputFormatter}
      {...props}
      // onChange={() => {
      //   materialsBlur();
      // }}
    />
  );
};

export const PercentNumberInput = (props: InputNumberProps) => {
  return (
    <InputNumber
      min={0}
      max={100}
      precision={2}
      defaultValue={13}
      placeholder="请输入税率"
      style={{ width: '100%' }}
      {...props}
    />
  );
};
