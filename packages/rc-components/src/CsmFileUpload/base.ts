import { MinioSdk } from '@core/minio-sdk';
import { message as notification } from 'antd';
import { RcFile, UploadRequestOption } from 'rc-upload/lib/interface';
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import 'antd/es/message/style/index.css';
import { ConfigContext } from '../ConfigProvider/context';
export interface CsmFileUploadProps {
  value?: any[];
  API_URL?: string;
  onPreview?: () => any;
  maxSize?: number;
  disabled?: boolean;
  onChange?: (f: any) => any;
  typeText?: string;
  accept?: string;
  multiple: number;
  apiData: {
    bucket: string;
    objectPathPre: string;
  };
  needDownload?: boolean;
  fileTypeErrorMsg?: (file: RcFile) => string;
  fileSizeErrorMsg?: (file: RcFile) => string;
  fileMultipleErrorMsg?: (file: RcFile) => string;
  fileExistErrorMsg?: (file: RcFile) => string;
}
export const useCsmFileUpload = ({
  value = [],
  API_URL = '',
  onChange,
  disabled = false,
  maxSize = 1024 * 1024 * 1024,
  apiData,
  typeText = '支持扩展名：.rar .zip .doc .docx .pdf .jpg...',
  accept = '',
  multiple = 1,
  fileTypeErrorMsg,
  fileSizeErrorMsg,
  fileMultipleErrorMsg,
  fileExistErrorMsg,
}: CsmFileUploadProps) => {
  const configContext = useContext(ConfigContext);
  const minioRef = useRef(
    new MinioSdk({
      API_URL: API_URL || configContext.API_URL,
    }),
  );
  if (!minioRef || !minioRef.current) {
    minioRef.current = new MinioSdk({
      API_URL: API_URL,
    });
  }
  const fileList = useMemo(() => {
    if (value) {
      if (Array.isArray(value)) {
        return value;
      } else {
        return [value];
      }
    } else {
      return [];
    }
  }, [JSON.stringify(value)]);
  const fileItemMapRef = useRef<Record<string, any>>({});

  const _onChange = (v: any) => {
    onChange && onChange(v);
  };
  useEffect(() => {
    if (fileList && fileList.length) {
      fileList.forEach((f) => {
        if (f.uid || f.id) {
          fileItemMapRef.current[f.uid || f.id] = f;
        }
      });
    }
  }, [fileList]);
  const customRequest = ({ file, onProgress, onSuccess, onError }: UploadRequestOption<any>) => {
    if (!minioRef.current) {
      return Promise.reject({});
    }
    const _file = file as any;
    minioRef.current
      .putSmartObject({
        file: _file,
        apiData: apiData,
        onProgress: ({ percent }) => {
          onProgress && onProgress({ percent });
        },
      })
      .then(
        (res) => {
          onSuccess &&
            onSuccess({
              ...res,
              uid: _file.uid,
            });
        },
        (err) => {
          onError && onError(err);
        },
      );

    return {
      abort() {
        console.log('upload progress is aborted.');
      },
    };
  };

  const beforeUpload = useCallback(
    (file: RcFile | any, FileList: RcFile[]) => {
      const name = file.name || file.fileName + ' ';
      if (accept) {
        const acceptArr = accept.split(',').filter(Boolean);
        const _fileTypeArr = (file.name || file.fileName).split('.');
        const _fileType = '.' + _fileTypeArr[_fileTypeArr.length - 1];
        //  fileTypeErrorMsg,
        // fileSizeErrorMsg;
        if (!acceptArr.includes(_fileType.toLowerCase())) {
          const _fileTypeErrorMsg = fileTypeErrorMsg
            ? fileSizeErrorMsg(file)
            : name + '文件类型错误!';
          notification.error(_fileTypeErrorMsg);
          return false;
        }
      }
      if (file.size > maxSize) {
        const _fileSizeErrorMsg = fileSizeErrorMsg
          ? fileSizeErrorMsg(file)
          : name + ':该文件过大,最大支持' + (maxSize / 1024 / 1024).toFixed(0) + 'MB';
        notification.error(_fileSizeErrorMsg);
        return false;
      }
      if (fileList.length + FileList.length > multiple) {
        const _fileMultipleErrorMsg = fileMultipleErrorMsg
          ? fileMultipleErrorMsg(file)
          : '已到达最大数量' + multiple + ',请删除已有文件后继续上传';

        notification.error(_fileMultipleErrorMsg);
        return false;
      }
      const find = file.uid && fileItemMapRef.current[file.uid];
      if (find) {
        const _fileExistErrorMsg = fileExistErrorMsg
          ? fileExistErrorMsg(file)
          : name + '该文件已存在';
        notification.error(_fileExistErrorMsg);

        return false;
      }

      return true;
    },
    [fileList],
  );
  const updateFileItem = () => {
    let arr = Reflect.ownKeys(fileItemMapRef.current).map(
      (d) => (fileItemMapRef.current as any)[d],
    );
    let arrTrue = arr.filter((f) => f && (f.id || f.uid));

    const isOnlyOne = multiple === 1;
    if (!arrTrue || !arrTrue.length) {
      return _onChange(isOnlyOne ? null : []);
    }
    return _onChange(isOnlyOne ? arrTrue[0] : arrTrue);
  };
  const onSuccess = useCallback(
    (res) => {
      if (res.uid) {
        if (fileItemMapRef.current[res.uid] === 'false') {
          return false;
        }
        fileItemMapRef.current[res.uid] = {
          ...res,
          percent: 100,
        };
      }

      updateFileItem();
    },
    [fileList, _onChange, apiData],
  );
  const removeCur = useCallback(
    (uid?: string, id?: string) => {
      const temp = uid || id;
      if (temp) {
        fileItemMapRef.current[temp] = 'false';
      }

      updateFileItem();
    },
    [_onChange, fileList],
  );
  const onError = useCallback(
    (error: Error, ret: Record<string, unknown>, file: RcFile) => {
      notification.warn('文件上传出错,已在文件列表中移除,请重新上传');
      removeCur(file.uid, undefined);
    },
    [fileList, removeCur],
  );
  const onStart = useCallback(
    (res) => {
      if (res.uid) {
        fileItemMapRef.current[res.uid] = res;
        updateFileItem();
      }
    },
    [fileList, _onChange, apiData],
  );
  const onProgress = useCallback(
    (e, file) => {
      const cur = fileItemMapRef.current[file.uid];
      if (cur && cur === 'false') {
        return;
      }
      const _percent = e.percent;
      if (cur && cur.percent) {
        if (_percent <= cur.percent) {
          return;
        }
      }
      fileItemMapRef.current[file.uid] = {
        ...file,
        fileName: file.name,
        percent: _percent,
      };
      updateFileItem();
    },
    [fileList, _onChange, apiData],
  );
  const isDisabled = useMemo(() => {
    if (disabled) {
      return disabled;
    }
    return fileList.length >= multiple;
  }, [fileList, multiple, disabled]);

  return {
    fileList,
    isDisabled,
    disabled,
    removeCur,
    rcUploadProps: {
      disabled,
      isDisabled,
      multiple: multiple != 1,
      onStart,
      onProgress,
      onSuccess,
      onError,
      beforeUpload,
      accept,
      customRequest,
    },
  };
};
