export function fileDownloadApi(data: {
  bucket?: string;
  objectName?: string;
  fileName?: string;
}) {
  return fetch(
    `/api/minio/v1/file/download/file?bucket=${data.bucket}&objectName=${data.objectName}&fileName=${data.fileName}`,
    {
      headers: {
        fp: localStorage.getItem("fp") || "1",
        ct: localStorage.getItem("ct") || "1",
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        pt: sessionStorage.getItem("pt") || "1",
      },
    }
  )
    .then((res) => res.blob())
    .then((blob) => {
      return {
        blob: new Blob([blob]),
        type: blob.type,
      };
    });
}
