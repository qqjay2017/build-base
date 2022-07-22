import React from 'react';

import SupportBg from '../common/SupportBg';
import '../common/index.less';
import { useRequest } from 'ahooks';
import { cmsGetHelpIndexListApi } from '@core/service-api';
import SearchBlock from '../common/SearchBlock';
import ArtBlock from './ArtBlock';

export interface ISupportIndexProps {
  onTitleClick?: (id?: string) => void;
  onMoreClick?: (id?: string) => void;
  onSearch?: (content?: string) => void;
}

export function SupportIndex(props: ISupportIndexProps) {
  const { data, loading } = useRequest(() =>
    cmsGetHelpIndexListApi({
      platformCode: 1,
      channel: 1,
    }),
  );

  return (
    <SupportBg minHeight="100vh">
      <SearchBlock content="" onSearch={props.onSearch} />
      <ArtBlock {...props} loading={loading} data={data || []} />
    </SupportBg>
  );
}
