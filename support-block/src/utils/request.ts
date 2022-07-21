import axios from "axios";

const headers = {
  Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN") || "",
  ct: localStorage.getItem("ct") || 1,
  fp: localStorage.getItem("fp") || "",
  "depend-uri": "/api/cms/v1/help/index/1",
  "depend-method": "GET",
};

export declare module artListModel {
  export interface Datum {
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

  export interface RootObject {
    code: number;
    message: string;
    data: Datum[];
    validErrors?: any;
  }
}

export const request = axios.create({ headers: headers });

const suffix = "/api/cms";

export const getArtList =  (
  baseURL: string = "",
  data: any
): Promise<{ data: artListModel.RootObject }> => {
  return request(`${suffix}/v1/help/systemArticleList`, {
    baseURL: baseURL,
    method: "post",
    data,
    headers: {
      "depend-uri": `/api/cms/v1/help/index/1`,
      "depend-method": "GET",
    },
  });
};
