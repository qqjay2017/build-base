import { ISupportIndexProps } from '../SupportIndex';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import '../common/index.less';
import SupportBg from '../common/SupportBg';
import SearchBlock from '../common/SearchBlock';
import { SearchLeftTree } from '../common/SearchLeftTree';
import { useRequest } from 'ahooks';
import { cmsGetHelpGetCategoryApi } from '@core/service-api';
import Empty from '../../Empty';
import { base64Encode } from '@core/shared';
const EmptyWrap = styled.div`
  width: 100%;
  height: 500px;
`;

const IframeWrap = styled.div`
width:100%;
  padding: 24px;
`;

const IframeStyle = styled.iframe`
  width: 100%;
  min-height: 700px;
  border: 0;
  outline: 0;
`;

export interface ISupportDtProps extends ISupportIndexProps {
  id: string;
}

const SearchSupportBg = styled(SupportBg)`
  height: 220px;
  min-height: 220px;
`;
const SearchWrap = styled.div`
  display: flex;
  background-color: #fff;
`;
export function SupportDt({ onTitleClick, onSearch, id }: ISupportDtProps) {
  const [selectId, setSelectId] = useState(id || '');
  const { data: helpGetCategoryData } = useRequest(() => cmsGetHelpGetCategoryApi(), {});
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

  const userInfoBase64 = base64Encode(userInfoStr || '');
  if (!userInfoStr || !userInfoBase64) {
    return null;
  }

  // const {data:artData} = useRequest(()=>cmsGetHelpById(selectId),{
  //     refreshDeps:[selectId],
  //     ready:!!selectId
  // })
  // curArtMemo(){}

  return (
    <div>
      <SearchSupportBg>

        <SearchBlock content="" onSearch={onSearch} />
      </SearchSupportBg>
      <SearchWrap>
        <SearchLeftTree
          data={helpGetCategoryData?.res}
          artDtMemo={artDtMemo}
          selectId={selectId}
          setSelectId={setSelectId}
        />
        {artDtMemo && artDtMemo.path ? (
          <IframeWrap>
            <IframeStyle
              src={'/cms-static/' + artDtMemo.path + '?busCode=cms1010&info=' + userInfoBase64}
            />
          </IframeWrap>
        ) : (
          <EmptyWrap>
            <Empty imgWidth="120px" />
          </EmptyWrap>
        )}
      </SearchWrap>
    </div>
  );
}
