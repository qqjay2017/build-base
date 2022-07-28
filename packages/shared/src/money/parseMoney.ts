/**
 *
 * @param money 金额,数字或者字符串
 * @param fractionDigits 保留小数,默认都保留
 * @returns
 */

export type IParseMoneyFn = (money?:number|string,fractionDigits?:number)=>string
export const  parseMoney:IParseMoneyFn = (money, fractionDigits = -1) =>{
  if (!money) {
    return "0";
  }
  if (typeof money === "number") {
    money = String(money);
  }
  const isNeedFixed =
    money.indexOf(".") > 0 && fractionDigits && fractionDigits >= 0;
  let moneyFixed = money;
  if (isNeedFixed) {
    const moneyFixedArr = moneyFixed.split(".");
    if (fractionDigits == 0) {
      moneyFixed = moneyFixedArr[0];
    } else {
      moneyFixedArr[1] = moneyFixedArr[1].substr(0, fractionDigits);
      moneyFixed = moneyFixedArr.join(".");
    }
  }

  const moneyStr = String(moneyFixed);
  return moneyStr.replace(
    new RegExp(`(?!^)(?=(\\d{3})+${money.includes(".") ? "\\." : "$"})`, "g"),
    ","
  );
}
