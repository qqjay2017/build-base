import 'rc-drawer/assets/index.css';
export default function SupportDrawer({ systemId, categoryId, platformCode, baseURL, httpError, }: {
    systemId: string;
    categoryId: string;
    platformCode: string;
    baseURL: string;
    httpError: (code?: number, data?: any) => void;
}): JSX.Element;
