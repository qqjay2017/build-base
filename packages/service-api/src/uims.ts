import { myRequest } from "./request";

export interface UimsGetMenuApiData {
  systemId: string;
  systemName: string;
  resourceList: ResourceList[];
}

export interface ResourceList {
  id: string;
  parentId: string;
  name: string;
  component: string;
  key: string;
  code: string;
  meta: Meta;
  children: ResourceList[];
}

export interface Meta {
  icon: string;
  title: string;
}

export function uimsGetMenuApi(systemId: string) {
  return myRequest<UimsGetMenuApiData>(
    `/api/uims/v1/resource/getMenu/${systemId}`
  );
}
