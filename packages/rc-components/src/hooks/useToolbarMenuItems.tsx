import { formatOrderStatus, orderStatusTypeMap } from '@core/shared';
import { useMemo, useState } from 'react';

export interface IUseToolbarMenuItemsProps {
  apiData?: {
    orderStatus: number;
    num: number;
  }[];
  onChange?: Function;
  numPath?: string;
  statusPath?: string;
  statusList?: number[] | string[];
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
  statusList = [],
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
    const allStatusKeys: Record<string, any> = {};
    apiData
      .filter((ad) => ad[statusPath] !== undefined)
      .forEach((ad) => {
        allStatusKeys[ad[statusPath]] = {
          ...ad,
          ...orderStatusTypeMap[ad[statusPath]],
        };
      });
    statusList.forEach((status) => {
      if (!allStatusKeys[status]) {
        allStatusKeys[status] = orderStatusTypeMap[status];
      }
    });

    const apiDataArr = Reflect.ownKeys(allStatusKeys)
      .map((key) => {
        const curItem = allStatusKeys[key as string];
        if (curItem) {
          return {
            ...curItem,
            key: String(curItem.value),
            label: `${curItem.label}${curItem.num && curItem.num > 0 ? `(${curItem.num})` : ''}`,
          };
        }
      })
      .filter(Boolean)
      .sort((a, b) => a.sort - b.sort);

    //   const apiDataArr = apiData
    //     .filter((ad) => ad[statusPath] !== undefined)
    //     .map((ad) => {
    //       const label = formatOrderStatus(ad[statusPath]);
    //       const num = ad[numPath];

    //       return {
    //         ...ad,
    //         key: String(ad[statusPath]),
    //         label:,
    //       };
    //     });
    //   statusList.forEach((s) => {
    //     if (!apiDataArr.find((a) => a.key === String(s))) {
    //       apiDataArr.push({
    //         ...s,
    //         key: String(s),
    //         label: formatOrderStatus(s),
    //       });
    //     }
    //   });
    //  const  apiDataArrSoter = apiDataArr.sort((a, b) => {

    //   })

    return apiDataArr;
  }, [apiData, statusList]);

  const toolbarMenu = useMemo(() => {
    return {
      multipleLine: true,
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
