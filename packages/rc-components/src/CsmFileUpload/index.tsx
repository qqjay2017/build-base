import React, { memo } from 'react';

import RcUpload from 'rc-upload';

import { DeleteOutlined, InboxOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import FileTypeIcon from '../FileTypeIcon';
import { CsmFileUploadProps, useCsmFileUpload } from './base';
import FileDownloadIcon from '../FileDownloadIcon';

const VideoUploadStyle = styled.div`
  width: 384px;
  padding: 8px 0;
  max-width: 73vw;
`;

const VideoSelectWrap = styled.div<{ cursor?: string }>`
  position: relative;
  width: 100%;
  height: 192px;
  background: #fff;
  border-radius: 4px;
  border: 1px dashed rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${(p) => p.cursor || 'pointer'};
`;

const VideoSelectSpan = styled.div`
  margin-top: 18px;
  font-size: 16px;

  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  user-select: none;
`;

// const CloseWrap = styled.div`
//   position: absolute;
//   top: -8px;
//   right: -8px;
//   border: 1px solid #989898;
//   border-radius: 50%;
//   padding: 2px;
//   width: 20px;
//   height: 20px;
//   background-color: #efefef;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 3;
// `;

const TypeText = styled.div`
  font-size: 14px;

  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
  margin-top: 4px;
  user-select: none;
`;
const FileItemContainer = styled.div`
  max-width: 384px;
  width: 100%;
`;
const FileItemWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
`;

const FileNameSpan = styled.div`
  flex: 1;

  font-size: 14px;

  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
  position: relative;
`;

const DeleteOutlinedWrap = styled.div`
  padding: 0 4px;
  cursor: pointer;
`;

const FileNamePercentBottom = styled.div`
  width: 100%;
  height: 2px;
  position: absolute;
  left: 0;
  bottom: -2px;
  background-color: rgba(238, 238, 238, 1);
`;

const FileNamePercent = styled(FileNamePercentBottom)<{ percent: number }>`
  width: ${(props) => props.percent + '%'};
  background-color: rgba(22, 119, 255, 1);
`;

const CsmFileUpload: React.FC<CsmFileUploadProps> = ({
  needDownload = true,
  value = [],
  API_URL = '',
  onChange,
  disabled = false,
  maxSize = 1024 * 1024 * 1024,
  apiData,
  typeText = '支持扩展名：.rar .zip .doc .docx .pdf .jpg...',
  accept = '',
  multiple = 1,
}) => {
  const { rcUploadProps, fileList, removeCur, isDisabled } = useCsmFileUpload({
    value,
    API_URL,
    onChange,
    disabled,
    maxSize,
    apiData,
    typeText,
    accept,
    multiple,
  });
  return (
    <VideoUploadStyle>
      <div>
        <RcUpload {...rcUploadProps}>
          <VideoSelectWrap cursor={isDisabled ? 'not-allowed' : 'pointer'}>
            <InboxOutlined style={{ fontSize: '44px', color: 'rgba(22, 119, 255, 1)' }} />

            <VideoSelectSpan>点击或将文件拖拽到这里上传</VideoSelectSpan>
            <TypeText>{typeText}</TypeText>
          </VideoSelectWrap>
        </RcUpload>
      </div>

      <FileItemContainer>
        {fileList.map((v, index) => {
          return (
            <FileItemWrap key={v.uid + v.id + '' + index}>
              <FileTypeIcon fileName={v.fileName}></FileTypeIcon>
              <FileNameSpan>
                {v.fileName}
                {v.percent && v.percent < 100 && (
                  <>
                    <FileNamePercentBottom></FileNamePercentBottom>
                    <FileNamePercent percent={v.percent || 0}></FileNamePercent>
                  </>
                )}
              </FileNameSpan>
              <DeleteOutlinedWrap onClick={() => removeCur(v.uid, v.id)}>
                <DeleteOutlined
                  style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)' }}
                ></DeleteOutlined>
              </DeleteOutlinedWrap>
              {needDownload && v.bucket && v.objectName && v.fileName && (
                <DeleteOutlinedWrap>
                  <FileDownloadIcon
                    size={'12px'}
                    bucket={v.bucket}
                    objectName={v.objectName}
                    fileName={v.fileName}
                  />
                </DeleteOutlinedWrap>
              )}
            </FileItemWrap>
          );
        })}
      </FileItemContainer>
    </VideoUploadStyle>
  );
};

export default memo(CsmFileUpload);
