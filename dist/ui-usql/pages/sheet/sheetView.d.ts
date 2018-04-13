/// <reference types="react" />
import * as React from 'react';
import { SheetUI } from '../../ui';
export interface SheetViewProps {
    className?: string;
    ui: SheetUI;
    sheetState: string;
    sheetData: any;
    flows: any;
}
export declare class SheetView extends React.Component<SheetViewProps> {
    private mainDetails;
    constructor(props: any);
    flowRow(item: any, index: number): JSX.Element;
    render(): JSX.Element;
}
