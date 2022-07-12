import { BroadcastChannel } from "broadcast-channel";

export const closeBc = new BroadcastChannel<Record<string, any>>("close");
export const reloadBc = new BroadcastChannel<Record<string, any>>("reload");
export const tabBc = new BroadcastChannel<{
  systemId?: string;
  title?: string;
}>("tabs");

const closeHandle = () => {
  if (
    navigator.userAgent.indexOf("Firefox") != -1 ||
    navigator.userAgent.indexOf("Chrome") != -1
  ) {
    open(location as any, "_self")?.close();
    window.location.href = "about:blank";
    window.close();
  } else {
    window.opener = null;
    window.open("", "_self");
    window.close();
    open(location as any, "_self")?.close();
  }
};

export const closeBcListener = () => {
  closeBc.addEventListener("message", closeHandle);
};

export const removeCloseBcListener = () => {
  closeBc.removeEventListener("message", closeHandle);
};

const reloadHandle = () => {
  window.location.reload();
};

export const reloadBcListener = () => {
  closeBc.addEventListener("message", reloadHandle);
};

export const removeReloadBcListener = () => {
  closeBc.removeEventListener("message", reloadHandle);
};

export const tabBcPostMessage = (data?: {
  systemId?: string;
  title?: string;
}) => {
  if (data && data.systemId && data.title) {
    tabBc.postMessage(data);
  }
};
