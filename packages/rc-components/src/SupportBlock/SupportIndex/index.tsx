import React, { useContext } from 'react';
import SupportBg from '../common/SupportBg';
import '../../styles/common.less'
import { useRequest } from 'ahooks';
import { cmsGetHelpIndexListApi } from '@core/service-api';
import SearchBlock from '../common/SearchBlock';
import ArtBlock from './ArtBlock';
import { onError } from '../../utils/onError';
import { ConfigContext } from '../../ConfigProvider/context';

export interface ISupportIndexProps {
  onTitleClick?: (id?: string) => void;
  onMoreClick?: (id?: string) => void;
  onSearch?: (content?: string) => void;
}

export function SupportIndex(props: ISupportIndexProps) {
  const configContext = useContext(ConfigContext);
  const { data, loading } = useRequest(() =>
    cmsGetHelpIndexListApi({
      platformCode: 1,
      channel: 1,
      
    },{
      API_URL:configContext.API_URL,
      onError:onError
    }),
  );

  return (
    <SupportBg minHeight="100vh">
      <SearchBlock content="" onSearch={props.onSearch} />
      <ArtBlock {...props} loading={loading} data={data || []} />
    </SupportBg>
  );
}
