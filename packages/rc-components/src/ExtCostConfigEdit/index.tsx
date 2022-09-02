import { EditableProTable } from '@ant-design/pro-components';
import { Card, Checkbox } from 'antd';
import React, { useState } from 'react';
import { IExtCostConfig, useExtCostConfigEdit } from './useExtCostConfigEdit';

export interface IExtCostConfigEditProps {
  isStagePrice: boolean;
  dataSource?: any[];
  setDataSource?: (dataSource: any[]) => void;
}
export const ExtCostConfigEdit = ({ dataSource, setDataSource }: IExtCostConfigEditProps) => {
  const {
    editableProTableConfig,
    extCostFlag,
    setExtCostFlag,
    ExtCostFlagSwitch,

    setExtCostRule,
    extCostRule,
    ExtCostSwitch,
  } = useExtCostConfigEdit({
    value: dataSource,
    onChange: setDataSource,
  });
  return (
    <Card title={<ExtCostFlagSwitch />} extra={<ExtCostSwitch />}>
      {JSON.stringify(extCostFlag)}
      <p>extCostRule{JSON.stringify(extCostRule)}</p>
      <EditableProTable<IExtCostConfig> {...editableProTableConfig}></EditableProTable>
    </Card>
  );
};

export * from './useExtCostConfigEdit';
