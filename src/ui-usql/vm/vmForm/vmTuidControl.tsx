import * as React from 'react';
import { observer } from 'mobx-react';
import { nav } from 'tonva-tools';
import { Tuid } from '../../entities';
import { ViewModel, TypeContent } from '../viewModel';
import { VmApi } from '../vmApi';
//import { VmTuidPicker, TypeVmTuidPicker } from './vmTuidPicker';
import { VmTuidPicker, TypeVmTuidPicker } from './vmPicker';
import { VmControl, RedMark } from './control';
import { FieldUI } from './formUI';
import { FormValues } from './vmForm';

export type TypeVmTuidControl = typeof VmTuidControl; // new (vmApi:VmApi, tuid: Tuid, vmFormRowTuidInput: VmFormRowTuidInput, tuidContent: TypeContent) => VmTuidInput;
export type TypeIdFromValue = (values) => number;

export interface PickerConfig {
    picker: TypeVmTuidPicker;
    row: TypeContent;
    //idFromValue?: TypeIdFromValue,
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
        this.setValue(formValues.values[this.name]);
        //if (id !== null) this.idChanged(id);
    }
    onClick = async () => {
        let typePicker = this.pickerConfig.picker;
        if (typePicker === undefined) typePicker = VmTuidPicker;
        let vmTuidPicker = new typePicker(
            this.vmApi,
            '搜索 - ' + this.tuid.name, 
            this.tuid, 
            this.onSelected, 
            this.pickerConfig && this.pickerConfig.row);
        await vmTuidPicker.loadSchema();
        nav.push(vmTuidPicker.render());
    }
    setValue(id:number) {
        this.tuid.useId(id);
        this.value = id;
    }
    onSelected = async (item:any) => {
        this.setValue(item.id);
    }
    /*
    idChanged(id:number) {
        this.tuid.useId(id);
        this.value = id;
    }*/
    protected view = TuidControl;
}

const buttonStyle:React.CSSProperties = {
    textAlign:'left', 
    paddingLeft:'0.75rem', 
    paddingRight:'0.75rem', 
    overflow: 'hidden'
};
const TuidControl = observer(({vm}:{vm: VmTuidControl}) => {
    let {tuid, value, fieldUI, tuidContent:TuidContent, onClick} = vm;
    let {readOnly} = fieldUI;
    tuid.useId(value);
    let tuidObj = tuid.getId(value);
    let content = !tuidObj?
        <>点击选择 {tuid.name}</> : 
        (
            typeof tuidObj === 'object'?
                <TuidContent {...tuidObj} />
                : <TuidContent id={value} />
        );
    if (readOnly === true) {
        return <div className="form-control form-control-plaintext border border-info rounded bg-light">{content}</div>;
    }
    let redDot;
    let {field, required} = fieldUI;
    if (required === true || field.null === false) {
        redDot = <RedMark />;
    }
    return <>
        {redDot}
        <button className="form-control btn btn-outline-info"
            type="button"
            style={buttonStyle}
            onClick={onClick}>
            {content}
        </button>
    </>;
});
