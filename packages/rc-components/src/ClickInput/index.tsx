import React, { useMemo, useRef } from 'react';
import { Input, InputProps } from 'antd';
import { CloseCircleOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import get from 'lodash-es/get';

export interface IClickInputProps extends InputProps {
  valuePath?: string;
  valueFormat?: (value: any) => string;
  keyPath?: string;
  value?: any;
  writable?: boolean;
  label?: '';
  key?: '';
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
    disabled = false,
    valuePath = 'name',
    writable = false,
    value,
    valueFormat,
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

    return valueFormat ? valueFormat(value) : get(value, valuePath, '');
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
      disabled={disabled}
      readOnly={!writable}
      value={inputValueMemo}
      onChange={(e) => _onChange(e)}
      onClick={writable || disabled ? undefined : (e) => _onClick(e)}
      suffix={<SearchOutlined onClick={(e) => _onSearchClick(e)} />}
      {...restProps}
    />
  );
}

const ClickArrInputWrap = styled.div<{ disabled: boolean }>`
  width: 100%;
  min-height: 32px;
  padding: 0 8px;
  background: ${(props) => (props.disabled ? '#f5f5f5' : '#ffffff')};
  opacity: 1;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  flex-wrap: wrap;

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;
const ClickArrInputItemWrap = styled.div`
  height: 32px;
  padding: 5px 0;
  margin-right: 8px;
`;
const ClickArrInputItem = styled.div`
  min-width: 58px;
  height: 22px;
  padding: 0 8px;
  padding-right: 1px;

  background: rgba(140, 140, 140, 0.1);
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  cursor: default;
  display: flex;
  justify-content: center;
`;

const ClickArrInputLabel = styled.div`
  font-size: 12px;

  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
  margin-right: 8px;
`;

const ClickArrInputClose = styled.div<{ disabled: boolean }>`
  height: 22px;
  width: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const PlaceholderWrap = styled.div`
  line-height: 32px;
  color: #00000040;
`;

export const ClickArrInput = (props: IClickInputProps) => {
  const {
    value = [],
    valuePath = 'name',
    keyPath = 'id',
    onChange,
    onSearchClick,
    valueFormat,
    placeholder = '请选择',
    disabled = false,
  } = props;
  const _onSearchClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (disabled) {
      return;
    }
    onSearchClick &&
      onSearchClick(e, {
        value,
      });
  };
  const handleDelete = (key: any) => {
    if (key && !disabled) {
      const newVal = ((value || []) as Array<any>).filter((item) => get(item, keyPath) !== key);
      onChange && onChange(newVal as any);
    }
  };
  if (!Array.isArray(value)) {
    console.error('value must be array');
    return null;
  }
  return (
    <ClickArrInputWrap disabled={disabled} onClick={(e) => _onSearchClick(e)}>
      {(!value || !value.length) && placeholder && <PlaceholderWrap>{placeholder}</PlaceholderWrap>}
      {(value || []).map((v, index) => {
        return (
          <ClickArrInputItemWrap key={get(v, keyPath, index)}>
            <ClickArrInputItem>
              <ClickArrInputLabel
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {valueFormat ? valueFormat(v) : get(v, valuePath, '')}
              </ClickArrInputLabel>
              <ClickArrInputClose
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleDelete(get(v, keyPath, ''));
                }}
              >
                <CloseOutlined style={{ fontSize: '8px', color: 'rgba(0, 0, 0, 0.6500)' }} />
              </ClickArrInputClose>
            </ClickArrInputItem>
          </ClickArrInputItemWrap>
        );
      })}
    </ClickArrInputWrap>
  );
};

export const ColumnRenderClickInput =
  (_: any, { type, defaultRender, formItemProps, fieldProps, ...rest }: any, form: any, r?: any) =>
  (clickInputProps?: IClickInputProps) => {
    // <Input.Search {...fieldProps} placeholder={'请输入' + _.title} onSearch={form.submit} />;
    return (
      <ClickInput {...fieldProps} placeholder={'请选择' + _.title} {...(clickInputProps || {})} />
    );
  };
