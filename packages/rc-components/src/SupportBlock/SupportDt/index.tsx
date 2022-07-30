import { ISupportIndexProps } from '../SupportIndex';
import React, { useMemo, useState, useRef, useContext } from 'react';
import styled from 'styled-components';

import SupportBg from '../common/SupportBg';
import SearchBlock from '../common/SearchBlock';
import { SearchLeftTree } from '../common/SearchLeftTree';
import { useRequest } from 'ahooks';
import { cmsGetHelpGetCategoryApi } from '@core/service-api';

import { base64Encode } from '@core/shared';
import { useEffect } from 'react';
import { SpinnersDot } from '../../Spinners';

import '../../styles/common.less';
import { onError } from '../../utils/onError';
import { ConfigContext } from '../../ConfigProvider/context';

const IframeWrap = styled.div`
  width: 100%;
  padding: 24px;
`;

const IframeStyle = styled.iframe`
  width: 100%;
  display: block;
  min-height: 700px;
  border: 0;
  outline: 0;
`;

export interface ISupportDtProps extends ISupportIndexProps {
  id: string;
}

const SupportDtStyle = styled.div`
  width: 100%;
  min-height: 100vh;
`;
const SearchSupportBg = styled(SupportBg)`
  height: 220px;
  min-height: 220px;
`;
const SearchWrap = styled.div`
  display: flex;
  background-color: #fff;
`;
export function SupportDt({ onTitleClick, onSearch, id ,}: ISupportDtProps) {
  const [selectId, setSelectId] = useState(id || '');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const configContext = useContext(ConfigContext);
  const { data: helpGetCategoryData, loading } = useRequest(
    () =>
      cmsGetHelpGetCategoryApi(1, 1, {
        
        onError: onError,
        API_URL:configContext.API_URL,
      }),
    {},
  );
  const artDtMemo = useMemo(() => {
    if (!helpGetCategoryData || !helpGetCategoryData.idMap) {
      return null;
    }
    if (!selectId) {
      return null;
    }
    const dt = helpGetCategoryData.idMap[selectId];
    if (dt) {
      return dt;
    } else {
      return null;
    }
  }, [selectId, helpGetCategoryData]);

  const userInfoStr = sessionStorage.getItem('USER_INFO');
  const [iframeHeight, setIframeRef] = useState(700);
  const hasListen = useRef(false);
  const _setSelectId = (_id:string)=>{
    if(_id){
      onTitleClick(_id)
      setSelectId(_id)

    }


  }

  const userInfoBase64 = base64Encode(userInfoStr || '');
  if (!userInfoStr || !userInfoBase64) {
    return null;
  }
  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }
    if (!hasListen.current) {
      iframeRef.current.addEventListener('load', (e) => {
        hasListen.current = true;
        setIframeRef(iframeRef.current.contentWindow.document.body.scrollHeight + 100);
      });
    }
  }, [selectId, artDtMemo?.path]);

  // const {data:artData} = useRequest(()=>cmsGetHelpById(selectId),{
  //     refreshDeps:[selectId],
  //     ready:!!selectId
  // })
  // curArtMemo(){}

  return (
    <SupportDtStyle>
      <SearchSupportBg>
        <SearchBlock content="" onSearch={onSearch} />
      </SearchSupportBg>
      <SearchWrap>
        <SearchLeftTree
          data={helpGetCategoryData?.res}
          artDtMemo={artDtMemo}
          selectId={selectId}
          setSelectId={_setSelectId}
          loading={loading}
        />
        {artDtMemo && artDtMemo.path ? (
          <IframeWrap>
            <IframeStyle
              scrolling="no"
              height={iframeHeight}
              ref={iframeRef}
              src={
`/cms-static/${artDtMemo?.path}?busCode=${artDtMemo?.sysId === '0' ? 'cms1020':'cms1010'}&info=${userInfoBase64}`
              }
            />
          </IframeWrap>
        ) : (
          <SpinnersDot />
        )}
      </SearchWrap>
    </SupportDtStyle>
  );
}
