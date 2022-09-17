import { ProColumns, ProForm } from '@ant-design/pro-components';
import { InputNumber, Space, Switch } from 'antd';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { CronDateTypeSelect, CronDayNumberInput, CronGroupBase } from '../Cron';
import { EditDayRight } from './EditDayRight';
import { getInputNumberParseDecimalProps } from '../utils';
import { EditableProTableProps } from '@ant-design/pro-table/lib/components/EditableTable';
import { confirmPromisify } from '../utils/confirmPromisify';

function isTrueValue(e: unknown) {
  return e === 1 || e === '1' || e === true;
}
export interface IExtCostConfig {
  id: string;
  /**
   * 1 日
   * 2 年
   */
  way: 1 | 2;

  tax: number;

  beginDay?: number;
  endDay?: number;

  deletable?: boolean;
}

export function getExtCostConfigInitDataSource(isStagePrice: boolean) {
  if (isStagePrice) {
    const line1 = getExtCostConfigDefaultDataSource(true);
    const line2 = getExtCostConfigDefaultDataSource(true, line1);
    return [line1, line2];
  } else {
    return [getExtCostConfigDefaultDataSource(false)];
  }
}

export function getExtCostConfigDefaultDataSource(
  isStagePrice: boolean,
  last?: IExtCostConfig,
): IExtCostConfig {
  const d: IExtCostConfig = {
    id: nanoid(),
    way: 1,
    tax: 0,
    beginDay: isStagePrice ? (last?.endDay || 0) + 1 : undefined,
    endDay: isStagePrice ? (last?.endDay || 0) + 2 : undefined,
  };

  return d;
}

function formatDataSource(
  val: IExtCostConfig[] = [],
  {
    curWay = 1,
    isStagePrice = false,
  }: {
    curWay?: 1 | 2;
    isStagePrice?: boolean;
  } = {},
): IExtCostConfig[] {
  const newVal = val.map((v, index) => {
    return {
      ...v,

      tax: v.tax || 0,
      way: curWay,
      beginDay: isStagePrice
        ? index > 0
          ? (val[index - 1].endDay || 0) + 1
          : v.beginDay
        : undefined,
      endDay: isStagePrice ? v?.endDay! : undefined,
    };
  });

  return newVal;
}

