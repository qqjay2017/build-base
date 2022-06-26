export { default as Thing } from "./login";

export * from "./utils";

// if (process.env.NODE_ENV != "production") {
//   import("./login").then((res) => {
//     const thing = new res.default({
//       path: "http://ymsl.kxgcc.com:30872/auth",
//       pt: 2,
//     });
//     thing.init();
//   });
// }
