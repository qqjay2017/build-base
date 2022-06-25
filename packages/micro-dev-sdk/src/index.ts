import answer from "the-answer";
export { addPi, wtf } from "./add";
export function add(a: number, b: number) {
  // feat1111
  return a + b;
}

export function answerIs() {
  console.log("the answer is " + answer);
  return "the answer is " + answer;
}
