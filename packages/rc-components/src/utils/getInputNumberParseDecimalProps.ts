export const getInputNumberParseDecimalProps = ({
  fractionDigits = 3,
}: {
  fractionDigits?: number;
}) => {
  return {
    formatter: (value?: number | string) => {
      if (!value) {
        return '0';
      }
      const valueStr = value.toString();
      // 整数忽略
      if (valueStr.indexOf('.') == -1) {
        return valueStr;
      }
      // 截断小数
      let [integer, decimal = ''] = valueStr.split('.');
      decimal = decimal.slice(0, fractionDigits);
      return `${integer}.${decimal}`;
    },
    parser: (value?: string) => {
      if (!value) {
        return 0;
      }
      const valueStr = value.toString();
      // 整数忽略
      if (valueStr.indexOf('.') == -1) {
        return Number(valueStr);
      }
      // 截断小数
      let [integer, decimal = ''] = valueStr.split('.');
      decimal = decimal.slice(0, fractionDigits);
      return Number(`${integer}.${decimal}`);
    },
  };
};
