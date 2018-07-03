import * as React from 'react';
import { observer } from 'mobx-react';
import { nav } from 'tonva-tools';
import { Tuid } from '../../../entities';
import { ViewModel, TypeContent } from '../../viewModel';
import { VmTuidPicker, TypeVmTuidPicker } from './vmTuidPicker';
import { VmApi } from '../../vmApi';
import { VmControl } from '../control';
import { FieldUI } from '../formUI';
import { FormValues } from '../vmFieldsForm';

export type TypeVmTuidControl = typeof VmTuidControl; // new (vmApi:VmApi, tuid: Tuid, vmFormRowTuidInput: VmFormRowTuidInput, tuidContent: TypeContent) => VmTuidInput;
export type TypeIdFromValue = (values) => number;

export interface PickerConfig {
    picker: TypeVmTuidPicker;
    row: TypeContent;
    idFromValue?: TypeIdFromValue,
}

export class VmTuidControl extends VmControl { // ViewModel {
    protected vmApi:VmApi;
    tuid: Tuid;
    tuidContent: TypeContent;
    pickerConfig: PickerConfig;

    constructor(fieldUI: FieldUI, formValues:FormValues,
        vmApi:VmApi, tuid: Tuid, 
        tuidContent: TypeContent, 
        pickerConfig: PickerConfig
    ) {
        super(fieldUI, formValues);
        this.tuid = tuid;
        this.tuidContent = tuidContent;
        this.pickerConfig = pickerConfig;
        this.onClick = this.onClick.bind(this);
    }
    onClick = async () => {
        let typePicker = this.pickerConfig.picker;
        if (typePicker === undefined) typePicker = VmTuidPicker;
        let vmTuidPicker = new typePicker(this.vmApi, this.tuid, this);
        await vmTuidPicker.load();
        nav.push(vmTuidPicker.renderView());
    }
    idChanged(id:number) {
        this.tuid.useId(id);
        this.value = id;
    }
    protected view = TuidControl;
}

const TuidControl = observer(({vm}:{vm: VmTuidControl}) => {
    let {tuid, value, tuidContent:TuidContent, onClick} = vm;
    let tuidObj = tuid.getId(value);
    let content = !tuidObj?
        <>点击选择 {tuid.name}</> : 
        (
            typeof tuidObj === 'object'?
                <TuidContent {...tuidObj} />
                : <TuidContent id={value} />
        );
    return <button className="form-control btn btn-outline-info"
        type="button"
        style={{textAlign:'left', paddingLeft:'0.75rem'}}
        onClick={onClick}>
        {content}
    </button>;
});
