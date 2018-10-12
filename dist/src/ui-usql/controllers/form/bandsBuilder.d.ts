import { VBand } from "./vBand";
import { VForm, FormOptions } from "./vForm";
export declare class BandsBuilder {
    private vForm;
    private onSubmit;
    private fields;
    private arrs;
    private formItems;
    private layout;
    private res;
    constructor(vForm: VForm, options: FormOptions, onSubmit: (values: any) => Promise<void>);
    build(): VBand[];
    private resFromName;
    private bandsOnFly;
    private bandsFromFields;
    private bandsFromLayout;
    private bandFromField;
    private bandFromArr;
}
