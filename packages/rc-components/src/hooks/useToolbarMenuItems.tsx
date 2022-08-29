import { formatOrderStatus } from '@core/shared';
import { useMemo, useState } from 'react';

export interface IUseToolbarMenuItemsProps {
  apiData?: {
    orderStatus: number;
    num: number;
  }[];
  onChange?: Function;
  numPath?: string;
  statusPath?: string;
}

export type IUseToolbarMenuItemsKeyType = string | number;

const baseItems = [
  {
    label: '全部',
    key: -1,
  },
];

export const useToolbarMenuItems = ({
  apiData,
  onChange,
  numPath = 'num',
  statusPath = 'orderStatus',
}: IUseToolbarMenuItemsProps = {}) => {
  const [_orderStatus, setOrderStatus] = useState<IUseToolbarMenuItemsKeyType>(-1);
  const orderStatus = useMemo(() => {
    if (_orderStatus === 'all' || _orderStatus === '-1' || _orderStatus === -1) {
      return '';
    } else {
      return _orderStatus;
    }
  }, [_orderStatus]);

  const itemsMemo = useMemo(() => {
    if (!apiData || !apiData.length) {
      return baseItems;
    }
    const apiDataArr = apiData
      .filter((ad) => ad[statusPath] !== undefined)
      .map((ad) => {
        const label = formatOrderStatus(ad[statusPath]);
        const num = ad[numPath];
        return {
          // ...ad,
          key: String(ad[statusPath]),
          label: `${label}${num && num > 0 ? `(${num})` : ''}`,
        };
      });
    return apiDataArr;
  }, [apiData]);

  const toolbarMenu = useMemo(() => {
    return {
      menu: {
        width: '100%',
        type: 'tab',
        activeKey: String(_orderStatus),
        items: itemsMemo,
        onChange: (key: IUseToolbarMenuItemsKeyType) => {
          setOrderStatus(key);
          onChange && onChange(key);
        },
      },
    };
  }, [_orderStatus, itemsMemo, onChange]);

  return {
    orderStatus,
    toolbarMenu,
    [statusPath]: orderStatus,
  };
};
