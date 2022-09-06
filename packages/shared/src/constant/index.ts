export interface ConstantType {
  label: string;
  value: number | string;
  status?: string;
  sort?: number;
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
  { label: "待接收", value: 12, status: "processing" },
  { label: "待接受", value: 57, status: "processing" },
  { label: "待接单", value: 55, status: "processing" },

  { label: "已接收", value: 17, status: "success" },

  { label: "审批中", value: 2, status: "processing" },
  { label: "内部审批中", value: 13, status: "processing" },
  { label: "审批拒绝", value: 4, status: "error" },
  { label: "内部审批拒绝", value: 15, status: "error" },
  { label: "已退回", value: 7, status: "error" },
  { label: "内部审批退回", value: 16, status: "error" },
  { label: "内部审批通过", value: 14, status: "success" },
  { label: "已付款", value: 6, status: "success" },
  { label: "待对方接收", value: 63, status: "processing" },
  { label: "未开始", value: 11, status: "error" },
  { label: "对方审批中", value: 62, status: "processing" },
  { label: "已退回", value: 20, status: "success" },
  { label: "待发布", value: 51, status: "processing" },
  { label: "进行中", value: 60, status: "processing" },
  { label: "未生效", value: 53, status: "error" },
  { label: "已退回", value: 56, status: "error" },
  { label: "已作废", value: 58, status: "error" },
  { label: "已结束", value: 61, status: "error" },
  { label: "已发布", value: 52, status: "success" },

  { label: "审批通过", value: 3, status: "success" },

  { label: "已生效", value: 54, status: "success" },
  { label: "已接受", value: 59, status: "success" },

  { label: "待确认", value: 64, status: "processing" },
  { label: "已确认", value: 65, status: "success" },
].map((m, index) => {
  return {
    ...m,
    sort: index,
  };
});

export const orderStatusTypeMap = orderStatusType.reduce<
  Record<number, ConstantType>
>((memo, cur) => {
  memo[cur.value] = cur;
  return memo;
}, {});

export function findConstantLabel(
  value: number | string | undefined,
  constantType: ConstantType[] | Record<number, ConstantType>,
  labelKey = "label"
) {
  if (value === undefined) {
    return "";
  }
  if (value == null) {
    return "";
  }
  let find;
  if (Array.isArray(constantType)) {
    find = constantType.find((e) => e.value == value);
  } else {
    find = orderStatusTypeMap[value];
  }

  return find ? find[labelKey] : "";
}

export function findConstant(
  value: number | string | undefined,
  constantType: ConstantType[] | Record<number, ConstantType>
) {
  if (value === undefined) {
    return "";
  }
  if (value == null) {
    return "";
  }
  let find;
  if (Array.isArray(constantType)) {
    find = constantType.find((e) => e.value == value);
  } else {
    find = orderStatusTypeMap[value];
  }

  return find || null;
}

export const formatOrderStatus = (value: number | string) => {
  return findConstantLabel(value, orderStatusTypeMap);
};

export const getBadgeStatus = (value: number | string) => {
  return findConstantLabel(value, orderStatusTypeMap, "status") || "default";
};

export const enum orderStatusTypeEnum {
  //  { label: "全部", value: -1, status: "default" },
  all = -1,

  // { label: "草稿", value: 1, status: "default" },
  draft = 1,
  // { label: "审批中", value: 2, status: "processing" },
  approval = 2,
  // { label: "审批通过", value: 3, status: "success" },
  approved = 3,
  // { label: "审批拒绝", value: 4, status: "error" },
  approvalDenied = 4,
  // { label: "已付款", value: 6, status: "success" },
  paid = 6,
  // { label: "已退回", value: 7, status: "error" },
  returned = 7,
  // { label: "未开始", value: 11, status: "error" },
  notStarted = 11,
  // { label: "待接收", value: 12, status: "processing" },
  toBeReceived = 12,
  // { label: "内部审批中", value: 13, status: "processing" },
  internalApproval = 13,
  // { label: "内部审批通过", value: 14, status: "success" },
  internalApprovalPassed = 14,
  // { label: "内部审批拒绝", value: 15, status: "error" },
  internalApprovalDenied = 15,
  // { label: "内部审批退回", value: 16, status: "error" },
  internalApprovalReturned = 16,
  // { label: "已接收", value: 17, status: "success" },
  received = 17,
  // { label: "已退回", value: 20, status: "success" },
  returned20 = 20,
  // { label: "待发布", value: 51, status: "processing" },
  toBePublished = 51,
  // { label: "已发布", value: 52, status: "success" },
  published = 52,
  // { label: "未生效", value: 53, status: "error" },
  notValid = 53,
  // { label: "已生效", value: 54, status: "success" },
  effective = 54,
  // { label: "待接单", value: 55, status: "processing" },
  pendingOrder = 55,
  // { label: "已退回", value: 56, status: "error" },
  returned56 = 56,
  // { label: "待接受", value: 57, status: "processing" },
  pending = 57,
  // { label: "已作废", value: 58, status: "error" },
  obsolete = 58,
  // { label: "已接受", value: 59, status: "success" },
  accepted = 59,
  // { label: "进行中", value: 60, status: "processing" },
  inProgress = 60,
  // { label: "已结束", value: 61, status: "error" },
  finished = 61,
  // { label: "对方审批中", value: 62, status: "processing" },
  approvedByTheOtherParty = 62,
  // { label: "待对方接收", value: 63, status: "processing" },
  toBeReceivedByTheOtherParty = 63,
  toBeConfirmed = 64,
  confirmed = 65,
}

export const busType: ConstantType[] = [
  { label: "标准采销", value: 1 },
  { label: "贸易采销", value: 2 },
];
export const shipmentsTypeType: ConstantType[] = [
  { label: "自提", value: 1 },
  { label: "送货上门", value: 2 },
  { label: "物流", value: 3 },
];

export const enum handleTypeEnum {
  save = 1,
  submit = 2,
}
