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
  return new Promise(async( resolve,reject)=>{
  try {
    const r = await  myRequest<{
      helpCenterList:any[],
      systemHelpList:any[]
    }>(`${suffix}/v1/help/index/${platformCode}/${channel}`, {
        method: "get",
    
        headers,
      });
    
      resolve(r.helpCenterList.concat(r.systemHelpList))
  } catch (error) {
    reject([])
  }
  })
  
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

export const cmsPostHelpSearchApi = async ({
  platformCode = 1,
  content = '',
  systemIds=[0],
  pageNum=1,
  pageSize=10
}: {
  platformCode?: number;
  content: string;
  systemIds?:number[],
  pageNum:number;
  pageSize:number;

}): Promise<ICmsPostHelpSearchApiRes> => {
  return myRequest(`${suffix}/v1/help/search`, {
    method: "post",
    data:{
      platformCode,
      content,
      systemIds,
      pageNum,
      pageSize
    },
    headers,
  });
};


export interface ICmsGetHelpGetCategoryApiRes {
  id: string;
  name: string;
  parentId: string;
  init: number;
  systemId?: any;
  isLeaf?: boolean;
  selectable?: any;
  children?: ICmsGetHelpGetCategoryApiRes[];
}
// 文章详情的目录

function findIsLead(res: ICmsGetHelpGetCategoryApiRes[]) {

  return res.map((r) => {
    if (r && r.children && r.children.length) {
      r.children = findIsLead(r.children);
    }
    return {
      ...r,
      isLeaf:!!( !r.children || !r.children.length),
      selectable:!!( !r.children || !r.children.length),
    };
  });
}

export const cmsGetHelpGetCategoryApi=(platformCode=1): Promise<ICmsGetHelpGetCategoryApiRes[]> =>{
  return new Promise(async(resolve,reject)=>{

   try {
    const r = await   myRequest<any[]>(`${suffix}/v1/help/getCategory/${platformCode}`, {
      method: "get",
      data:{
        
      },
      headers:{
        'depend-method':'GET',
        'depend-uri':'/api/cms/v1/help/index/1'
      },
    });
    const res = findIsLead(r)

    resolve(res)
   } catch (error) {
    reject([])
   }

  })


  
}

// 文章详情

export const cmsGetHelpById = (id:string)=>{
  return myRequest<any[]>(`${suffix}/v1/help/${id}`, {
    method: "get",
    data:{
      
    },
    headers:{
      'depend-method':'GET',
      'depend-uri':'/api/cms/v1/help/index/1'
    },
  });
}