import React, { FC } from "react";
export interface SizeInfo {
    width: number;
    height: number;
    offsetWidth: number;
    offsetHeight: number;
}
export declare type OnResize = (size: SizeInfo, element: HTMLDivElement) => void;
export interface ResponsiveContainerProps {
    children: React.ReactElement;
    disabled?: boolean;
    width: number;
    height: number;
    onResize?: OnResize;
}
export declare const ResponsiveContainer: FC<ResponsiveContainerProps>;
