import { VmBand } from "./vmBand";
import { VmForm, FormOptions } from "./vmForm";
export declare class BandsBuilder {
    private vmForm;
    private onSubmit;
    private fields;
    private arrs;
    private ui;
    private res;
    private formValues;
    private readOnly;
    constructor(vmForm: VmForm, options: FormOptions, onSubmit: (values: any) => Promise<void>);
    build(): VmBand[];
    private labelFromName;
    private bandsOnFly;
    private bandsFromFields;
    private bandsFromUI;
    private bandFromUI;
    private bandFromFieldUI;
    private bandFromArrUI;
    private bandFromFieldsUI;
    private bandFromSubmitUI;
    private vmFieldFromField;
    private bandFromField;
    private bandFromArr;
    private vmFieldFromUI;
    private vmArrFromUI;
}
