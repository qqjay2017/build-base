import request from "superagent";
import get from "lodash-es/get";
import { resNewToken, superagentAuth } from "./superagent-auth";
import prefix from "superagent-prefix";

function _onError(code: number, body = {}) {
  if (code === 401) {
    sessionStorage.clear();
    window.location.reload();
  } else if (code === 403) {
  } else if (code === 500) {
  } else {
  }
}

export interface IDependHeader extends Record<string, any> {
  "depend-uri"?: string;
  "depend-method"?: "GET" | "POST" | "PUT" | "DELETE";
}

export interface MyRequestOptions {
  API_URL?: string;

  method?: "get" | "post" | "put" | "delete";

  data?: object;
  query?: object;

  headers?: Record<string, any>;
  requestType?: "form";
  codePath?: string;
  dataPath?: string;
  onError?: (code, body) => void;
}

export const getBaseRequestInstance: (
  url: string,
  options: MyRequestOptions
) => request.SuperAgentRequest = (
  url,
  options = {
    method: "get",
  }
) => {
  let targetURL = url;
  const {
    method = "get",
    data,
    query,
    headers,
    requestType,
    onError,
    API_URL,
  } = options;
  let baseReq = request(method, targetURL);
  baseReq.use(
    superagentAuth({
      headers,
    })
  );

  if (API_URL) {
    baseReq.use(prefix(API_URL));
  }

  if (requestType) {
    baseReq.type(requestType);
  }

  if (method == "get") {
    baseReq.query(data || {});
  } else {
    baseReq.query(query || {});
    baseReq.send(data || {});
  }

  return baseReq;
};

export class API {
  invoke<T extends Record<string, any>>(
    url: string,
    options: MyRequestOptions = {
      method: "get",
    }
  ) {
    return new Promise<T>((resolve, reject) => {
      const baseReq = getBaseRequestInstance(url, options);

      baseReq
        .then((res) => {
          resNewToken(res);

          if (!res || !res.body) {
            return reject(res.body);
          }

          const code = get(res, options.codePath || "body.code", 500);
          const data = get(res, options.dataPath || "body.data", {});
          // 测试报错通知
          // options.onError(500,res.body);
          if (code === 200) {
            return resolve(data as T);
          } else {
            if (options.onError) {
              options.onError(code, res.body);
            } else {
              _onError(code, res.body);
            }

            return reject(res.body);
          }
        })
        .catch((err) => {
          reject(err);

          if (options.onError) {
            options.onError(500, err);
          } else {
            _onError(500, err);
          }
        });
    });
  }
}

const api = new API();
export const myRequest = api.invoke;
