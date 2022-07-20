import SupportBg from '../common/SupportBg';
import styled from 'styled-components';
import { Pagination } from 'antd';
import React, { PropsWithChildren, useState } from 'react';
import SearchBlock from '../common/SearchBlock';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { cmsPostHelpSearchApi } from '@core/service-api';
import { ISupportIndexProps } from '../SupportIndex';
import '../common/index.less'
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
  height: 40px;
  background: #e6f7ff;
  border-radius: 2px;
  border: 1px solid #91d5ff;
  margin: 24px;
  margin-right: 111px;
  display: flex;
  align-items: center;
  padding: 0 18px;
`;

const NormalSpan = styled.div`
  font-size: 14px;

  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
`;

const LightSpan = styled(NormalSpan)`
  color: rgba(22, 119, 255, 1);
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

export function SearchIndex({ content, onTitleClick,onSearch }: ISearchIndexProps) {
  const [pageInfo, setPageInfo] = useState({
    pageNum: 1,
    pageSize: 10,
  });
  const { data: searchData } = useRequest(() =>
    cmsPostHelpSearchApi({
      pageNum: 1,
      pageSize: 20,
      content: content,
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
    <div>
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
          {(searchData?.rows || []).map((s) => {
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
          })}
          <div>
            <StylePagination
              showSizeChanger
              style={{ marginTop: '16px', marginBottom: '24px' }}
              showQuickJumper={true}
              defaultCurrent={1}
              showTotal={(total) =>
                `共 ${total} 条记录,第${pageInfo.pageNum}/${Math.ceil(total / pageInfo.pageSize)}页`
              }
              pageSize={pageInfo.pageSize}
              onChange={onChangePage}
              current={pageInfo.pageNum}
              total={searchData?.total || 0}
            />
          </div>
        </SearchRight>
      </SearchWrap>
    </div>
  );
}
