import React from 'react';
import styled from 'styled-components';
export interface IFieldLabelProps {
  /**
   *
   */
  label?: string;
  value?: string | React.ReactNode;
  /**
   * 分隔符
   * @default '：'
   */
  delimiter?: string;
  /**
   * 方向
   * @default 'horizontal'
   */
  direction?: 'vertical' | 'horizontal';
  children?: React.ReactNode;
}

const FieldLabelWrapStyle = styled.div`
  display: flex;
  /* align-items: center; */
`;

const LabelStyle = styled.div`
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-right: 8px;
`;
const ValueStyle = styled.div`
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.55);
`;

const VerticalLabelStyle = styled(LabelStyle)`
  font-size: 14px;

  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
  margin-bottom: 4px;
`;
const VerticalValueStyle = styled(ValueStyle)`
  font-size: 14px;

  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
`;
export function FieldLabel({
  label,
  value,
  children,
  delimiter = '：',
  direction = 'horizontal',
}: IFieldLabelProps) {
  if (direction === 'vertical') {
    return (
      <div>
        <VerticalLabelStyle>{label}</VerticalLabelStyle>
        <VerticalValueStyle>{children || value}</VerticalValueStyle>
      </div>
    );
  }
  return (
    <FieldLabelWrapStyle>
      <LabelStyle>
        {label}
        {delimiter}
      </LabelStyle>
      <ValueStyle>{children || value || '--'}</ValueStyle>
    </FieldLabelWrapStyle>
  );
}
