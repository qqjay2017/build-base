import React from 'react';
import { IDayNumberInputProps, CronDayNumberInput } from './DayNumberInput';
import { Space, SpaceProps } from 'antd';
import { IDaySelectProps, CronDaySelect } from './DaySelect';
import { IMonSelectProps, CronMonSelect } from './MonSelect';
import styled from 'styled-components';

export type ICronGroupBaseItem = string | React.ReactElement;

export interface ICronGroupBaseProps {
  items: ICronGroupBaseItem[];
  spaceProps?: SpaceProps;
}

const INTERNAL_PREFIX_KEY = 'cron-group-key';

const CronGroupSpan = styled.span`
  font-size: 14px;

  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  line-height: 20px;
`;

export function CronGroupBase({ items, spaceProps = {} }: ICronGroupBaseProps) {
  if (!items || !Array.isArray(items)) {
    return null;
  }
  return (
    <Space wrap={true} {...spaceProps}>
      {items.map((item, index) => {
        if (typeof item === 'string') {
          return <CronGroupSpan key={`${INTERNAL_PREFIX_KEY}-${index}`}>{item}</CronGroupSpan>;
        } else {
          return item;
        }
      })}
    </Space>
  );
}
