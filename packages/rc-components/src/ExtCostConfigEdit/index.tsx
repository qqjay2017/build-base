import { EditableProTable } from '@ant-design/pro-components';
import { Card, Checkbox } from 'antd';
import React, { useState } from 'react';
import { IExtCostConfig, useExtCostConfigEdit } from './useExtCostConfigEdit';

export interface IExtCostConfigEditProps {
  isStagePrice: boolean;
  dataSource?: any[];
  setDataSource?: (dataSource: any[]) => void;
}

export * from './useExtCostConfigEdit';
