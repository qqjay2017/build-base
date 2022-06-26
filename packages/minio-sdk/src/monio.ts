import { eachLimit } from "./utils/async";
import { computedHash } from "./utils/computedHash";
// import MinioEvent from "./lib/event";
import { request } from "./utils/request";

export interface ProgressInfo {
  message: string;
  percent: number;
  error?: Error | null;
}

export interface PutObjectParams {
  ContentLength?: number;
  file: File;
  qs?: Record<string, any>;

  headers?: Record<string, any>;
  apiData?: Record<string, any>;
  API_URL?: string;

  onProgress?: (info: ProgressInfo) => void;
}

export interface ApiFileModel {
  id?: any;
  delFlag?: any;
  dataVersion?: any;
  createdId?: any;
  createdEmplId?: any;
  createdDatetime?: any;
  modiId?: any;
  modiEmplId?: any;
  modiDatetime?: any;
  busCode?: any;
  busId?: any;
  bucket: string;
  objectName: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  contentType: string;
  pieceNum: number;
  blockNum?: any;
  transactionHash?: any;
  txHash?: any;
  docId?: any;
  contentHash?: any;
  transactionId?: any;
  resource?: any;
  proofWay?: any;
  identifier: string;
  fileSrcUrl: string;
  uploadId?: any;
}

export class MinioSdk {
  constructor(options?: Partial<PutObjectParams>) {
    this.options = options || {};
  }
  options = {};
  // 根据文件大小选择分片还是不分片
  putSmartObject(params: PutObjectParams): Promise<ApiFileModel> {
    params = {
      ...this.options,
      ...params,
    };

    const size = params.file?.size;

    if (!size) {
      return Promise.reject();
    }

    if (size < 10 * 1024 * 1024) {
      return this.putObject(params);
    }

    return this.putSliceObject(params);
  }
  // 分片上传
  putSliceObject(params: PutObjectParams): Promise<ApiFileModel> {
    return new Promise((resolve, reject) => {
      params = {
        ...this.options,
        ...params,
      };

      const {
        file,
        onProgress,
        apiData = {},
        headers = {},
        API_URL = "",
      } = params;

      computedHash(file, {}).then((hashInfo) => {
        const { hash, blobArr, chunkSize } = hashInfo;
        const nameArr = (file.name || "").split(".") || [];

        let qs = {
          ...apiData,
          chunkSize,
          currentChunkSize: chunkSize,
          chunkNumber: blobArr.length,
          totalChunks: blobArr.length,
          fileType: nameArr.length ? nameArr[nameArr.length - 1] : "",
          contentType: file.type,
          identifier: hash,

          fileSrc: true,
          thumbnailSrc: true,
          totalSize: file.size,
          filename: file.name,
          relativePath: file.name,
        };

        onProgress &&
          onProgress({
            message: "开始匹配远程文件",
            percent: 0,
          });
        request(
          {
            url: `${API_URL}/api/minio/v1/file/chunk`,
            method: "get",
            qs,
            headers,
          },
          (chunkRes) => {
            console.log(chunkRes.body, " chunkRes.body");

            if (chunkRes.error) {
              console.log(chunkRes, "chunkRes 报错");

              return reject(chunkRes);
            }

            if (chunkRes && chunkRes.body && chunkRes.body.data) {
              const { data } = chunkRes.body;

              qs = {
                ...qs,
                ...chunkRes.body.data,
                fileSrc: true,
                thumbnailSrc: true,
              };

              if (data.fileSrcUrl) {
                onProgress &&
                  onProgress({
                    message: "文件匹配成功,秒传",
                    percent: 100,
                  });
                // 已存在分片,秒传
                resolve(data);

                return;
              }

              const tasks = blobArr.map((b, index) => {
                const formData = new FormData();
                const needKeys = [
                  "chunkSize",
                  "totalSize",
                  "identifier",
                  "filename",
                  "relativePath",
                  "totalChunks",
                  "fileType",
                  "contentType",
                  "bucket",
                  "objectPathPre",
                  "objectName",
                  "uploadId",
                ];

                Reflect.ownKeys(qs).forEach((key: any) => {
                  if (needKeys.includes(key)) {
                    formData.append(key, String(qs[key]));
                  }
                });

                formData.append("chunkNumber", `${index + 1}`);

                formData.append("file", b.blob);
                formData.append("currentChunkSize", `${b.end - b.start}`);
                formData.append("fileSrc", "true");
                formData.append("thumbnailSrc", "true");

                return {
                  formData,
                  task: b,
                };
              });

              let percentTemp = 0;

              // 执行器 iterator 参数

              const iterator = (d, callback) => {
                const { formData, task } = d;

                request(
                  {
                    method: "post",
                    url: `${API_URL}/api/minio/v1/file/chunk`,
                    body: formData,
                    headers,

                    onProgress: (ev) => {
                      // 避免进度倒退
                      if (percentTemp >= 100) {
                        percentTemp = 0;
                      }

                      const { startPercent } = task;

                      let percent = startPercent;

                      if (startPercent < percentTemp) {
                        percent = percentTemp;
                      } else {
                        percentTemp = percent;
                      }

                      onProgress &&
                        onProgress({
                          message: "文件正在分片上传",
                          percent: Math.min(percent, 99),
                        });
                    },
                  },
                  (res) => {
                    // TODO  挂了,开始重试
                    // 现在是挂了,就停了
                    callback(res.error);

                    if (res.error) {
                      console.log(res.error, "res.error");

                      return reject(res.error);
                    }
                  }
                );
              };

              eachLimit(tasks as any, 3, iterator, (err) => {
                if (err) {
                  onProgress &&
                    onProgress({
                      message: "上传错误",
                      percent: 0,
                      error: err,
                    });

                  return;
                }

                onProgress &&
                  onProgress({
                    message: "文件分片上传完成,正在合并",
                    percent: 99,
                  });
                request(
                  {
                    url: `${API_URL}/api/minio/v1/file/merge`,
                    method: "post",
                    headers,
                    body: {
                      ...qs,
                      merge: true,
                    },
                  },
                  (res) => {
                    if (res.error) {
                      console.log(res, "报错");

                      return reject(res.error);
                    }

                    onProgress &&
                      onProgress({
                        message: "文件分片上合并成功",
                        percent: 100,
                      });

                    const body = res.body || {};

                    resolve(body.data);

                    return;
                  }
                );
              });
            }
          }
        );
      });
    });
  }

