import React from 'react';
import './index.less';

export interface EmptyProps {
  /** something */
  title?: string;
  imgWidth?: string;
}
const Empty = ({ title = '暂无数据', imgWidth = '440px' }: EmptyProps) => {
  const host = window.location.hostname;
  const protocol = window.location.protocol;
  let imgSrc = '/public/website/scm/empty.png';
  if (host === 'localhost' || protocol === 'http:') {
    imgSrc = 'http://ymsl.kxgcc.com:30872' + imgSrc;
  }
  return (
    <div className="rc-empty">
      <img className="rc-empty-img" style={{ maxWidth: imgWidth }} src={imgSrc} alt="" />
      <div className="rc-empty-title">{title}</div>
    </div>
  );
};

export default Empty;
