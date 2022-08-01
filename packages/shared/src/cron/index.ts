/**
 * 数字转月份文本,cron业务组件专用
 * @param index 
 * @returns 
 */

export const number2MonthText = (index: number) => {
    const textArr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    if (index === 0) {
      return '本月';
    }
    
    return `第${textArr[index]}个月`;
  };
  