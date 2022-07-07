import { CsmFileUpload } from "@core/rc-components/src";
import { useEffect, useState } from "react";

export default function CsmFileUploadDemo() {
  const [value, onChange] = useState([]);

  useEffect(() => {
    onChange({
      id: "123312aa",
      delFlag: null,
      dataVersion: null,
      createdId: null,
      createdEmplId: null,
      createdDatetime: null,
      modiId: null,
      modiEmplId: null,
      modiDatetime: null,
      busCode: null,
      busId: null,
      bucket: "schedule",
      objectName: "schedule1031/c87fd1279ac94cadb4b8ab8fc549cab9.pdf",
      fileName: "到货单明细.pdf",
      fileSize: "229849",
      fileType: "PDF",
      contentType: "application/pdf",
      pieceNum: 1,
      blockNum: null,
      transactionHash: null,
      txHash: null,
      docId: null,
      contentHash: null,
      transactionId: null,
      resource: null,
      proofWay: null,
      identifier: "0cfa1365184f0b526e4674738beabeed",
      fileSrcUrl:
        "http://ymsl-minio.kxgcc.com:30872/schedule/schedule1031/c87fd1279ac94cadb4b8ab8fc549cab9.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20220707%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220707T104214Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=dcd363867d082fa2697cfe3278191b04dcf7d9f1b8ce6e7bc201c5384cf2f96d",
      uploadId: null,
    });
  }, []);
  return (
    <div>
      <CsmFileUpload
        value={value}
        maxSize={1024 * 1024 * 9999}
        onChange={onChange}
        multiple={3}
        apiData={{
          bucket: "schedule",
          objectPathPre: "schedule1031",
        }}
      />
    </div>
  );
}
