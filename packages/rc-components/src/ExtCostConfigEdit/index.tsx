import { EditableProTable } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { IExtCostConfig, useExtCostConfigEdit } from './useExtCostConfigEdit';

export interface IExtCostConfigEditProps {
  isStagePrice: boolean;
  dataSource?: any[];
  setDataSource?: (dataSource: any[]) => void;
}
export const ExtCostConfigEdit = ({
  isStagePrice,
  dataSource,
  setDataSource,
}: IExtCostConfigEditProps) => {
  const { editableProTableConfig, innerform, value, columns } = useExtCostConfigEdit({
    isStagePrice,
    value: dataSource,
    onChange: setDataSource,
  });
  return <EditableProTable<IExtCostConfig> {...editableProTableConfig}></EditableProTable>;
};

export * from './useExtCostConfigEdit';
