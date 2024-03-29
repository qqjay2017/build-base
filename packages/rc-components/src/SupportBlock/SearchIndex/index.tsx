import SupportBg from '../common/SupportBg';
import styled from 'styled-components';
import { Pagination } from 'antd';

import React, { PropsWithChildren, useContext, useState } from 'react';
import SearchBlock from '../common/SearchBlock';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { cmsPostHelpSearchApi } from '@core/service-api';
import { ISupportIndexProps } from '../SupportIndex';
import {SpinnersDot} from '../../Spinners/index'
import '../../styles/common.less'
import { Empty } from '../../Empty';
import { onError } from '../../utils/onError';
import { ConfigContext } from '../../ConfigProvider/context';
export interface ISearchIndexProps extends ISupportIndexProps {
  content: string;
}

const SearchSupportBg = styled(SupportBg)`
  height: 220px;
  min-height: 220px;
`;

const SearchWrap = styled.div`
  display: flex;
  background-color: #fff;
`;

const SearchRight = styled.div`
  flex: 1;
`;

const SearchInfoTip = styled.div`
  min-height: 40px;
  background: #e6f7ff;
  border-radius: 2px;
  border: 1px solid #91d5ff;
  margin: 24px;
 
  line-height:40px;

  padding: 0 18px;
  * {
    word-break:break-all;
    
  }
`;

const NormalSpan = styled.span`
  font-size: 14px;
  word-break:break-all;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
`;

const LightSpan = styled(NormalSpan)`
  color: rgba(22, 119, 255, 1);
  word-break:break-all;
`;

const SearchResContent = styled.div`
  border-bottom: 1px solid rgba(232, 232, 232, 1);
  cursor: pointer;
`;

const ResTitle = styled.div`
  font-size: 16px;

  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  padding-top: 24px;

  padding: 24px 0 16px 24px;
  .esHighlight {
    color: rgba(22, 119, 255, 1);
  }
`;

const ResContent = styled.div`
  font-size: 14px;

  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 24px;
  padding: 0 24px 16px 24px;
`;

const StylePagination = styled(Pagination)`
  display: flex;
  padding: 0 40px 0 24px !important;
  .ant-pagination-total-text {
    flex: 1;
  }
`;
const SearchIndexStyle = styled.div`
  width:100%;
  min-height:100vh;
  background-color:#fff;
`

export function SearchIndex({ content, onTitleClick,onSearch }: ISearchIndexProps) {
  const [pageInfo, setPageInfo] = useState({
    pageNum: 1,
    pageSize: 10,
  });
  const configContext = useContext(ConfigContext);
  const { data: searchData ,loading} = useRequest(() =>
    cmsPostHelpSearchApi({
      pageNum: pageInfo.pageNum,
      pageSize: 10,
      content: content,
    },{
      API_URL:configContext.API_URL,
      onError:onError
    }),
    {
      refreshDeps:[
        content,
        pageInfo.pageNum,
        pageInfo.pageSize
      ]
    }
  );
 
  const onChangePage = (page: number, pageSize: number)=>{
    
    setPageInfo({
        pageNum:page,
        pageSize:pageSize
    })

  }
  const _onTitleClick = (id) => {
    if (!id) {
      return false;
    }
    onTitleClick && onTitleClick(id);
  };

  return (
    <SearchIndexStyle>
      <SearchSupportBg>
        <SearchBlock content={content} onSearch={onSearch} />
      </SearchSupportBg>
      <SearchWrap>
        <SearchRight>
          <SearchInfoTip>
            <InfoCircleOutlined style={{ color: 'rgba(22, 119, 255, 1)', marginRight: '8px' }} />
            <NormalSpan>搜索“</NormalSpan>
            <LightSpan>{content}</LightSpan>
            <NormalSpan>”，共找到</NormalSpan>
            <LightSpan>{searchData?.total || 0}</LightSpan>
            <NormalSpan>个相关内容。</NormalSpan>
          </SearchInfoTip>
          {
            loading ?  <SpinnersDot /> : searchData && (!searchData.rows || !searchData.rows.length) ? <Empty /> :   (searchData?.rows || []).map((s) => {
              return (
                <SearchResContent key={s.id + s.title} onClick={() => _onTitleClick(s.id)}>
                  <ResTitle
                    dangerouslySetInnerHTML={{
                      __html: s.title || '',
                    }}
                  />
                  <ResContent
                    dangerouslySetInnerHTML={{
                      __html: s.content || '',
                    }}
                  ></ResContent>
                </SearchResContent>
              );
            })
            
          }
        
          <div>
            {
              searchData && searchData.total > 0 ? <StylePagination
              showSizeChanger
              style={{ marginTop: '16px', marginBottom: '24px' }}
              showQuickJumper={true}
              pageSizeOptions={[10,20,50,100]}
              defaultCurrent={1}
              
              showTotal={(total) =>
                `共 ${total} 条记录,第${pageInfo.pageNum}/${Math.ceil(total / pageInfo.pageSize)}页`
              }
              pageSize={pageInfo.pageSize}
              onChange={onChangePage}
              current={pageInfo.pageNum}
              total={searchData?.total || 0}
            />:null
            }
          </div>
        </SearchRight>
      </SearchWrap>
    </SearchIndexStyle>
  );
}
