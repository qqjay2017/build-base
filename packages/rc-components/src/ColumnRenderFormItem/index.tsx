import React from 'react';
import { Input } from 'antd';

export const ColumnRenderFormItem = (
  _: any,
  { type, defaultRender, formItemProps, fieldProps, ...rest }: any,
  form: any,
) => {
  return <Input.Search placeholder={'请输入' + _.title} {...fieldProps} onSearch={form.submit} />;
};

export const ColumnRenderFormItemNoSearch = (
  _: any,
  { type, defaultRender, formItemProps, fieldProps, ...rest }: any,
  form: any,
) => {
  return <Input {...fieldProps} placeholder={'请输入' + _.title} />;
};
