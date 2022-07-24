import { IDependHeader } from "../dist";
import { myRequest, MyRequestOptions } from "./request";

const suffix = "/api/scm";

export interface IMaterialsTypeRow {
  id: string;
  delFlag: number;
  dataVersion: number;
  tenantId: string;
  createdId: string;
  createdEmplId: string;
  createdEmplName: string;
  createdName: string;
  createdDatetime: number;
  modiId: string;
  modiEmplId: string;
  modiEmplName: string;
  modiName: string;
  modiDatetime: number;
  code: string;
  name: string;
  companyId: string;
  companyName: string;
  parentId: string;
  status: number;
  ossFlag: number;
  sort: number;
  materialsCount: number;
  level: number;
  lower?: IMaterialsTypeRow[];
}
export const scmGetMaterialsTypeApi = async ({
  companyId = "",
  headers = {
    "depend-method": "POST",
    "depend-uri": "/api/activiti/v1/tasks/{taskId}/complete/formdata",
  },

}: {
  companyId?: string;
  headers?: IDependHeader;
} = {},options?:MyRequestOptions): Promise<{
  materialsCount: number;
  materialsTypeTable: IMaterialsTypeRow[];
}> => {
  return myRequest(`${suffix}/v1/oss/materialsType/tree/${companyId}`, {
    method: "get",

    headers,
    ...options
  });
};
