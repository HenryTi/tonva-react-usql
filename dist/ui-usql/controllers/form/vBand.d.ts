/// <reference types="react" />
import { VField } from './vField';
import { VArr } from './vArr';
import { VSubmit } from './vSubmit';
export declare abstract class VBand {
    protected label: string;
    protected view: () => JSX.Element;
    constructor(label: string);
    render(): JSX.Element;
    protected readonly key: string;
    getVmFields(): VField[];
    getVmArr(): VArr;
    getVmSubmit(): VSubmit;
    protected renderContent(): JSX.Element;
}
export declare class VmFieldBand extends VBand {
    protected vmField: VField;
    constructor(label: string, vmField: VField);
    protected readonly key: string;
    getVmFields(): VField[];
    protected renderContent(): JSX.Element;
}
export declare class VmArrBand extends VBand {
    protected vmArr: VArr;
    constructor(label: string, vmArr: VArr);
    protected readonly key: string;
    getVmArr(): VArr;
    render(): JSX.Element;
}
export declare class VmFieldsBand extends VBand {
    protected vmFields: VField[];
    constructor(label: string, vmFields: VField[]);
    protected readonly key: any;
    getVmFields(): VField[];
    protected renderContent(): JSX.Element;
}
export declare class VmSubmitBand extends VBand {
    protected vmSubmit: VSubmit;
    constructor(vmSubmit: VSubmit);
    getVmSubmit(): VSubmit;
    render(): JSX.Element;
}
