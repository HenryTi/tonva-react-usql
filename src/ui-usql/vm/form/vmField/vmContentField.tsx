/*
import { VmField } from "./vmField";

export class VmContentControl extends VmField {
    protected vmContent:VmContent;
    //tuid: TuidBase;
    //tuidContent: TypeContent;
    //pickerConfig: PickerConfig;

    constructor(fieldUI: FieldUI, formValues:FormValues, vmContent:VmContent
        //tuid: TuidBase, 
        //tuidContent: TypeContent, 
        //pickerConfig: PickerConfig
    ) {
        super(fieldUI, formValues);
        this.vmContent = vmContent;
        //this.tuid = tuid;
        //this.tuidContent = tuidContent;
        //this.pickerConfig = pickerConfig;
        this.setValue(formValues.values[this.name]);
        //if (id !== null) this.idChanged(id);
    }
    onClick = async () => {
        await this.vmContent.show();
    }
    protected view = observer(() => {
        return <div 
            className="form-control form-control-plaintext border border-info rounded bg-light cursor-pointer"
            onClick={this.onClick}>
            {this.vmContent.render()}
        </div>;
    });    
}
*/