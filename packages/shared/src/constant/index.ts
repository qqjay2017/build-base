export interface ConstantType {
  label: string;
  value: number | string;
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

export function findConstantLabel(
  value: number | string | undefined,
  constantType: ConstantType[]
) {
  if (value === undefined) {
    return "";
  }
  if (value == null) {
    return "";
  }
  const find = constantType.find((e) => e.value == value);

  return find ? find.label : value;
}
