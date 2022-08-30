import { useRequest } from 'ahooks';
import { Service } from 'ahooks/lib/useRequest/src/types';
import { IUseToolbarMenuItemsProps, useToolbarMenuItems } from './useToolbarMenuItems';

export const useToolbarMenuItemsWithRequest = ({
  service,
  onChange,
  statusList = [],
  numPath = 'num',
  statusPath = 'orderStatus',
}: IUseToolbarMenuItemsProps & {
  service: Service<any[], []>;
}) => {
  const {
    data: apiData,
    run,
    refresh,
  } = useRequest(service, {
    manual: true,
  });

  const { orderStatus, toolbarMenu } = useToolbarMenuItems({
    apiData: apiData || [],
    onChange,
    statusList,
    numPath,
    statusPath,
  });

  return {
    run,
    /**
     * 当前的key
     */
    orderStatus,
    /**
     * freeTable的toolbar属性
     */
    toolbarMenu,
    /**
     * freeTable的toolbar属性
     */
    toolbar: toolbarMenu,
    refresh,
  };
};
