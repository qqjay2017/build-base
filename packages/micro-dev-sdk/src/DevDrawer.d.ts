/// <reference types="react" />
import "rc-drawer/assets/index.css";
import "antd/dist/antd.css";
export interface DevDrawerProps {
    systemId: string;
    prefixPath?: string;
}
export default function DevDrawer({ systemId, prefixPath }: DevDrawerProps): JSX.Element;
