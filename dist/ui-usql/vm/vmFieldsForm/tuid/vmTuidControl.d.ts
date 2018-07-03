import { Tuid } from '../../../entities';
import { TypeContent } from '../../viewModel';
import { TypeVmTuidPicker } from './vmTuidPicker';
import { VmApi } from '../../vmApi';
import { VmControl } from '../control';
import { FieldUI } from '../formUI';
import { FormValues } from '../vmFieldsForm';
export declare type TypeVmTuidControl = typeof VmTuidControl;
export declare type TypeIdFromValue = (values: any) => number;
export interface PickerConfig {
    picker: TypeVmTuidPicker;
    row: TypeContent;
    idFromValue?: TypeIdFromValue;
}
export declare class VmTuidControl extends VmControl {
    protected vmApi: VmApi;
    tuid: Tuid;
    tuidContent: TypeContent;
    pickerConfig: PickerConfig;
    constructor(fieldUI: FieldUI, formValues: FormValues, vmApi: VmApi, tuid: Tuid, tuidContent: TypeContent, pickerConfig: PickerConfig);
    onClick: () => Promise<void>;
    idChanged(id: number): void;
    protected view: ({ vm }: {
        vm: VmTuidControl;
    }) => JSX.Element;
}