  putObject(params: PutObjectParams): Promise<ApiFileModel> {
    return new Promise((resolve, reject) => {
      params = {
        ...this.options,
        ...params,
      };

      const { API_URL = "" } = params;
      //   const FileSize = params.ContentLength;
      const { onProgress } = params;

      const formData = new FormData();

      formData.append("file", params.file);

      const apiData = params.apiData || {};

      Reflect.ownKeys(apiData).forEach((k: any) => {
        if (k !== "file") {
          formData.append(k, apiData[k]);
        }
      });
      request(
        {
          method: "POST",
          url: `${API_URL}/api/minio/v1/file`,
          dataType: "json",
          body: formData,
          headers: params.headers || {},
          onProgress: (ev) => {
            const { loaded, total } = ev;

            onProgress &&
              onProgress({
                percent: parseInt(`${(loaded / total) * 100}`, 10),
                message: "正在上传中",
              });
          },
        },
        (res) => {
          if (res && res.body && res.body.code && res.body.code === 200) {
            onProgress &&
              onProgress({
                percent: 100,
                message: "上传成功",
              });
            resolve(res.body.data);
          } else {
            onProgress &&
              onProgress({
                percent: 0,
                message: "上传失败",
                error: res.error,
              });
            reject(res.error);
          }
        }
      );
    });
  }
}
