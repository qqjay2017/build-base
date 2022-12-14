import { myRequest, MyRequestOptions } from "./request";

// const headers = {
//   // Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN") || "",
//   // ct: localStorage.getItem("ct") || 1,
//   // fp: localStorage.getItem("fp") || "",
//   "depend-uri": "/api/cms/v1/help/index/1",
//   "depend-method": "GET",
// };

export interface CmsGetSystemArticleApiData {
  id: number;
  createdId?: any;
  createdName?: any;
  createdDatetime?: any;
  modiId?: any;
  modiName?: any;
  modiDatetime?: any;
  tenantId?: any;
  busCode?: any;
  delFlag?: any;
  categoryId?: any;
  channel?: any;
  title: string;
  summary?: any;
  content?: any;
  sortNum?: any;
  platformCode?: any;
  systemId?: any;
  status?: any;
  path: string;
}

const headers = {
  "depend-uri": `/api/cms/v1/help/index/1`,
  "depend-method": "GET",
};

const suffix = "/api/cms";

export interface ICmsGetSystemArticleListApiProps {
  categoryId?: string | number;
  channel?: string | number;
  platformCode?: string | number;
  systemId?: string | number;
}

export const cmsGetSystemArticleListApi = async (
  data: ICmsGetSystemArticleListApiProps = {},
  options?: MyRequestOptions
): Promise<CmsGetSystemArticleApiData[]> => {
  let _data = {
    channel: 1,
    platformCode: 1,
    ...data,
  };
  return myRequest(`${suffix}/v1/help/systemArticleList`, {
    method: "post",
    data: _data,
    headers,
    ...options,
  });
};

export interface IHelpIndexList {
  id: string;
  name: string;
  parentId: string;
  init: number;
  path?: string;
  systemId: string;
  children: IHelpIndexList[];
}

export interface ICmsGetHelpIndexListApiProps extends Record<string, any> {
  platformCode?: number;
  channel?: number;
}

// 首页api
export const cmsGetHelpIndexListApi = async (
  data: ICmsGetHelpIndexListApiProps,
  options?: MyRequestOptions
): Promise<IHelpIndexList[]> => {
  const { platformCode = 1, channel = 1, ...other } = data;
  return new Promise(async (resolve, reject) => {
    try {
      const r = await myRequest<{
        helpCenterList: any[];
        systemHelpList: any[];
      }>(`${suffix}/v1/help/index/${platformCode}/${channel}`, {
        method: "get",

        headers,
        ...options,
      });

      let resArr = r.helpCenterList || [];
      if (r.systemHelpList && r.systemHelpList.length) {
        resArr = resArr.concat({
          name: "系统帮助",
          id: "xtbz",
          children: r.systemHelpList,
        });
      }

      resolve(resArr);
    } catch (error) {
      reject([]);
    }
  });
};

// 搜索文章

export interface ICmsPostHelpSearchApiRes {
  total: number;
  rows: ICmsPostHelpSearchApiResRow[];
}

export interface ICmsPostHelpSearchApiResRow {
  id: any;
  createdId: any;
  createdName: string;
  createdDatetime: any;
  modiId: any;
  modiName: string;
  modiDatetime: any;
  tenantId: number;
  busCode: string;
  delFlag: number;
  categoryId: string;
  channel: number;
  title: string;
  summary: string;
  content?: any;
  sortNum: number;
  platformCode: string;
  systemId: number;
  status?: number;
  path: string;
}

export interface ICmsPostHelpSearchApiProps extends Record<string, any> {
  platformCode?: number;
  content: string;
  channel?: string | number;
  systemIds?: number[];
  pageNum: number;
  pageSize: number;
}

export const cmsPostHelpSearchApi = async (
  data: ICmsPostHelpSearchApiProps,
  options?: MyRequestOptions
): Promise<ICmsPostHelpSearchApiRes> => {
  const {
    platformCode = 1,
    content = "",
    channel = 1,
    systemIds = [0],
    pageNum = 1,
    pageSize = 10,
    ...other
  } = data;
  return myRequest(`${suffix}/v1/help/search`, {
    method: "post",
    data: {
      platformCode,
      content,
      channel,
      systemIds,
      pageNum,
      pageSize,
      ...other,
    },
    headers,
    ...options,
  });
};

export interface ICmsGetHelpGetCategoryApiRes {
  id: string;
  name: string;
  parentId: string;
  init: number;
  systemId?: any;
  sysId: any;
  path?: any;
  isLeaf?: boolean;
  selectable?: any;
  children?: ICmsGetHelpGetCategoryApiRes[];
}
// 文章详情的目录

function findIsLead(res: ICmsGetHelpGetCategoryApiRes[], idMap: IdMap) {
  return res.map((r) => {
    if (r && r.children && r.children.length) {
      r.children = findIsLead(r.children, idMap);
    }
    const selectable = !!r.path;
    if (selectable) {
      idMap[r.id] = r;
    }
    return {
      ...r,
      isLeaf: selectable,
      selectable: selectable,
    };
  });
}

export type IdMap = Record<string, ICmsGetHelpGetCategoryApiRes>;
export const cmsGetHelpGetCategoryApi = (
  platformCode = 1,
  channel = 1,
  options?: MyRequestOptions
): Promise<{
  res: ICmsGetHelpGetCategoryApiRes[];
  idMap: IdMap;
}> => {
  return new Promise(async (resolve, reject) => {
    try {
      const r = await myRequest<{
        helpCenterList?: any[];
        systemHelpList?: any[];
      }>(`${suffix}/v1/help/getCategory/${platformCode}/${channel}`, {
        method: "get",
        data: {},
        headers: {
          "depend-method": "GET",
          "depend-uri": "/api/cms/v1/help/index/1",
        },
        ...options,
      });
      const idMap: IdMap = {};
      let systemHelpList = r.systemHelpList || [];
      if (systemHelpList.length) {
        systemHelpList = [
          {
            channel: null,
            id: "xtzn",
            name: "系统指南",
            parentId: "0",
            path: null,
            sortNum: null,
            sysId: null,
            children: systemHelpList.map((r) => {
              return {
                ...r,
                parentId:'xtzn'
              }
            }),
          },
        ];
      }
      const res = findIsLead(
        (systemHelpList).concat(r.helpCenterList || []),
        idMap
      );

      resolve({
        res: res,
        idMap: idMap,
      });
    } catch (error) {
      reject([]);
    }
  });
};

// 文章详情

export const cmsGetHelpById = (id: string, options?: MyRequestOptions) => {
  return myRequest<any[]>(`${suffix}/v1/help/${id}`, {
    method: "get",
    data: {},
    headers: {
      "depend-method": "GET",
      "depend-uri": "/api/cms/v1/help/index/1",
    },
    ...options,
  });
};
