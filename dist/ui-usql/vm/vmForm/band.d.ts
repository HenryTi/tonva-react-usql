import { FieldBandUIX, FieldsBandUIX, ArrBandUIX, SubmitBandUIX } from "./formUIX";
export declare type TypeFieldBand = ({}: FieldBandUIX) => JSX.Element;
export declare type TypeFieldsBand = ({}: FieldsBandUIX) => JSX.Element;
export declare type TypeArrBand = ({}: ArrBandUIX) => JSX.Element;
export declare type TypeSubmitBand = ({}: SubmitBandUIX) => JSX.Element;
export declare const FieldBand: ({ label, control, field }: FieldBandUIX) => JSX.Element;
export declare const FieldsBand: ({ label, fieldUIs }: FieldsBandUIX) => JSX.Element;
export declare const ArrBand: ({ label, name, bands, vmList }: ArrBandUIX) => JSX.Element;
export declare const SubmitBand: ({ content, onSubmit, form }: SubmitBandUIX) => JSX.Element;
