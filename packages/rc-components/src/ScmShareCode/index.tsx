import React, { memo, useMemo } from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import styled from 'styled-components';
import { useRequest } from 'ahooks';
import {
  IDependHeader,
  IScmPostGenerateShareCodeProps,
  scmPostGenerateShareCode,
} from '@core/service-api';
import { onError } from '../utils';

import { QRCodeSVG ,} from 'qrcode.react';
import { useLocationQuery } from '../hooks';
export interface IScmShareCodeProps {
  /**
   * Tooltip组件的属性
   * 默认  placement="bottom" trigger={['click', 'hover']}
   *
   */
  tooltipProps?: TooltipProps;
  /**
   * 按钮的文字
   * @default '扫码分享'
   */
  btnText?: string;
  /**
   * 接口需要的数据
   * 
   */
  apiData?: IScmPostGenerateShareCodeProps;
  /**
   * 请求头
   */
  headers?: IDependHeader;
  /**
   * 二维码组件props
   * https://www.npmjs.com/package/qrcode.react
   */
  qRProps?:any
}

const TextSpan = styled.span`
  height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #1677ff;
  line-height: 22px;
  cursor: pointer;
`;
const DebugSpan = styled.span`
    display:none;
    opacity:0;
`
export const ScmShareCode = memo(
  ({ tooltipProps, btnText = '扫码分享', apiData = {}, headers = {} }: IScmShareCodeProps) => {
    const {locationQuery} = useLocationQuery()
    const { data: codeData, loading } = useRequest(
      () =>
        scmPostGenerateShareCode({
          data: {
            busId:locationQuery.id,
            ...apiData
          },

          options: {
            headers: {
              'depend-uri': '/api/activiti/v1/tasks/{taskId}/complete/formdata',
              'depend-method': 'POST',
              ...headers,
            },
            onError: onError,
          },
        }),
      {
        // refreshDeps: [apiData],
        refreshDeps:[locationQuery.id,JSON.stringify(apiData)]
      },
    );

    const OverlayComp = useMemo(()=>{
        if(!codeData||!codeData.shareUrl||loading){
            return <span>二维码加载中...</span>
        }
        return <span>
             <QRCodeSVG
                  value={codeData.shareUrl} //value参数为生成二维码的链接
                  size={200} //二维码的宽高尺寸
                  fgColor="#000000" //二维码的颜色
                  imageSettings={{
                    src: `/public/logo/wxLogo.png`,
                    width: 32,
                    height: 32,
                    excavate: false,
                  }}
                />

        </span> 
    },[codeData])

    return (
      <Tooltip
        placement="bottom"
        trigger={['click', 'hover']}
        {...tooltipProps}
        overlay={OverlayComp}
      >
        <TextSpan>{btnText} <DebugSpan>{JSON.stringify(codeData)}</DebugSpan></TextSpan>
      </Tooltip>
    );
  },
);


