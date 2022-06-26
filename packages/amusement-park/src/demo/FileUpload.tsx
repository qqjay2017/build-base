import { CsmFileUpload } from "@core/rc-components";
import { useState } from "react";

export default function CsmFileUploadDemo() {
  const [value, onChange] = useState([]);
  return (
    <div>
      <CsmFileUpload
        value={value}
        maxSize={1024 * 1024 * 2}
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
