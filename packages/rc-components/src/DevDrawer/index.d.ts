/// <reference types="react" />
import 'rc-drawer/assets/index.css';
import type { IResourceList } from '@core/service-api';
export interface DevDrawerProps {
    systemId: string;
    onTitleClick?: (l: Partial<IResourceList>) => void;
}
export default function DevDrawer({ systemId, onTitleClick }: DevDrawerProps): JSX.Element;