export const useExtCostConfigEdit = ({
  value = [],
  onChange,
}: {
  value?: any[];
  onChange?: Function;
}) => {
  const [isExtCostFlag, setIsExtCostFlag] = useState<boolean>(false);
  const [isStagePrice, setIsStagePrice] = useState<boolean>(false);
  const editableKeys = useMemo(() => {
    return value.map((d) => d.id);
  }, [value]);
  const handleChange = (val: IExtCostConfig[]) => {
    const curWay = val && val.length ? val[0]?.way || 1 : 1;

    const newVal = formatDataSource(val, {
      curWay,
      isStagePrice,
    });

    onChange && onChange(newVal);
  };
  const [innerform] = ProForm.useForm();

  const columns: ProColumns<IExtCostConfig, 'text'>[] = useMemo(() => {
    // const idColumn: ProColumns<IExtCostConfig, 'text'> = {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   width: '100px',
    //   editable: false,
    // };
    const dayColumnLeft: ProColumns<IExtCostConfig, 'text'> = {
      title: '展期天数',
      key: 'beginDay',
      dataIndex: 'beginDay',
      width: '150px',
      colSpan: 2,

      renderFormItem(row, b, formInstance, d) {
        return <CronDayNumberInput width={120} disabled={true} min={1} />;
      },
    };

    const dayColumnRight: ProColumns<IExtCostConfig, 'text'> = {
      title: '展期天数-终止天数',
      key: 'endDay',
      dataIndex: 'endDay',
      width: '200px',
      colSpan: 0,
      formItemProps: (form, config: any) => ({
        rules: [
          {
            validator: (_, endDay) => {
              if (!isStagePrice) {
                return Promise.resolve();
              }

              const { beginDay } = config.entity;

              if (beginDay >= endDay) {
                return Promise.reject('结束天数必须大于起始天数');
              } else {
                return Promise.resolve();
              }
            },
          },
        ],
      }),

      renderFormItem(row, b, { validateFields }, d) {
        return <EditDayRight validateFields={validateFields} />;
      },
    };
    const rateColumnWay: ProColumns<IExtCostConfig, 'text'> = {
      title: '费率',
      key: 'way',
      dataIndex: 'way',
      width: '100px',
      colSpan: 2,

      renderFormItem(row, { isEditable }) {
        return <CronDateTypeSelect disabled={row.index !== 0} />;
      },
    };

    const rateColumnTax: ProColumns<IExtCostConfig, 'text'> = {
      title: '费率Tax',
      key: 'tax',
      dataIndex: 'tax',
      width: '200px',
      colSpan: 0,

      renderFormItem(row, { isEditable }) {
        return (
          <InputNumber
            {...getInputNumberParseDecimalProps({
              fractionDigits: 6,
            })}
            addonAfter="%"
            style={{ width: '160px' }}
            step={0.000001}
            max={100}
            min={0}
          />
        );
      },
    };
    const remarkColumn: ProColumns<IExtCostConfig, 'text'> = {
      title: '说明',

      renderFormItem(row: any) {
        return isStagePrice ? (
          `${row.entity.beginDay}-${row.entity.endDay}天（含），每日的服务费=应收金额*费率`
        ) : (
          <div>
            <span style={{ marginRight: '24px' }}>每日的服务费=应收/应付金额*费率 </span>
            <span> 年息=应收/应付金额*费率/360*天数</span>
          </div>
        );
      },
    };
    const actionColumn: ProColumns<IExtCostConfig, 'text'> = {
      title: '操作',
      valueType: 'option',
      width: '150px',
    };
    if (isStagePrice) {
      return [
        dayColumnLeft,
        dayColumnRight,
        rateColumnWay,
        rateColumnTax,
        remarkColumn,
        actionColumn,
      ];
    } else {
      return [rateColumnWay, rateColumnTax, remarkColumn, actionColumn];
    }
  }, [isStagePrice]);

  const valueMemo = useMemo(() => {
    if (!value || !value.length) {
      return [];
    }
    return value.map((v, index) => {
      return {
        ...v,
        deletable: isStagePrice ? (index > 1 && index == value.length - 1 ? true : false) : false,
      };
    });
  }, [value, isStagePrice]);

  const editableProTableConfig: EditableProTableProps<any, any> = {
    controlled: true,
    scroll: {
      x: 1200,
    },
    rowKey: 'id',
    value: valueMemo,
    maxLength: 10,
    columns: columns as any,
    recordCreatorProps: {
      style: {
        display: !isExtCostFlag ? 'none' : isStagePrice || value.length == 0 ? 'block' : 'none',
        backgroundColor: '#E6F7FF',
        color: '#1890ff',
        borderColor: '#91D5FF',
      },
      creatorButtonText: '添加',
      newRecordType: 'dataSource',
      position: 'bottom',
      record: (index) => {
        return getExtCostConfigDefaultDataSource(isStagePrice, value[value.length - 1]);
      },
    },
    onChange: (val) => handleChange(val),
    editable: {
      form: innerform,
      formProps: {},
      type: 'multiple',
      editableKeys: editableKeys,

      actionRender: (row, config, defaultDoms) => {
        if (row.deletable) {
          return [defaultDoms.delete];
        } else {
          return [];
        }
      },
    },
  };

  const onIsExtCostFlagChange = (flag) => {
    if (!flag) {
      onChange([]);
    } else {
      onChange(getExtCostConfigInitDataSource(isStagePrice));
    }
  };

  const setExtCostFlag = (e: number | string | boolean, initDataSource = false) => {
    if (isTrueValue(e)) {
      setIsExtCostFlag(true);
      if (initDataSource) {
        onIsExtCostFlagChange(true);
      }
    } else {
      setIsExtCostFlag(false);
      if (initDataSource) {
        onIsExtCostFlagChange(false);
      }
    }
  };

  const setExtCostRule = (e: number | string | boolean, initDataSource = false) => {
    if (isTrueValue(e)) {
      setIsStagePrice(true);
      if (initDataSource) {
        onChange(getExtCostConfigInitDataSource(true));
      }
    } else {
      setIsStagePrice(false);
      if (initDataSource) {
        onChange(getExtCostConfigInitDataSource(false));
      }
    }
  };

  const extCostFlag = useMemo(() => {
    if (isExtCostFlag) {
      return 1;
    } else {
      return 0;
    }
  }, [isExtCostFlag]);

  const extCostRule = useMemo(() => {
    if (isStagePrice) {
      return 1;
    } else {
      return 0;
    }
  }, [isStagePrice]);

  const ExtCostFlagSwitch = () => {
    return (
      <Space>
        展期费用
        <Switch
          checked={isExtCostFlag}
          onChange={(flag) => {
            setExtCostFlag(flag, true);
          }}
        ></Switch>
      </Space>
    );
  };

  const StagePriceSwitch = () => {
    return (
      <CronGroupBase
        items={[
          '按阶段价计算：',
          <Switch
            disabled={!isExtCostFlag}
            checked={isStagePrice}
            onChange={(e) => handleStagePriceChange(e)}
            key={'edit_switch'}
          />,
        ]}
      />
    );
  };

  const handleStagePriceChange = async (flag: boolean) => {
    if (!flag) {
      await confirmPromisify({
        title: '关闭阶段价计算确认',
        content: '是否关闭按阶段价进行计算？',
      });
    }
    onChange(getExtCostConfigInitDataSource(flag));
    setIsStagePrice(flag);
  };

  return {
    innerform,
    value: valueMemo,
    columns,
    editableProTableConfig,
    onIsExtCostFlagChange,
    extCostFlag,
    ExtCostFlagSwitch,
    isExtCostFlag,
    setExtCostFlag,
    StagePriceSwitch,
    ExtCostSwitch: StagePriceSwitch,
    isStagePrice,
    extCostRule,
    setExtCostRule,
  };
};
