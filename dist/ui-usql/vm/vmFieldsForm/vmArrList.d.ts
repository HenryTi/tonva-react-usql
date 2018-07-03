import { ViewModel } from '../viewModel';
import { Arr } from '../field';
import { ArrValues } from './vmFieldsForm';
import { ArrBandUI } from './formUI';
export declare class VmArrList extends ViewModel {
    arr: Arr;
    arrValues: ArrValues;
    list: any[];
    arrBandUI: ArrBandUI;
    constructor(arr: Arr, arrValues: ArrValues, arrBandUI: ArrBandUI);
    renderItem: (item: any, index: number) => JSX.Element;
    itemClick: (item: any) => void;
    renderView(): JSX.Element;
}
