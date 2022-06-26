import { DownloadOutlined } from '@ant-design/icons';
import React from 'react';
import { fileDownloadApi } from '@core/service-api';
import FileSaver from 'file-saver';
interface FileDownloadIconProps {
  bucket: string;
  objectName: string;
  fileName: string;
  fileSrcUrl?: string;
  size?: string;
  color?: string;
}

export default function FileDownloadIcon(props: FileDownloadIconProps) {
  const handleDownload = () => {
    fileDownloadApi(props)
      .then((res) => {
        if (res && res.blob) {
          FileSaver.saveAs(res.blob, props.fileName);
        } else {
          FileSaver.saveAs(props.fileSrcUrl, props.fileName);
        }
      })
      .catch(() => {
        FileSaver.saveAs(props.fileSrcUrl, props.fileName);
      });
  };
  return (
    <DownloadOutlined
      onClick={() => handleDownload()}
      style={{
        cursor: 'pointer',
        marginLeft: '0',
        color: props.color || '#1677FF',
        fontSize: props.size || '16px',
        width: props.size || '16px',
        height: props.size || '16px',
      }}
    />
  );
}
