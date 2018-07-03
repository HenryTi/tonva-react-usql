import * as React from 'react';
import { SheetUIProps } from '../../ui';
export interface State {
    result: any;
}
export declare class SheetEditPage extends React.Component<SheetUIProps, State> {
    data: {
        id1: number;
        f1: number;
        f2: number;
        arr1: {
            f11: string;
            f12: string;
        }[];
    };
    id: number;
    constructor(props: any);
    click(): Promise<void>;
    action(): void;
    render(): JSX.Element;
}
