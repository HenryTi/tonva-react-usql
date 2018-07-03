import * as React from 'react';
import { SubmitResult } from 'tonva-react-form';
import { Entity } from '../../entities';
import { SheetUI } from '../../ui';
import { MainDetails } from './model';
export interface MainDetailsViewProps {
    ui: SheetUI;
    mainDetails: MainDetails;
    values: any;
}
export declare class MainDetailsView<T extends Entity> extends React.Component<MainDetailsViewProps> {
    constructor(props: any);
    private detailRow;
    private buildMainRows;
    onSubmit(values: any): Promise<SubmitResult>;
    render(): JSX.Element;
}
