import { ProColumns, ProForm } from '@ant-design/pro-components';
import { InputNumber } from 'antd';
import { nanoid } from 'nanoid';
import React from 'react';
import { useMemo } from 'react';
import { CronDateTypeSelect, CronDayNumberInput } from '../Cron';
import { EditDayRight } from './EditDayRight';
import { getInputNumberParseDecimalProps } from '../utils';
import { EditableProTableProps } from '@ant-design/pro-table/lib/components/EditableTable';
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

  // if (isStagePrice) {
  //   d.day = {
  //     beginDay: last && last.day ? last?.day?.endDay + 1 : 1,
  //     endDay: last && last.day ? last?.day?.endDay + 2 : 2,
  //   };
  // }

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
  isStagePrice,
  value = [],
  onChange,
}: {
  isStagePrice: boolean;
  value?: any[];
  onChange?: Function;
}) => {
  const editableKeys = useMemo(() => {
    return value.map((d) => d.id);
  }, [value]);
  const handleChange = (val: IExtCostConfig[]) => {
    const curWay = val && val.length ? val[0]?.way || 1 : 1;

    const newVal = formatDataSource(val, {
      curWay,
      isStagePrice,
    });
    console.log(newVal, 'newVal');
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
        return (
          <CronDayNumberInput width={120} disabled={Boolean(row.index && row.index > 0)} min={0} />
        );
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

      renderFormItem(row, b, formInstance, d) {
        return <EditDayRight />;
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
      width: isStagePrice ? '300px' : '500px',
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
    columns: columns,
    recordCreatorProps: {
      style: {
        display: isStagePrice || value.length == 0 ? 'block' : 'none',
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

  return {
    innerform,
    value: valueMemo,
    columns,
    editableProTableConfig,
  };
};
