/// <reference types="react" />
import "rc-drawer/assets/index.css";
import "antd/es/menu/style/index.css";
export interface DevDrawerProps {
    systemId: string;
    prefixPath?: string;
}
export default function DevDrawer({ systemId, prefixPath }: DevDrawerProps): JSX.Element;
