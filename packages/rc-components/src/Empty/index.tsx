import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { parsePx } from '../utils/parsePx';
import './index.less';

export interface EmptyProps {
  /** something 1122*/
  title?: string;
  imgWidth?: string|number;
  style?:CSSProperties | undefined;
  height?:string|number;
}
export const Empty = ({ title = '暂无数据', imgWidth = '120px' ,style,height}: EmptyProps) => {
  const host = window.location.hostname;
  const protocol = window.location.protocol;
  let imgSrc = '/public/website/scm/empty.png';
  if (host === 'localhost' || protocol === 'http:') {
    imgSrc = 'http://ymsl.kxgcc.com:30872' + imgSrc;
  }
  return (
    <div className="rc-empty" style={{
      minHeight:parsePx(height),
      ...style
    }}>
      <img className="rc-empty-img" style={{ maxWidth: parsePx(imgWidth) }} src={imgSrc} alt="" />
      <div className="rc-empty-title">{title}</div>
    </div>
  );
};

