import styled from 'styled-components';
import BarLoader from 'react-spinners/BarLoader';
import BeatLoader from 'react-spinners/BeatLoader';
import BounceLoader from 'react-spinners/BounceLoader';
import CircleLoader from 'react-spinners/CircleLoader';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import ClipLoader from 'react-spinners/ClipLoader';
import ClockLoader from 'react-spinners/ClockLoader';
import DotLoader from 'react-spinners/DotLoader';
import FadeLoader from 'react-spinners/FadeLoader';
import ScaleLoader from 'react-spinners/ScaleLoader';
import React from 'react';
import { LoaderHeightWidthProps } from 'react-spinners/helpers/props';
import { Spin } from 'antd';

const SpinnerWrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function SpinnersBar(props: LoaderHeightWidthProps) {
  return (
    <SpinnerWrap>
      <BarLoader color="#1677FF" {...props} />
    </SpinnerWrap>
  );
}

export function SpinnersBeat(props: LoaderHeightWidthProps) {
  return (
    <SpinnerWrap>
      <BeatLoader color="#1677FF" {...props} />
    </SpinnerWrap>
  );
}

export function SpinnersBounce(props: LoaderHeightWidthProps) {
  return (
    <SpinnerWrap>
      <BounceLoader color="#1677ff" {...props}></BounceLoader>
    </SpinnerWrap>
  );
}
export function SpinnersCircle(props: LoaderHeightWidthProps) {
  return (
    <SpinnerWrap>
      <CircleLoader color="#1677ff" {...props}></CircleLoader>
    </SpinnerWrap>
  );
}
export function SpinnersClimbingBox(props: LoaderHeightWidthProps) {
  return (
    <SpinnerWrap>
      <ClimbingBoxLoader color="#1677ff" {...props}></ClimbingBoxLoader>
    </SpinnerWrap>
  );
}
export function SpinnersClip(props: LoaderHeightWidthProps) {
  return (
    <SpinnerWrap>
      <ClipLoader color="#1677ff" {...props}></ClipLoader>
    </SpinnerWrap>
  );
}
export function SpinnersClock(props: LoaderHeightWidthProps) {
  return (
    <SpinnerWrap>
      <ClockLoader color="#1677ff" {...props}></ClockLoader>
    </SpinnerWrap>
  );
}
export function SpinnersDot(props: LoaderHeightWidthProps) {
  return (
    <SpinnerWrap>
      <Spin color="#1677ff" {...props}></Spin>
    </SpinnerWrap>
  );
}
export function SpinnersFade(props: LoaderHeightWidthProps) {
  return (
    <SpinnerWrap>
      <FadeLoader color="#1677ff" {...props}></FadeLoader>
    </SpinnerWrap>
  );
}
export function SpinnersScale(props: LoaderHeightWidthProps) {
  return (
    <SpinnerWrap>
      <ScaleLoader color="#1677ff" {...props}></ScaleLoader>
    </SpinnerWrap>
  );
}
