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
// console.log(env, "env");
// // // console.log(env, "env");
// if (env == "development") {
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
