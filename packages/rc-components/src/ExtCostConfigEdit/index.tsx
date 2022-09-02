import { EditableProTable } from '@ant-design/pro-components';
import { Card, Checkbox } from 'antd';
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
  const { editableProTableConfig, extCostFlag, setExtCostFlag, ExtCostFlagSwitch } =
    useExtCostConfigEdit({
      isStagePrice: false,
      value: dataSource,
      onChange: setDataSource,
    });
  return (
    <Card title={<ExtCostFlagSwitch />}>
      {JSON.stringify(extCostFlag)}
      <EditableProTable<IExtCostConfig> {...editableProTableConfig}></EditableProTable>
    </Card>
  );
};

export * from './useExtCostConfigEdit';
