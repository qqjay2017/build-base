import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { parsePx } from '../utils/parsePx';


export interface EmptyProps {
  /** something 1122*/
  title?: string;
  imgWidth?: string | number;
  style?: CSSProperties | undefined;
  height?: string | number;
}

const EmptyStyle = styled.div<{ minHeight: any }>`
  min-height: ${(props) => props.minHeight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const EmptyImgStyle = styled.img<{ maxWidth: any }>`
  max-width: ${(props) => props.maxWidth||'440px'};
  width: 67%;

  height: auto;
`;

const EmptyTitleStyle = styled.div`

margin-top: 8px;
    color: rgba(0, 0, 0, 0.65);

    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
`

export const Empty = ({ title = '暂无数据', imgWidth = '120px', style, height }: EmptyProps) => {
  const host = window.location.hostname;
  const protocol = window.location.protocol;
  let imgSrc = '/public/website/scm/empty.png';
  if (host === 'localhost' || protocol === 'http:') {
    imgSrc = 'http://ymsl.kxgcc.com:30872' + imgSrc;
  }
  return (
    <EmptyStyle minHeight={parsePx(height)} className="rc-empty" style={style}>
      <EmptyImgStyle className="rc-empty-img" maxWidth={parsePx(imgWidth)} src={imgSrc} alt="" />
      <EmptyTitleStyle className="rc-empty-title">{title}</EmptyTitleStyle>
    </EmptyStyle>
  );
};
