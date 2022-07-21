import ReactDOM from "react-dom";
import App from "./App";

interface SupportWebsiteBlockOptions {
  /**
   * 渲染前会调用
   */
  beforeRender?: () => void;
  /**
   * 渲染后会调用
   */
  afterRender?: () => void;
  /**
   * 使用自带请求,发生错误时候会调用  type = 'http'
   */
  httpError?: (code?: number, data?: any) => void;

  systemId: string;
  // API_URL
  baseURL: string;
  platformCode?: string;
  initMenuCode?: string;
}

export class CreateSupportBlock {
  constructor(opt: SupportWebsiteBlockOptions) {
    const {
      beforeRender,
      afterRender,
      httpError,
      systemId,
      platformCode,
      baseURL,
      initMenuCode,
    } = opt;

    // TODO 传入自定义请求 customRequest
    // if (opt.request) {
    //   rewriteReq(opt.request);
    // }
    this.beforeRender = beforeRender;
    this.afterRender = afterRender;
    this.systemId = systemId;
    this.baseURL = baseURL;
    if (initMenuCode) {
      this.categoryId = initMenuCode;
    }
    this.container = document.createElement("div");
    if (platformCode) {
      this.platformCode = platformCode;
    }
    if (httpError) {
      this.httpError = httpError;
    }

    this.mount();
  }
  container: Document | Element | ShadowRoot | DocumentFragment | undefined;
  beforeRender: any;
  afterRender: any;
  systemId: string = "";
  categoryId: string = "";
  baseURL: string = "";
  platformCode: string = "1";
  httpError = (code?: number, data?: any) => {
    console.log(code, data);
  };

  mount() {
    if (!this.systemId || !this.categoryId) {
      return console.warn(
        "=== render函数中止执行: systemId: " +
          this.systemId +
          ",categoryId:" +
          this.categoryId
      );
    }
    this.beforeRender && this.beforeRender();
    // 如果加载过了,移除了重新渲染
    this.unmount();

    ReactDOM.render(
      <App
        systemId={this.systemId}
        categoryId={this.categoryId}
        platformCode={this.platformCode}
        baseURL={this.baseURL}
        httpError={this.httpError}
      />,
      this.container!
    );
    document.body.appendChild(this.container!);
    this.afterRender && this.afterRender();
  }
  setMenuCode(menuCode: string) {
    if (menuCode) {
      this.categoryId = menuCode;
      this.mount();
    } else {
      this.unmount();
    }
  }
  unmount() {
    ReactDOM.unmountComponentAtNode(this.container as any);
    // if (document.body.contains(this.container!)) {
    //   document.body.removeChild(this.container!);
    // }
  }
}
// const env = process.env.NODE_ENV || "production";
// // console.log(env, "env");
// if (env == "development") {
//   localStorage.setItem("fp", "9165d7a319c765f361679c128f07587e");

//   localStorage.setItem("ct", "1");

//   sessionStorage.setItem(
//     "ACCESS_TOKEN",
//     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdCI6IjEiLCJ1c2VyX2luZm8iOnsiaWQiOiIxNjE4NzY0MjcxNzkxMDIyNjAiLCJsb2dpbk5hbWUiOiIxNzY4OTM3ODE2MyIsIm5hbWUiOiIxNzY4OTM3ODE2MyIsImNvZGUiOiIiLCJtb2JpbGUiOiIxNzY4OTM3ODE2MyIsImFudFVzZXJEaWQiOiIiLCJkZWZhdWx0Q29tcElkIjoiMzU4Njk1OTgxNDIyMTQxOTIiLCJjb21wYW55TmFtZSI6IuaWveW3peaAu-aJv-WMhSIsImFudENvbXBhbnlEaWQiOiJkaWQ6bXljaGFpbjo2OGZkNjc4NDI0NWQ3NzllM2QzZWIzNjJmMzFmMjUyZTg0ZmYxOWIwZGZiZmVlZWI0M2UzZjQ3ZTM3MGFlYmExIiwiZW1wbG95ZWVJZCI6IjE2NTg4NTQ5NDk3MzI1MTYxMiJ9LCJ1c2VyX25hbWUiOiIxNzY4OTM3ODE2MyIsInNjb3BlIjpbInVzZXIiXSwiZnAiOiI5MTY1ZDdhMzE5Yzc2NWYzNjE2NzljMTI4ZjA3NTg3ZSIsImV4cCI6MTY1NDU4NDIxMiwiYXV0aG9yaXRpZXMiOlsiUk9MRTAwMjM1ODY5NTk4MTQyMjE0MTkyIiwiUk9MRTEwMiIsIlJPTEUwMDQzNTg2OTU5ODE0MjIxNDE5MiJdLCJqdGkiOiI1NGFmMTRmMC04NzY4LTQxNjktOTIxNS0zYTUwMmQxY2M2NzAiLCJjbGllbnRfaWQiOiJ4V0lxcWFPUEhRcUoifQ.SQVtMqRgRxBD_UuvQ_qTRfIoDAloPj3fJFhH_5XK9zZcem9zREXbSnm0Bcli_NiLBN7o32Bk_h6srw_dQZfSisqLfNsFuqE8fXj_Febky9YrlUEfXEIuNV7ILLrYe4fzQ7Wwt6W9thcS624LOK91RiIDC8LgO41lLCnk_8Ah-_QHDmCc1KuRzE_GQ49LAIZ7lr42XyE6x0ORMJ_Dka5dRGJQbniLwNiYZVXw9V6Qf5ZOgFW3V7rKGPPZbT0pA_licWuYw9cTaoaMbjLJHMCLxjohl536fwiaNVlBUeUr4dnrnbF1SgB2lcE-be3pv7wjS7svaqPn9GZOOfk81vyCgw"
//   );

//   const helpBlock = new CreateSupportBlock({
//     beforeRender() {
//       console.log("beforeRender");
//     },
//     afterRender() {
//       console.log("afterRedner");
//     },
//     httpError(code, data) {
//       // 401
//       // { code: 401 ,message: "暂未登录或token已经过期"}
//       console.log(code, data);
//     }, //   return Promise.resolve("123"); //   console.log(url, { method, data }); //   console.log("123"); // request(url, { method, data }) {
//     // },
//     // systemId: "167096554103328853",
//     // systemId: "167082792923254878",
//     systemId: "81869552404688911",
//     initMenuCode: "CONTRACT",
//     baseURL: "http://ymsl.kxgcc.com:30872",
//   });
// }
