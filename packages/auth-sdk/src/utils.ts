import { constant } from "./constant";

export function delToken(e?: number) {
  sessionStorage.removeItem(constant.access_token);
  sessionStorage.removeItem(constant.refresh_token);
  sessionStorage.removeItem(constant.expires_in);
  sessionStorage.removeItem(constant.token_expires_time);
  sessionStorage.removeItem(constant.user_info);
  sessionStorage.removeItem(constant.user_name);
  sessionStorage.removeItem("selectedKeys");
  sessionStorage.removeItem("openKeys");
  localStorage.removeItem("dict_code");
}

export function getParam(name?: string) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

export function isLogin() {
  return !!sessionStorage.getItem(constant.access_token);
}
