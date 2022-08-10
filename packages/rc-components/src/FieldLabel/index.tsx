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
  children?: React.ReactNode;
}

const FieldLabelWrapStyle = styled.div`
  display: flex;
  align-items: center;
`;

const LabelStyle = styled.div`
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-right:4px;
`;
const ValueStyle = styled.div`
 line-height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.55);
`
export function FieldLabel({ label, value, children, delimiter =':'}: IFieldLabelProps) {
  return (
    <FieldLabelWrapStyle>
      <LabelStyle>{label}{delimiter}</LabelStyle>
      <ValueStyle>{children || value}</ValueStyle>
    </FieldLabelWrapStyle>
  );
}
