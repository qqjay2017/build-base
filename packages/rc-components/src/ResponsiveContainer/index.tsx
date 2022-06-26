import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import styled from 'styled-components';

interface ResponsiveContainerProps {
  children: ReactElement;
  maxScale?: number;
  // 设计稿尺寸
  width: number;
  height: number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: number;
  debounceTime?: number;
  id?: string | number;
  className?: string | number;
}

const ResponsiveWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
// 不能把容器撑开,所以absolute
const ResponsiveInner = styled.div<{
  scale?: number;
  left: string;
  top: string;
}>`
  position: absolute;
  left: ${(p) => p.left || 0};
  top: ${(p) => p.top || 0};

  transform: scale(${(p) => p.scale || 0});
  transform-origin: top left;
`;

export default function ResponsiveContainer(props: ResponsiveContainerProps) {
  const { children, maxScale, width = 500, height = 500 } = props;

  const [mounted, setMounted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [position, setPosition] = useState({
    top: '0',
    left: '0',
  });

  const getContainerSize = () => {
    if (!containerRef.current) {
      return {
        rwidth: 0,
        rheight: 0,
      };
    }

    return {
      rwidth: containerRef.current.clientWidth,
      rheight: containerRef.current.clientHeight,
    };
  };

  const updateDimensionsImmediate = () => {
    if (!mounted) {
      return;
    }
    const { rwidth, rheight } = getContainerSize();

    if (rwidth && rheight) {
      // 目前容器的尺寸 / 设计稿尺寸

      const w = rwidth / width;
      const h = rheight / height;

      const isLong = !!(w < h);
      let s = isLong ? w : h;
      if (maxScale && s > maxScale) {
        s = maxScale;
      }
      if (s !== scale) {
        setScale(s);
      }
      const leftNum = (rwidth - width * h) / 2;
      const topNum = (rheight - height * w) / 2;

      setPosition((p) => {
        return {
          ...p,
          left: leftNum <= 0 ? '0' : leftNum + 'px',
          top: topNum <= 0 ? '0' : topNum + 'px',
        };
      });
    }
  };
  // TODO优化点: 套上一层debounce
  const handleResize = updateDimensionsImmediate;

  useResizeDetector({
    onResize: handleResize,
    targetRef: containerRef,
  });

  useEffect(() => {
    if (mounted) {
      handleResize();
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <ResponsiveWrap ref={containerRef}>
      <ResponsiveInner scale={scale} {...position}>
        {children}
      </ResponsiveInner>
    </ResponsiveWrap>
  );
}
