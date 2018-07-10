import { VmSheet, SheetUI } from './vmSheet';
import { Sheet } from '../../entities';
import { VmApi } from '../vmApi';
import { VmForm, VmFormOptions } from '../vmForm';
export declare class VmView extends VmSheet {
    vmForm: VmForm;
    data: any;
    state: string;
    flows: any[];
    constructor(vmApi: VmApi, sheet: Sheet, ui: SheetUI, data: any, state: string, flows: any[]);
    protected readonly fieldsFormOptions: VmFormOptions;
    flowRow: (item: any, index: number) => JSX.Element;
    protected view: ({ vm }: {
        vm: VmView;
    }) => JSX.Element;
}
