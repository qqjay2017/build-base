import { ReactElement } from 'react';
interface ResponsiveContainerProps {
    children: ReactElement;
    maxScale?: number;
    width: number;
    height: number;
    minWidth?: string | number;
    minHeight?: string | number;
    maxHeight?: number;
    debounceTime?: number;
    id?: string | number;
    className?: string | number;
}
export default function ResponsiveContainer(props: ResponsiveContainerProps): JSX.Element;
export {};
