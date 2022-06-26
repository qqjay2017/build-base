import { CsmFileUpload } from "@core/rc-components";

export default function CsmFileUploadDemo() {
  return (
    <div>
      <CsmFileUpload
        apiData={{
          bucket: "cms",
          objectPathPre: "cms1011",
        }}
      />
    </div>
  );
}
