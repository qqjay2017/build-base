import { Divider, Input, Pagination, Select, Space } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
const { Option } = Select;
export interface IPageSelectProps<T = any> extends Record<string, any> {
  value: T;
  onChange: (v: T) => {};
}

const PaginationWrap = styled.div`
width:100%;
padding:4px 8px;
display:flex;

justify-content:center;
`

export function PageSelect<T = any>(props: IPageSelectProps<T>) {
  const [items, setItems] = useState(['jack', 'lucy']);

  return (
    <Select
    placeholder="请选择"
    style={{minWidth:'240px'}}
      dropdownRender={(menu) => (
        <>
          <PaginationWrap>
          <Input.Search size='small' placeholder="输入关键字搜索"  />
          </PaginationWrap>
       

          
          <Divider style={{ margin: '8px 0' }} />
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <PaginationWrap>
          <Pagination   total={50} size='small'  showSizeChanger={false}  />
          </PaginationWrap>
         
        </>
      )}
      {...props}
    >
      {items.map((item) => (
        <Option key={item}>{item}</Option>
      ))}
    </Select>
  );
}
