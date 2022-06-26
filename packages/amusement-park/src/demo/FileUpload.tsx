import { CsmFileUpload } from "@core/rc-components/src";
import { useState } from "react";

export default function CsmFileUploadDemo() {
  const [value, onChange] = useState([]);
  return (
    <div>
      <CsmFileUpload
        value={value}
        maxSize={1024 * 1024 * 9999}
        onChange={onChange}
        multiple={3}
        apiData={{
          bucket: "cms",
          objectPathPre: "cms1011",
        }}
      />
    </div>
  );
}
