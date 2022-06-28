import { RcFile, UploadRequestOption } from 'rc-upload/lib/interface';
import 'antd/es/message/style/index.css';
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
}
export declare const useCsmFileUpload: ({ value, API_URL, onChange, disabled, maxSize, apiData, typeText, accept, multiple, }: CsmFileUploadProps) => {
    fileList: any[];
    isDisabled: boolean;
    removeCur: (uid?: string, id?: string) => void;
    rcUploadProps: {
        isDisabled: boolean;
        multiple: boolean;
        onStart: (res: any) => void;
        onProgress: (e: any, file: any) => void;
        onSuccess: (res: any) => false;
        onError: (error: Error, ret: Record<string, unknown>, file: RcFile) => void;
        beforeUpload: (file: RcFile | any, FileList: RcFile[]) => boolean;
        accept: string;
        customRequest: ({ file, onProgress, onSuccess, onError }: UploadRequestOption<any>) => Promise<never> | {
            abort(): void;
        };
    };
};
