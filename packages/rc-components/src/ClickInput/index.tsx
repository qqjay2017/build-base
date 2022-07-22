import React, { useMemo, useRef } from 'react';
import { Input, InputProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import get from 'lodash-es/get';

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
`;
export function ClickInput(props: IClickInputProps) {
  const {
    onSearchClick,
    label = '',
    onChange,
    valuePath = 'name',
    writable = false,
    value,
    ...restProps
  } = props;
  const valueObjRef = useRef(value);
  if (typeof value === 'object') {
    valueObjRef.current = value;
  }
  const inputValueMemo = useMemo(() => {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'string') {
      return value;
    }

    return get(value, valuePath, '');
  }, [value]);

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
  const _onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (value === null || value === undefined || typeof value === 'string') {
      onChange && onChange(e.target.value as any);
    } else if (typeof value === 'object') {
      onChange &&
        onChange({
          ...value,
          ...{
            [valuePath]: e.target.value,
          },
        } as any);
    }
  };
  return (
    <InputStyle
      value={inputValueMemo}
      onChange={(e) => _onChange(e)}
      onClick={writable ? undefined : (e) => _onClick(e)}
      suffix={<SearchOutlined onClick={(e) => _onSearchClick(e)} />}
      {...restProps}
    />
  );
}


export  const ColumnRenderClickInput = (
  _: any,
  { type, defaultRender, formItemProps, fieldProps, ...rest }: any,
  form: any,
  r?:any
) => (clickInputProps?: IClickInputProps)=>{
 
  // <Input.Search {...fieldProps} placeholder={'请输入' + _.title} onSearch={form.submit} />;
  return <ClickInput {...fieldProps}  placeholder={'请选择' + _.title}  {...(clickInputProps||{})} />
};