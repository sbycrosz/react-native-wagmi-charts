import React from 'react';
import { LineProps } from 'react-native-svg';
import { LineChartCursorProps } from './Cursor';
declare type LineChartCursorLineProps = {
    children?: React.ReactNode;
    color?: string;
    lineProps?: Partial<LineProps>;
} & Omit<LineChartCursorProps, 'type' | 'children'>;
export declare function LineChartCursorLine({ children, color, lineProps, ...cursorProps }: LineChartCursorLineProps): JSX.Element;
export declare namespace LineChartCursorLine {
    var displayName: string;
}
export {};
