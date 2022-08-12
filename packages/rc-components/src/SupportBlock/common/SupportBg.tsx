import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Pannen1 = styled.div<{
  size?: string;
  background?: string;
  top?: string;
  right?: string;
  left?: string;
}>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: 50%;
  background: ${(p) => p.background};
  opacity: 0.8;
  left: ${(p) => p.left}px;
  right: ${(p) => p.right}px;
  top: ${(p) => p.top}px;
  position: absolute;
  z-index: 1;
`;

const SupportBgStyle = styled.div`
  width: 100%;
  padding-bottom: 72px;

  /* min-height: 1000px; */
  background: linear-gradient(180deg, #d2e5ff 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
`;

export function SupportBg({
  children,
  minHeight,
  style,
}: PropsWithChildren<{
  minHeight?: string;
  style?: React.CSSProperties;
}>) {
  return (
    <SupportBgStyle
      style={{
        minHeight,
        ...style,
      }}
    >
      {[
        {
          size: '300',
          background: 'linear-gradient(56deg, #c8daf9 0%, #dee7ff 100%)',
          top: '-170',
          right: '83',
        },
        {
          size: '68',
          background: 'linear-gradient(158deg, #B0CCFF 0%, #CFF0FA 100%)',
          top: '90',
          right: '120',
        },
        {
          size: '24',
          background: 'linear-gradient(56deg, #c8daf9 0%, #dee7ff 100%)',
          top: '17',
          right: '638',
        },
        {
          size: '30',
          background: 'linear-gradient(158deg, #F1F5FF 0%, #C1D4FF 100%)',
          top: '157',
          right: '502',
        },
        {
          size: '229',
          background:
            'linear-gradient(223deg, #FFF4EB 0%, #BFE6FF 59%, #CADAFF 100%, #CADAFF 100%);',
          top: '109',
          left: '179',
        },
        {
          size: '100',
          background: 'linear-gradient(56deg, #c8daf9 0%, #dee7ff 100%)',
          top: '470',
          right: '1183',
        },
        {
          size: '100',
          background: 'linear-gradient(56deg, #c8daf9 0%, #dee7ff 100%)',
          top: '80',
          left: '583',
        },
        {
          size: '200',
          background: 'linear-gradient(56deg, #c8daf9 0%, #dee7ff 100%)',
          top: '270',
          right: '383',
        },
      ].map((d, index) => (
        <Pannen1 key={index} {...d} />
      ))}
      {children}
    </SupportBgStyle>
  );
}

export default SupportBg;
