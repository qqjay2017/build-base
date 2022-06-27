import { myRequest } from "./request";

export const uimsGatewayPath = "/api/uims";
export interface UimsGetMenuApiData {
  systemId: string;
  systemName: string;
  resourceList: IResourceList[];
}

export interface IResourceList {
  id: string;
  parentId: string;
  name: string;
  component: string;
  key: string;
  code: string;
  meta: IMeta;
  children: IResourceList[];
}

export interface IMeta {
  icon: string;
  title: string;
}

export function uimsGetMenuApi(systemId: string) {
  return myRequest<UimsGetMenuApiData>(
    `${uimsGatewayPath}/v1/resource/getMenu/${systemId}`
  );
}

export interface UimsGetUserCompanyApiData {
  companyId: string;
  antCompanyId: string;
  companyName: string;
  defaultCompanyId: string;
  isAuth: string;
  mainCompanyId: string;
  joinTime: any;
  employeeLabel: IEmployeeLabel;
  companyAdminApply: ICompanyAdminApply;
}

export interface IEmployeeLabel {
  id: string;
  companyId: string;
  employeeId: string;
  isAdmin: number;
  isSubAdmin: number;
  isDirector: number;
  isFinance: number;
  isLegal: number;
}

export interface ICompanyAdminApply {
  id: string;
  employeeId: string;
  userId: string;
  employeeName: string;
  applyNumber: string;
  changeEmployeeId: string;
  changeUserId: string;
  changeEmployeeName: string;
  companyId: string;
  companyName: string;
  certificationStatus: number;
  description: string;
  verifyStatus: number;
}

export function uimsGetUserCompanyApi() {
  return myRequest<UimsGetUserCompanyApiData[]>(
    `${uimsGatewayPath}/v1/org/user/company`
  );
}

export interface UimsPutDefaultCompanyApiData {
  employeeId: string;
  employeeName: string;
  companyId: string;
  companyName: string;
}

export function uimsPutDefaultCompanyApi(data: {
  companyId: string;
  companyName: string;
}) {
  return myRequest<UimsPutDefaultCompanyApiData>(
    `${uimsGatewayPath}/v1/org/default/company`,
    {
      method: "put",
      data,
    }
  );
}

export interface UimsGetUserPermsApiData {
  systemId: string;
  code: string;
  systemName: string;
  permissions: IPermission[];
  name: string;
  id: string;
}
export interface IPermission {
  permissionId: string;
  permissionName: string;
  actionEntitySet: IActionEntitySet[];
}

export interface IActionEntitySet {
  action: string;
  describe: string;
}

// /api/uims/v1/resource-function/user/82522476633944122/perms

export function uimsGetUserPermsApi(systemId: string) {
  return myRequest<UimsGetUserPermsApiData>(
    `/api/uims/v1/resource-function/user/${systemId}/perms`
  );
}
