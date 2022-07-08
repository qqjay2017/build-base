import { CsmFileUpload } from "@core/rc-components/src";
import { useEffect, useState } from "react";

export default function CsmFileUploadDemo() {
  const [value, onChange] = useState([]);

  useEffect(() => {
   
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
