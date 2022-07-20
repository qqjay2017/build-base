import { ISupportIndexProps } from '../SupportIndex';
import React from 'react';
import styled from 'styled-components';
import SupportBg from '../common/SupportBg';
import SearchBlock from '../common/SearchBlock';
import { SearchLeftTree } from '../common/SearchLeftTree';
import { useRequest } from 'ahooks';
import { cmsGetHelpById, cmsGetHelpGetCategoryApi } from '@core/service-api';
import { useState } from 'react';
export interface ISupportDtProps extends ISupportIndexProps {
    id:string
}

const SearchSupportBg = styled(SupportBg)`
  height: 220px;
  min-height: 220px;
`;
const SearchWrap = styled.div`
  display: flex;
  background-color: #fff;
`;
export function SupportDt({ onTitleClick, onSearch }: ISupportDtProps) {
    const [selectId , setSelectId] = useState('')
   const {data:helpGetCategoryData} =  useRequest(()=>cmsGetHelpGetCategoryApi(),{

    })

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
      <SearchLeftTree data={helpGetCategoryData} selectId={selectId} setSelectId={setSelectId} />
      </SearchWrap>

    </div>
  );
}
