import React from 'react';
import styled from 'styled-components';

import { IHelpIndexList } from '@core/service-api';
import { ISupportIndexProps } from '.';
const ArtBlockWrap = styled.div`
  /* padding: 48px 16%;

  @media (max-width: 600px) {
    padding: 24px 18px;
  } */
`;

const ArtBlockInner = styled.div`
  padding-top: 24px;
`;
const CatName = styled.div`
  position: relative;
  padding-left: 12px;

  font-size: 16px;

  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
  margin-bottom: 24px;
  z-index: 3;

  ::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 22px;
    background-color: rgba(22, 119, 255, 1);
    content: '';
  }
`;
const ModuleBlockWrap = styled.div`
  position: relative;
  z-index: 4;
  width: 100%;
  display: grid;

  grid-gap: 24px;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 304px);
  grid-auto-rows: auto;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 304px);
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 304px);
  }
`;
const ModuleBlock = styled.div`
  margin-right: 24px;
  width: 304px;
  height: 289px;
  background: #ffffff;
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
`;

const ModuleBlockTop = styled.div`
  width: 100%;
  height: 236px;
  padding: 12px 24px 0 24px;
`;

const ModuleName = styled.div`
  height: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
`;

const ModuleBlockBottom = styled.div`
  height: calc(100% - 236px);
  border-top: 1px solid rgba(151, 151, 151, 0.25);
`;

const MoreBtn = styled.div<{active:any}>`
  height: 20px;
  font-size: 14px;

  font-weight: 400;
  color: ${props=>props.active ? '#1677ff':'#00000040'};
  line-height: 20px;
  user-select: none;
  cursor: ${props=>props.active ? 'pointer':'not-allowed'};
`;

const ModuleNameBefore = styled.div`
  width: 36px;
  height: 36px;
  background-color: rgba(22, 119, 255, 0.1);
  background-image: url('/public/website/scm/book.png');
  background-repeat: no-repeat;
  background-size: 45%;
  background-position: center;
  border-radius: 50%;
  margin-right: 16px;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const D3Title = styled.div`
  font-size: 14px;

  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  line-height: 20px;

  padding: 8px 0 8px 14px;
  user-select: none;
  cursor: pointer;
  position: relative;
  &::before {
    position: absolute;
    top: 14px;
    left: 0;
    width: 6px;
    height: 6px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    content: '';
  }
`;
export interface IArtBlockProps  extends ISupportIndexProps{
  data?: IHelpIndexList[]
}
function ArtBlock({ data ,onTitleClick,onMoreClick}: IArtBlockProps) {
  const _onMoreClick = (id)=>{
    if(!id){
      return false;
    }
    onTitleClick &&  onTitleClick(id)
    onMoreClick &&  onMoreClick(id)

  }
  const _onTitleClick = (id)=>{
    if(!id){
      return false;
    }
    onTitleClick &&   onTitleClick(id)

  }
  const getMoreUrl = (arr?:IHelpIndexList[])=>{
    if(!arr||!arr.length){
      return false;
    }
    return arr[0].id

  }
  // const goSearch = (id: string, pid: string, aetList: IHelpIndexList[]) => {
  //   // if (aetList && aetList.length) {
  //   //   const artId = aetList[0].id;
  //   //   history.push('/search/' + artId + '?cid=' + id + '&pcid=' + pid);
  //   // } else {
  //   //   history.push('/search?cid=' + id + '&pcid=' + pid);
  //   // }
  // };
  if (!data || !data.length) {
    return null;
  }
  return (
    <ArtBlockWrap>
      {(data || []).map((d) => {
         if(!d.children||!d.children.length){
          return null;
        }
        return (
          <ArtBlockInner key={d.id + d.name}>
            <ModuleBlockWrap>
              <CatName>{d.name}</CatName>
            </ModuleBlockWrap>

            <ModuleBlockWrap>
              {(d.children || []).map((d2) => {
               
                return (
                  <ModuleBlock key={d2.name + d2.id}>
                    <ModuleBlockTop>
                      <div className="ai-center">
                        <ModuleNameBefore />
                        <ModuleName>{d2.name}</ModuleName>
                      </div>
                      <div>
                        {(d2.children || []).map((d3:any) => {
                          return (
                            <D3Title  onClick={()=>_onTitleClick(d3.id)} key={d3.id + d3.name}>
                              {d3.name}
                            </D3Title>
                          );
                        })}
                      </div>
                    </ModuleBlockTop>
                    <ModuleBlockBottom className="flex-center">
                    <MoreBtn  
                          active={!!getMoreUrl(d2.children)}
                          onClick={()=>_onMoreClick(getMoreUrl(d2.children))}
                        >
                        查看更多
                      </MoreBtn>
                      
                    </ModuleBlockBottom>
                  </ModuleBlock>
                );
              })}
            </ModuleBlockWrap>
          </ArtBlockInner>
        );
      })}
    </ArtBlockWrap>
  );
}

export default ArtBlock;
