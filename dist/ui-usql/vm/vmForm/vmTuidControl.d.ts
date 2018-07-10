import { Tuid } from '../../entities';
import { TypeContent } from '../viewModel';
import { VmApi } from '../vmApi';
import { TypeVmTuidPicker } from './vmPicker';
import { VmControl } from './control';
import { FieldUI } from './formUI';
import { FormValues } from './vmForm';
export declare type TypeVmTuidControl = typeof VmTuidControl;
export declare type TypeIdFromValue = (values: any) => number;
export interface PickerConfig {
    picker: TypeVmTuidPicker;
    row: TypeContent;
}
export declare class VmTuidControl extends VmControl {
    protected vmApi: VmApi;
    tuid: Tuid;
    tuidContent: TypeContent;
    pickerConfig: PickerConfig;
    constructor(fieldUI: FieldUI, formValues: FormValues, vmApi: VmApi, tuid: Tuid, tuidContent: TypeContent, pickerConfig: PickerConfig);
    onClick: () => Promise<void>;
    setValue(id: number): void;
    onSelected: (item: any) => Promise<void>;
    protected view: ({ vm }: {
        vm: VmTuidControl;
    }) => JSX.Element;
}
