import * as queryString from "query-string";

interface RequestOpt {
  method: string;
  url: string;
  qs?: Record<string, any>;
  dataType?: XMLHttpRequestResponseType;

  xhrFields?: Record<string, any>;
  headers?: Record<string, any>;

  onProgress?: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
  onDownloadProgress?: (
    this: XMLHttpRequest,
    ev: ProgressEvent<EventTarget>
  ) => any;
  timeout?: number;
  body?: Document | XMLHttpRequestBodyInit | any;
}

interface XhrRes<T = any> {
  body?: T;
  error: Error | null;
  headers: Record<string, any>;
  statusCode: number;
  statusMessage: string;
}

const xhrRes = function(err: Error | null, xhr: XMLHttpRequest, body?: any) {
  const headers: Record<string, any> = {};

  xhr
    .getAllResponseHeaders()
    .trim()
    .split("\n")
    .forEach((item) => {
      if (item) {
        const index = item.indexOf(":");
        const key = item
          .substr(0, index)
          .trim()
          .toLowerCase();
        const val = item.substr(index + 1).trim();

        headers[key] = val;
      }
    });

  return {
    error: err,
    statusCode: xhr.status,
    statusMessage: xhr.statusText,
    headers,
    body,
  };
};

const xhrBody = function(
  xhr: XMLHttpRequest,
  dataType: XMLHttpRequestResponseType | any
) {
  const response =
    !dataType && dataType === "text" ? xhr.responseText : xhr.response;

  console.log(response, "response");

  return response;
};

export const request = function(
  opt: RequestOpt,
  callback?: (r: XhrRes) => any
) {
  const method = (opt.method || "GET").toUpperCase();

  if (!callback) {
    callback = () => {};
  }

  if (!opt.dataType) {
    opt.dataType = "json";
  }

  let { url } = opt;

  if (opt.qs) {
    const qsStr = queryString.stringify(opt.qs);

    if (qsStr) {
      url += (url.indexOf("?") === -1 ? "?" : "&") + qsStr;
    }
  }

  const xhr = new XMLHttpRequest();

  xhr.open(method, url, true);
  xhr.responseType = opt.dataType || "json";

  // 处理 xhrFields 属性
  if (opt.xhrFields) {
    for (const xhrField in opt.xhrFields) {
      (xhr as any)[xhrField] = opt.xhrFields[xhrField];
    }
  }

  // 处理 headers
  let headers: Record<string, any> = opt.headers || {};

  headers = {
    ...headers,
  };

  if (!headers.fp) {
    headers.fp = localStorage.getItem("fp") || "";
  }

  if (!headers.ct) {
    headers.ct = localStorage.getItem("ct") || "1";
  }

  if (!headers.Authorization) {
    headers.Authorization = `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`;
  }

  const isFormData =
    Object.prototype.toString.call(opt.body) === "[object FormData]";

  if (opt.body && isFormData) {
    // headers["Content-Type"] = "multipart/form-data;";
    // console.log(headers, "headers");
  } else {
    headers["Content-Type"] = "application/json;charset=UTF-8";
  }

  if (headers) {
    for (const key in headers) {
      if (
        headers.hasOwnProperty(key) &&
        key.toLowerCase() !== "content-length" &&
        key.toLowerCase() !== "user-agent" &&
        key.toLowerCase() !== "origin" &&
        key.toLowerCase() !== "host"
      ) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
  }

  if (opt.onProgress && xhr.upload) {
    xhr.upload.onprogress = opt.onProgress;
  }

  if (opt.onDownloadProgress) {
    xhr.onprogress = opt.onDownloadProgress;
  }

  if (opt.timeout) {
    xhr.timeout = opt.timeout;
  }

  // 超时
  xhr.ontimeout = function(event) {
    const error = new Error("timeout");

    callback && callback(xhrRes(error, xhr));
  };

  // success 2xx/3xx/4xx
  xhr.onload = function() {
    const { dataType } = opt as any;
    const response =
      !dataType && dataType === "text" ? xhr.responseText : xhr.response;

    if (response && response.code === 200) {
      callback && callback(xhrRes(null, xhr, response));
    } else {
      callback && callback(xhrRes(new Error(response.code), xhr, response));
    }
  };

  // error 5xx/0 (网络错误、跨域报错、Https connect-src 限制的报错时 statusCode 为 0)
  xhr.onerror = function(err) {
    const body = xhrBody(xhr, opt.dataType);

    if (body) {
      // 5xx
      callback && callback(xhrRes(null, xhr, body));
    } else {
      // 0
      let error: any = xhr.statusText;

      if (!error && xhr.status === 0) {
        error = new Error("CORS blocked or network error");
      }

      callback && callback(xhrRes(error, xhr, body));
    }
  };

  if (method === "POST" && !isFormData) {
    opt.body = JSON.stringify(opt.body);
  }

  xhr.send(opt.body || "");

  return xhr;
};
