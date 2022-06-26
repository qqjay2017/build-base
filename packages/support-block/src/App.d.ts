/// <reference types="react" />
import "rc-drawer/assets/index.css";
import "./index.less";
export default function App({ systemId, categoryId, platformCode, baseURL, httpError, }: {
    systemId: string;
    categoryId: string;
    platformCode: string;
    baseURL: string;
    httpError: (code?: number, data?: any) => void;
}): JSX.Element;
