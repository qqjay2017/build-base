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
  keepEmpty?: boolean;
  gap?: number;
  /**
   * 子容器是否需要overflow:hidden;
   * @default false
   */
  needOverHidden?: boolean;
}

const SmartGridContainerStyle = styled.div<{
  col: number;
  gap: number;
  row: number;
  childNodeLength: number;
  needOverHidden?: boolean;
}>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.col}, 1fr);
  grid-template-rows: repeat(${(props) => props.row}, auto);
  grid-gap: ${(props) => `${props.gap}px`};
  > * {
    overflow: ${(props) => (props.needOverHidden ? 'hidden' : '')};
  }

  // TODO响应式
  @media (max-width: 1400px) {
    grid-template-columns: repeat(${(props) => Math.min(props.col, 2)}, 1fr);
    grid-template-rows: repeat(
      ${(props) => Math.ceil(props.childNodeLength / Math.min(props.col, 2))},
      auto
    );
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(${(props) => props.childNodeLength}, auto);
  }
`;

export function SmartGrid({
  col = 2,
  children,
  gap = 12,
  needOverHidden = false,
  keepEmpty = false,
  ...rest
}: ISmartGridContainerProps) {
  const childNodes = toArray(children, {
    keepEmpty: keepEmpty,
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
      gap={gap}
      col={col}
      row={row}
      needOverHidden={needOverHidden}
      childNodeLength={childNodeLength}
    >
      {nodes}
    </SmartGridContainerStyle>
  );
}
