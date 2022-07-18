
import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styled from 'styled-components';

import { ISupportIndexProps } from '../SupportIndex';

const Title = styled.div`
  font-size: 20px;

  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 28px;
  padding-top: 48px;
  margin-bottom: 24px;
  text-align: center;
  position: relative;
  z-index: 4;
`;

const InputWrap = styled.div`
  z-index: 4;
  width: 39%;
  min-width: 300px;
  height: 48px;
  background: #ffffff;
  border-radius: 24px;
  margin: 0 auto;
  margin-bottom: 24px;
  position: relative;
`;

const SearchWrap = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 14px;
  height: 14px;
  top: 13px;
  left: 30px;
  z-index: 9;
  color: rgba(0, 0, 0, 0.45);
`;

const InputStyle = styled.input`
  box-sizing: border-box;
  border-radius: 24px;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;

  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: none;

  transition: all 0.3s;
  height: 100%;
  outline: 0;
  padding-left: 58px;
  :focus-visible {
    outline: 0;
  }
`;

export interface ISearchBlockProps extends ISupportIndexProps{
    content?:string;
}

function SearchBlock({onSearch,content}:ISearchBlockProps) {


  const [inputValue, setInputValue] = useState(content || '');
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const inputValueTrim = inputValue.trim();

    if (e.keyCode == 13) {
      onSearch && onSearch(inputValueTrim||'')
    }
  };
  return (
    <div>
      <Title>帮助中心</Title>

      <InputWrap>
        <SearchWrap>
          <SearchOutlined />
        </SearchWrap>

        <InputStyle
          placeholder="请输入关键词搜索"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => onKeyDown(e)}
        />
      </InputWrap>
    </div>
  );
}

export default SearchBlock;
