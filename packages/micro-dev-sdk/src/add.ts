// add.js
const PI = 3.14;
const E = 2.718;
export { wtf } from "@core/service-api";

export function addPi(x: number) {
  //
  console.log(x);
  return x + PI;
}

export function addE(x: number) {
  // 测试版本更新111
  return x + E;
}
