import * as React from 'react';
import { List } from 'tonva-react-form';
import { ViewModel } from '../viewModel';
import { Arr } from '../field';
import { ArrValues } from './vmFieldsForm';
import { ArrBandUI } from './formUI';

export class VmArrList extends ViewModel {
    arr: Arr;
    arrValues: ArrValues;
    list: any[];
    arrBandUI:ArrBandUI;
    
    constructor(arr:Arr, arrValues:ArrValues, arrBandUI:ArrBandUI) {
        super();
        this.arr = arr;
        this.arrValues = arrValues;
        this.arrBandUI = arrBandUI;
        this.list = [{a:1,b:2,c:3}, {a:3.3,b:22,c:3}];
    }

    renderItem = (item:any, index:number) => {
        return <div className="px-3 py-2">{JSON.stringify(item)}</div>;
    }

    itemClick = (item:any) => {
        alert(JSON.stringify(item));
    }

    renderView() {
        return <List
            header={this.arrBandUI.label}
            items={this.list} 
            item={{render: this.renderItem, onClick: this.itemClick}} />;
    }
}
