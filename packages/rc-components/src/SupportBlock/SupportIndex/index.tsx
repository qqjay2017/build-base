
import React from 'react';

import SupportBg from './SupportBg';
import './index.less';
import { useRequest } from 'ahooks';
import { cmsGetHelpIndexListApi } from '@core/service-api';
import SearchBlock from '../common/SearchBlock';
import ArtBlock from './ArtBlock';

export interface ISupportIndexProps {
  onTitleClick?:(id?:string)=>void, 
  onMoreClick?:(id?:string)=>void, 
}


export function SupportIndex(props:ISupportIndexProps) {
  const { data, loading } = useRequest(() => cmsGetHelpIndexListApi({
    platformCode:1,
    channel:1
  }));
  return (
    <SupportBg>
      <SearchBlock />
      <ArtBlock {...props} data={data || []} />
    </SupportBg>
  );
}


