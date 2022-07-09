/// <reference types="react" />
interface FileDownloadIconProps {
    bucket: string;
    objectName: string;
    fileName: string;
    fileSrcUrl?: string;
    size?: string;
    fileSize?: string | number;
    color?: string;
}
export default function FileDownloadIcon(props: FileDownloadIconProps): JSX.Element;
export {};
