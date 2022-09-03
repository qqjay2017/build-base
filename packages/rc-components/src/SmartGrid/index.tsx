import React from 'react';
import styled from 'styled-components';

import toArray from 'rc-util/lib/Children/toArray';
const INTERNAL_PREFIX_KEY = 'smart-grid-key';
export interface ISmartGridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 默认状态下的列数量
   * @default 2
   */
  col?: number;
  /**
   * 子容器是否需要overflow:hidden;
   * @default false
   */
  needOverHidden?: boolean;
}

const SmartGridContainerStyle = styled.div<{
  col: number;
  row: number;
  childNodeLength: number;
  needOverHidden?: boolean;
}>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.col}, 1fr);
  grid-template-rows: repeat(${(props) => props.row}, 1fr);
  grid-gap: 12px;
  > * {
    overflow: ${(props) => (props.needOverHidden ? 'hidden' : '')};
  }

  // TODO响应式
  @media (max-width: 1400px) {
    grid-template-columns: repeat(${(props) => Math.min(props.col, 2)}, 1fr);
    grid-template-rows: repeat(
      ${(props) => Math.ceil(props.childNodeLength / Math.min(props.col, 2))},
      1fr
    );
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(${(props) => props.childNodeLength}, 1fr);
  }
`;

export function SmartGrid({
  col = 2,
  children,
  needOverHidden = false,
  ...rest
}: ISmartGridContainerProps) {
  const childNodes = toArray(children, {
    keepEmpty: true,
  });
  //   let latestIndex = 0;
  const childNodeLength = childNodes.length || 0;
  const row = Math.ceil(childNodeLength / col);
  const nodes = childNodes.map((child, i) => {
    // if (child !== null && child !== undefined) {
    //   latestIndex = i;
    // }
    const key = (child && child.key) || `${INTERNAL_PREFIX_KEY}-${i}`;
    return <div key={key}>{child}</div>;
  });

  return (
    <SmartGridContainerStyle
      {...rest}
      col={col}
      row={row}
      needOverHidden={needOverHidden}
      childNodeLength={childNodeLength}
    >
      {nodes}
    </SmartGridContainerStyle>
  );
}
