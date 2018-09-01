import { VmField } from './vmField';
import { VmArr } from './vmArr';
import { VmSubmit } from './vmSubmit';
export declare abstract class VmBand {
    protected label: string;
    protected view: () => JSX.Element;
    constructor(label: string);
    render(): JSX.Element;
    protected readonly key: string;
    getVmFields(): VmField[];
    getVmArr(): VmArr;
    getVmSubmit(): VmSubmit;
    protected renderContent(): JSX.Element;
}
export declare class VmFieldBand extends VmBand {
    protected vmField: VmField;
    constructor(label: string, vmField: VmField);
    protected readonly key: string;
    getVmFields(): VmField[];
    protected renderContent(): JSX.Element;
}
export declare class VmArrBand extends VmBand {
    protected vmArr: VmArr;
    constructor(label: string, vmArr: VmArr);
    protected readonly key: string;
    getVmArr(): VmArr;
    render(): JSX.Element;
}
export declare class VmFieldsBand extends VmBand {
    protected vmFields: VmField[];
    constructor(label: string, vmFields: VmField[]);
    protected readonly key: string;
    getVmFields(): VmField[];
    protected renderContent(): JSX.Element;
}
export declare class VmSubmitBand extends VmBand {
    protected vmSubmit: VmSubmit;
    constructor(vmSubmit: VmSubmit);
    getVmSubmit(): VmSubmit;
    render(): JSX.Element;
}
