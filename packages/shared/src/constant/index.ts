export interface ConstantType {
  label: string;
  value: number | string;
  status?: string;
}

export const platformCodeType: ConstantType[] = [
  { label: "可信工程平台", value: "1" },
  { label: "供应链平台", value: "2" },
];
export const channelType: ConstantType[] = [
  { label: "PC", value: 1 },
  { label: "APP", value: 2 },
];

export const artType: ConstantType[] = [
  { label: "文章", value: 1 },
  { label: "视频", value: 2 },
];

export const ossDevSystemType: ConstantType[] = [
  { label: "平台子系统", value: "01" },
  { label: "应用子系统", value: "02" },
];

export const cronDateType: ConstantType[] = [
  { label: "年息", value: 2 },
  { label: "日息", value: 1 },
];

export const orderStatusType: ConstantType[] = [
  { label: "全部", value: -1, status: "default" },
  { label: "草稿", value: 1, status: "default" },
  { label: "审批中", value: 2, status: "processing" },
  { label: "审批通过", value: 3, status: "success" },
  { label: "审批拒绝", value: 4, status: "error" },
  { label: "已付款", value: 6, status: "success" },
  { label: "已退回", value: 7, status: "error" },
  { label: "未开始", value: 11 ,   status: 'error',},
  { label: "待接收", value: 12, status: "processing" },
  { label: "内部审批中", value: 13, status: "processing" },
  { label: "内部审批通过", value: 14, status: "success" },
  { label: "内部审批拒绝", value: 15, status: "error" },
  { label: "内部审批退回", value: 16, status: "error" },
  { label: "已接收", value: 17, status: "success" },
  { label: "已退回", value: 20, status: "success" },
  { label: "待发布", value: 51, status: "processing" },
  { label: "已发布", value: 52, status: "success" },
  { label: "未生效", value: 53, status: "error" },
  { label: "已生效", value: 54, status: "success" },
  { label: "待接单", value: 55, status: "processing" },
  { label: "已退回", value: 56, status: "error" },
  { label: "待接受", value: 57, status: "processing" },
  { label: "已作废", value: 58, status: "error" },
  { label: "已接受", value: 59, status: "success" },
  { label: "进行中", value: 60, status: "processing" },
  { label: "已结束", value: 61, status: "error" },
  { label: "对方审批中", value: 62, status: "processing" },
  { label: "待对方接收", value: 63, status: "processing" },
];

export function findConstantLabel(
  value: number | string | undefined,
  constantType: ConstantType[],
  labelKey='label',
  
) {
  if (value === undefined) {
    return "";
  }
  if (value == null) {
    return "";
  }
  const find = constantType.find((e) => e.value == value);

  return find ? find[labelKey] : '';
}

export const formatOrderStatus = (value: number | string) => {
  return findConstantLabel(value, orderStatusType);
};

export const getBadgeStatus = (value: number | string) => {
 
  return findConstantLabel(value,orderStatusType , 'status' )||'default'
};
