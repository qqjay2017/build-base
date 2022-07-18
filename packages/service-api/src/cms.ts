import { myRequest } from "./request";

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

export const cmsGetSystemArticleListApi = async (
  data: any
): Promise<CmsGetSystemArticleApiData[]> => {
  return myRequest(`${suffix}/v1/help/systemArticleList`, {
    method: "post",
    data,
    headers,
  });
};

export interface IHelpIndexList {
  id: string;
  name: string;
  parentId: string;
  init: number;
  systemId: string;
  children: IHelpIndexList[];
  articleList?: IArticleList[];
}

export interface IArticleList {
  id: any;
  createdId?: any;
  createdName?: any;
  createdDatetime?: any;
  modiId?: any;
  modiName?: any;
  modiDatetime?: any;
  tenantId?: any;
  busCode?: any;
  delFlag?: any;
  categoryId: string;
  channel?: any;
  title: string;
  summary?: any;
  content?: any;
  sortNum?: any;
  platformCode?: any;
  systemId: any;
  status?: any;
  path: string;
}

// 首页api
export const cmsGetHelpIndexListApi = async ({
  platformCode = 1,
  channel = 1,
}: {
  platformCode?: number;
  channel?: number;
}): Promise<IHelpIndexList[]> => {
  return myRequest(`${suffix}/v1/help/index/${platformCode}/${channel}`, {
    method: "get",

    headers,
  });
};
