import { IDependHeader } from "../dist";
import { myRequest, MyRequestOptions } from "./request";

const suffix = "/api/scm";

export interface IMaterialsTypeRow {
  id: string;
  delFlag?: number;
  dataVersion?: number;
  tenantId?: string;
  createdId?: string;
  createdEmplId?: string;
  createdEmplName?: string;
  createdName?: string;
  createdDatetime?: number;
  modiId?: string;
  modiEmplId?: string;
  modiEmplName?: string;
  modiName?: string;
  modiDatetime?: number;
  code?: string;
  name: string;
  companyId?: string;
  companyName?: string;
  parentId: string;
  status?: number;
  ossFlag?: number;
  sort?: number;
  materialsCount?: number;
  isLeaf?: boolean;
  parentCode?: string;
  parentName?: string;

  level: number;
  lower?: IMaterialsTypeRow[];
}
export const scmGetMaterialsTypeApi = async (
  {
    companyId = "",
    headers = {
      "depend-method": "POST",
      "depend-uri": "/api/activiti/v1/tasks/{taskId}/complete/formdata",
    },
  }: {
    companyId?: string;
    headers?: IDependHeader;
  } = {},
  options?: MyRequestOptions
): Promise<{
  materialsCount: number;
  materialsTypeTable: IMaterialsTypeRow[];
}> => {
  return myRequest(`${suffix}/v1/oss/materialsType/tree/${companyId}`, {
    method: "get",

    headers,
    ...options,
  });
};
// /api/scm/v1/oss/materialsType/getMaterialsType/194996610948698181

export const scmGetMaterialsTypeDetailApi = async ({
  id,
  options,
}: {
  id: string;
  options?: MyRequestOptions;
}) => {
  return myRequest<IMaterialsTypeRow>(
    `${suffix}/v1/oss/materialsType/getMaterialsType/${id}`,
    {
      method: "get",
      ...options,
    }
  );
};

export const scmPutMaterialsType = async ({
  data,
  options,
}: {
  data: Partial<IMaterialsTypeRow>;
  options?: MyRequestOptions;
}) => {
  return myRequest<IMaterialsTypeRow>(`${suffix}/v1/oss/materialsType`, {
    method: "put",
    data,
    ...options,
  });
};

//

export const scmPostMaterialsTypeDelInfo = ({
  data,
  options,
}: {
  data: any;
  options?: MyRequestOptions;
}) => {
  return myRequest<IMaterialsTypeRow>(
    `${suffix}/v1/oss/materialsType/delInfo`,
    {
      method: "post",
      data,
      ...options,
    }
  );
};
//
export const scmPostMaterialsTypeTable = ({
  data,
  options,
}: {
  data: any;
  options?: MyRequestOptions;
}) => {
  return myRequest<IMaterialsTypeRow>(
    `${suffix}/api/v1/oss/materialsType/table`,
    {
      method: "post",
      data: {
        sourceType: 1,
        status: 0,
        parentId: 0,
        companyId: 0,
        pageNum: 1,
        pageSize: 10,
        code: "",
        name: "",
        ...data,
      },
      ...options,
    }
  );
};

// /v1/common/generateShareCode

export type IScmPostGenerateShareCodeProps = Partial<{
  busCode: string;
  busId: string;
  name?: string;
  orderTypeName?: string;
  companyId: string;
  companyName: string;
  otherInfos: any;
}>;

export interface IScmPostGenerateShareCodeData {
  shareCode: string;
  shareUrl: string;
}

export const scmPostGenerateShareCode = ({
  data,
  options,
}: {
  data?: IScmPostGenerateShareCodeProps;
  options?: MyRequestOptions;
}) => {
  return myRequest<IScmPostGenerateShareCodeData>(
    `${suffix}/v1/common/generateShareCode`,
    {
      method: "post",
      data,
      ...options,
    }
  );
};
