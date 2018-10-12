/// <reference types="react" />
import { VField } from './vField';
import { VArr } from './vArr';
import { VSubmit } from './vSubmit';
export declare abstract class VBand {
    protected label: string;
    protected view: () => JSX.Element;
    constructor(label: string);
    render(): JSX.Element;
    setAddRow(addRow: () => Promise<void>): void;
    readonly key: string;
    getVFields(): VField[];
    getVArr(): VArr;
    getVSubmit(): VSubmit;
    protected renderContent(): JSX.Element;
}
export interface FieldRes {
    label: string;
    placeHolder: string;
    suffix: string;
}
export declare class VFieldBand extends VBand {
    protected vField: VField;
    constructor(label: string, vField: VField);
    readonly key: string;
    getVFields(): VField[];
    protected renderContent(): JSX.Element;
}
export declare class VArrBand extends VBand {
    protected vArr: VArr;
    constructor(label: string, vArr: VArr);
    setAddRow(addRow: () => Promise<void>): void;
    readonly key: string;
    getVArr(): VArr;
    render(): JSX.Element;
}
export declare class VFieldsBand extends VBand {
    protected vFields: VField[];
    constructor(label: string, vFields: VField[]);
    readonly key: string;
    getVFields(): VField[];
    protected renderContent(): JSX.Element;
}
export declare class VSubmitBand extends VBand {
    protected vSubmit: VSubmit;
    constructor(vSubmit: VSubmit);
    readonly key: string;
    getVSubmit(): VSubmit;
    render(): JSX.Element;
}
