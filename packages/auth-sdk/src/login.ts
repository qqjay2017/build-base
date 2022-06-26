import { myRequest } from "@core/service-api";

import { base64Encode } from "@core/shared";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import jwt from "jsonwebtoken";
import { UserParams } from "./types";
import { getParam } from "./utils";

import { delToken } from "./utils";
import { isLogin } from "./utils";
import { constant } from "./constant";

class Thing {
  // https://www.npmjs.com
  host: string = window.location.origin;
  // https://www.npmjs.com/package/@types/jsonwebtoken
  fullPath: string = window.location.origin + window.location.pathname;
  pathname: string = window.location.pathname;
  userParams: UserParams = {
    path: this.host + "/auth",
    allow: [],
    authUrl: "",
    urlHref: this.host,
    grant_type: "authorization_code",
    appId: "xWIqqaOPHQqJ",
    appSecret: "2a06IArpGsVH9qLH8C1U1",
    pt: undefined,
  };
  authParams = {
    fp: localStorage.getItem("fp") || "",
    pt: 1,
  };
  userinfo = undefined;
  constructor(userParams?: UserParams) {
    this.userParams = {
      ...this.userParams,
      ...userParams,
    };
  }
  async init() {
    const fp = await this.getFp();
    console.log(fp);
    return this.authLogin();
  }
  getFp() {
    return new Promise(async (resolve, reject) => {
      const hasFp = localStorage.getItem("fp");
      if (!hasFp) {
        const fpPromise = FingerprintJS.load();
        const fp = await fpPromise;
        const result = await fp.get();
        const { deviceMemory, ...components } = result.components;
        const visitorId = FingerprintJS.hashComponents(components as any);
        localStorage.setItem("fp", visitorId);
        this.authParams.fp = visitorId;
        return resolve(visitorId);
      } else {
        this.authParams.fp = hasFp;
        return resolve(hasFp);
      }
    });
  }
  authLogin() {
    if (!this.authParams.fp) {
      return console.error("fp未初始化");
    }
    const _access_token = getParam("access_token");
    const _code = getParam("code");
    const _logout = getParam("logout");
    if (_code && isLogin()) {
      return (window.location.href = this.fullPath);
    }

    if (_access_token) {
      this.setUserInfo(_access_token);
    } else if (_code) {
      this.accestokenByCode(_code);
    } else if (_logout === "yes") {
      delToken();
    } else if (!(this.userParams.allow || []).includes(this.pathname)) {
      if (isLogin()) {
        if (sessionStorage.getItem("USER_INFO") && !this.userinfo) {
          this.userinfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "");
        }
        return this.userinfo;
      } else {
        if (this.userParams.grant_type === "authorization_code") {
          let urlHost =
            this.userParams.path || this.userParams.urlHref || this.host;
          window.location.href =
            urlHost +
            "/oauth/authorize?response_type=code&client_id=" +
            this.userParams.appId +
            "&redirect_uri=" +
            this.host;
        } else if (this.userParams.grant_type === "password") {
        }
      }
    }
  }
  setUserInfo(_access_token: string) {
    sessionStorage.setItem(constant.access_token, _access_token);
    const aToken: any = jwt.decode(_access_token);
    sessionStorage.setItem(
      constant.user_info,
      JSON.stringify(aToken.user_info)
    );
    window.location.href = this.fullPath;
  }

  async accestokenByCode(code: string) {
    const BasicSecret = base64Encode(
      `${this.userParams.appId}:${this.userParams.appSecret}`
    );

    myRequest(this.userParams.path + "/oauth/token", {
      method: "post",
      data: {
        ct: 1,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: this.userParams.urlHref || this.host,
        fp: this.authParams.fp,
      },
      headers: {
        Authorization: "Basic " + BasicSecret,
        fp: "",
        ct: "",
        pt: "",
      },
      requestType: "form",
    })
      .then((res) => {
        this.saveToken(res);
      })
      .catch((err) => {
        // 报错了,从头再来
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
      });
  }
  saveToken(data: any = {}) {
    sessionStorage.setItem(constant.access_token, data.access_token);
    sessionStorage.setItem(constant.refresh_token, data.refresh_token);
    sessionStorage.setItem(constant.expires_in, data.expires_in);
    // const expires_in: any = moment().add(data.expires_in, "s").unix();
    // sessionStorage.setItem(constant.token_expires_time, expires_in);
    sessionStorage.setItem(constant.user_info, JSON.stringify(data.user_info));
    sessionStorage.setItem(constant.user_name, data.user_info.name);
    sessionStorage.setItem("pt", this.userParams.pt || data.pt || "1");
    if (
      sessionStorage.getItem(constant.user_info) &&
      sessionStorage.getItem(constant.access_token)
    ) {
      window.location.href =
        this.fullPath || this.userParams.urlHref || this.host;
    }
  }
  logout(e?: number, s: string = "") {
    let userInfo: any = sessionStorage.getItem(constant.user_info);
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
    }
    const userId = userInfo && userInfo.id ? userInfo.id : s;
    delToken(e);
    const baseURL = this.userParams.authUrl || this.host;
    const aUrl = baseURL + "/auth";
    if (e && e === 1) {
      window.location.href =
        aUrl + `/logout?ct=1&userId=${userId}&fp=${this.authParams.fp}`;
    } else {
      if (window.opener && window.opener != null) {
        window.opener = null;
        window.close();
        window.location.href =
          aUrl + `/logout?ct=1&userId=${userId}&fp=${this.authParams.fp}`;
      } else {
        window.location.href =
          aUrl + `/logout?ct=1&userId=${userId}&fp=${this.authParams.fp}`;
      }
    }
  }
}

export default Thing;
