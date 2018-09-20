import { VBand } from "./vBand";
import { VForm, FormOptions } from "./vForm";
export declare class BandsBuilder {
    private vForm;
    private onSubmit;
    private fields;
    private arrs;
    private bandUIs;
    private compute;
    private res;
    private formValues;
    private readOnly;
    constructor(vForm: VForm, options: FormOptions, onSubmit: (values: any) => Promise<void>);
    build(): VBand[];
    private labelFromName;
    private bandsOnFly;
    private bandsFromFields;
    private bandsFromUI;
    private bandFromUI;
    private bandFromFieldUI;
    private bandFromArrUI;
    private bandFromFieldsUI;
    private bandFromSubmitUI;
    private vFieldFromField;
    private bandFromField;
    private bandFromArr;
    private vFieldFromUI;
    private vArrFromUI;
}
