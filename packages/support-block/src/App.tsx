import ReactDOM from "react-dom";
import React from "react";
import SupportDrawer from "./SupportDrawer";
import "./index.css";
export interface SupportWebsiteBlockOptions {
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
      <SupportDrawer
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
  }
}
