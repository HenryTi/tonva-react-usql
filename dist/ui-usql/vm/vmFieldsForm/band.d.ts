import { FieldBandUI, FieldsBandUI, ArrBandUI, SubmitBandUI } from "./formUI";
export declare type TypeFieldBand = ({}: FieldBandUI) => JSX.Element;
export declare type TypeFieldsBand = ({}: FieldsBandUI) => JSX.Element;
export declare type TypeArrBand = ({}: ArrBandUI) => JSX.Element;
export declare type TypeSubmitBand = ({}: SubmitBandUI) => JSX.Element;
export declare const FieldBand: ({ label, control, field }: FieldBandUI) => JSX.Element;
export declare const FieldsBand: ({ label, fieldUIs }: FieldsBandUI) => JSX.Element;
export declare const ArrBand: ({ label, name, bands, vmList }: ArrBandUI) => JSX.Element;
export declare const SubmitBand: ({ content, onSubmit }: SubmitBandUI) => JSX.Element;
