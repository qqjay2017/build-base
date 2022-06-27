import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CreateSupportBlock } from "@core/support-block";

import "@core/support-block/dist/style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// 82522476633944122
const helpBlock = new CreateSupportBlock({
  beforeRender() {
    console.log("beforeRender");
  },
  afterRender() {
    console.log("afterRedner");
  },
  httpError(code, data) {
    // 401
    // { code: 401 ,message: "暂未登录或token已经过期"}
    console.log(code, data);
  }, //   return Promise.resolve("123"); //   console.log(url, { method, data }); //   console.log("123"); // request(url, { method, data }) {
  // },
  // systemId: "167096554103328853",
  // systemId: "167082792923254878",
  systemId: "81869552404688911",
  initMenuCode: "CONTRACT",
  baseURL: "http://ymsl.kxgcc.com:30872",
});
