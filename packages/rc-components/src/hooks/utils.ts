import omit from 'lodash/omit';

/**
 * pro table 的request函数  , 将params转成接口要的查询
 * @param params
 * @returns
 */
export function tableParams2Api(params: Record<string, any> = {}): any {
  return {
    pageNum: params.current || 1,
    pageSize: params.pageSize || 10,
    ...omit(params, ['current', 'pageSize']),
  };
}
