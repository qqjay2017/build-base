import { ApiFileModel } from '@core/minio-sdk';
import { Modal } from 'antd';
import React, { useMemo, useState } from 'react';
import CsmFileUpload from '../CsmFileUpload';
import { FileItem } from '../FileItem';

import { showModal, ShowModalCompProps } from '../showModal';
import { SelectModalPromise, ShowModalCompCustomProps, ShowModalFnPropsBase } from './base';

const FileUploadModal = (props: ShowModalCompProps<any>) => {
  const { defaultValue = [], initSearch = {}, handles } = props;
  const [files, setFiles] = useState<ApiFileModel[]>([...defaultValue]);
  const loading = useMemo(() => {
    const find = files.find((f) => !f.fileSrcUrl);
    if (find) {
      return true;
    } else {
      return false;
    }
  }, [files]);
  return (
    <Modal
      title="选择文件"
      confirmLoading={loading}
      {...props.modalProps}
      onOk={() => {
        handles.resolve({
          selectedRow: files,
        });
        handles.remove();
      }}
      onCancel={() => {
        handles.remove();
      }}
    >
      <div>
        {initSearch.readOnly ? (
          <div>
            {files.map((f, index) => {
              return <FileItem {...f} key={index} />;
            })}
          </div>
        ) : (
          <CsmFileUpload
            width={472}
            value={files}
            onChange={setFiles}
            multiple={99}
            apiData={{
              bucket: initSearch.bucket,
              objectPathPre: initSearch.objectPathPre,
            }}
            {...props.csmFileUpload}
          />
        )}
      </div>
    </Modal>
  );
};

export type ISelectFileModalProps = ShowModalFnPropsBase<{
  bucket?: string;
  objectPathPre?: string;
  readOnly?: boolean;
}>;

export function selectFileModal({
  modalProps = {},
  initSearch = {},
  ...rest
}: ISelectFileModalProps = {}): Promise<SelectModalPromise<ApiFileModel[]>> {
  return showModal(
    FileUploadModal,
    {
      initSearch,
      ...rest,
    },
    {
      title: '选择上传文件',
      ...modalProps,
    },
  );
}
