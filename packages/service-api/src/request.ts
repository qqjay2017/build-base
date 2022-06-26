import request from "superagent";
import get from "lodash/get";

function onError(code: number) {
  if (code === 401) {
    sessionStorage.clear();
    window.location.reload();
    // TODO 待测试
    // window.location.reload();

    // alert('401 暂未登录或token已经过期')
  }
}
export class API {
  invoke<T extends Record<string, any>>(
    url: string,
    options: {
      method?: string;

      data?: object;
    } = {
      method: "get",
    }
  ) {
    let targetURL = url;
    const { method = "get", data } = options;
    const ACCESS_TOKEN = sessionStorage.getItem("ACCESS_TOKEN");
    if (!ACCESS_TOKEN) {
      return Promise.reject({});
    }
    // if (targetURL[0] === "/") {
    //   targetURL = targetURL.slice(1);
    // }
    return new Promise<T>((resolve, reject) => {
      request(method, targetURL)
        .set("fp", localStorage.getItem("fp") || "1")
        .set("ct", localStorage.getItem("ct") || "1")
        .set("Authorization", "Bearer " + ACCESS_TOKEN)
        .set("pt", sessionStorage.getItem("pt") || "1")

        .send(data)

        .then((res) => {
          if (!res || !res.body) {
            return reject(res.body);
          }

          const code = get(res, "body.code", 500);
          const data = get(res, "body.data", {});
          if (code === 200 && data) {
            return resolve(data as T);
          } else {
            onError(code);
            return reject(res.body);
          }
        })
        .catch((err) => {
          // // if we get unauthorized, kick out the user
          // if (err.status === 401 && localStorage.getItem("userLoggedIn")) {
          //   if (window.location.pathname !== "/") {
          //     localStorage.setItem("redirect-path", window.location.pathname);
          //   }
          //   clearSession();
          //   // Refresh the whole page to ensure cache is clear
          //   // and we dont end on an infinite loop
          //   window.location.href = `${baseUrl}login`;
          //   return;
          // }
          reject(err);

          return onError(500);
        });
    });
  }
}

const api = new API();
export default api.invoke;
