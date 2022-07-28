import { ConstantType } from '@core/shared';
export type LabelFormatFn = (val: ConstantType) => any;

export interface CronSelectCustomProps {
  /**
   * label格式化函数
   * ({label,value})=>xxxxxx
   */
  labelFormat?: LabelFormatFn;
  /**
   * 宽度
   */
  width?:number|string;
}
