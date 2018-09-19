import * as React from 'react';
import { IObservableArray, observable } from 'mobx';
import * as _ from 'lodash';
import { List, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { ViewModel, RowContent, TypeContent, JSONContent } from '../viewModel';
import { ArrFields, Field } from '../../entities';
import { VForm, FieldInputs } from './vForm';
//import { ArrBandUIX } from './formUIX';
//import { VmApi } from '../vmApi';
import { SubmitBandUI } from '../formUI';
import { VBand } from './vBand';
import { observer } from 'mobx-react';
//import { VmPage } from '../vmPage';

export type ArrEditRow = (initValues:any, onRowChanged:(rowValues:any)=>void) => Promise<void>;

export class VArr extends ViewModel {
    /*
    //protected vmApi: VmApi;
    //protected arrBandUI: ArrBandUIX;
    arr: ArrFields;
    vmForm: VmForm;
*/

    protected readOnly: boolean;
    protected label: any;
    protected header: any;
    protected footer: any;
    protected rowValues: any;                 // 仅仅用来判断是不是新增，undefined则是新增
    protected onEditRow: ArrEditRow;
    protected ownerForm:VForm;
    protected vmForm:VForm;
    protected rowContent:TypeContent;
    protected newSubmitCaption: string;
    protected editSubmitCaption: string;

    //protected bands:VmBand[];

    name:string;
    list: IObservableArray<any>;

    constructor(ownerForm:VForm, arr:ArrFields, onEditRow?:ArrEditRow) { //name:string, label, rowContent:TypeContent, bands:VmBand[]) {
        super();
        this.ownerForm = ownerForm;
        let {name, fields} = arr;
        this.name = name;
        let {ui, res, readOnly, inputs, formValues} = ownerForm;
        let arrsRes = res.arrs;
        let arrRes = arrsRes !== undefined? arrsRes[name] : {};
        let {label, newSubmit, editSubmit} = arrRes;
        this.newSubmitCaption = newSubmit || ownerForm.arrNewCaption;
        this.editSubmitCaption = editSubmit || ownerForm.arrEditCaption;
        this.label = label || name;
        let arrUI = ui && ui.arrs && ui.arrs[name];
        this.rowContent = JSONContent;
        this.readOnly = readOnly;
        if (this.onEditRow === undefined) {
            this.vmForm = new VForm({
                fields: fields,
                arrs: undefined,
                ui: arrUI,
                res: arrRes,
                inputs: inputs[name] as FieldInputs,
                submitCaption: 'submit',
                arrNewCaption: undefined,
                arrEditCaption: undefined,
            }, this.readOnly===true? undefined: this.onSubmit);
        }
        else {
            this.onEditRow = onEditRow;
        }
        this.list = formValues.values[name];
    }

    reset() {
        this.vmForm.reset();
        this.list.clear();
    }

    protected rowPage = () => {
        return <Page header={this.label} back="close">
            {this.vmForm.render('p-3')}
        </Page>
    }
    private onSubmit = async () => {
        let values = this.vmForm.values;
        await this.onRowChanged(values);
        //if (this.afterEditRow !== undefined) await this.afterEditRow(values);
    }

    private onRowChanged = async (rowValues:any) => {
        if (this.rowValues === undefined) {
            this.list.push(rowValues);
            if (this.onEditRow === undefined)
                this.vmForm.reset();
            else
                await this.onEditRow(undefined, this.onRowChanged);
        }
        else {
            _.merge(this.rowValues, rowValues);
            if (this.onEditRow === undefined) nav.pop();
        }
    }

    private renderItem = (item:any, index:number) => {
        return <div className="px-3 py-2"><this.rowContent {...item} /></div>;
    }
    private showRow = async (rowValues:any):Promise<any> => {
        if (this.onEditRow !== undefined) {
            await this.onEditRow(rowValues, this.onRowChanged);
            return;
        }
        this.vmForm.reset();
        if (rowValues !== undefined) this.vmForm.setValues(rowValues);
        nav.push(<this.rowPage />);
    }
    private editRow = async (rowValues:any): Promise<void> => {
        this.rowValues = rowValues;
        let {vmSubmit} = this.vmForm;
        if (vmSubmit !== undefined) {
            vmSubmit.caption = this.editSubmitCaption;
            vmSubmit.className = 'btn btn-outline-success';
        }
        await this.showRow(rowValues);
    }
    private addRow = async () => {
        this.rowValues = undefined;
        let {vmSubmit} = this.vmForm;
        vmSubmit.caption = this.newSubmitCaption;
        vmSubmit.className = 'btn btn-outline-success';
        await this.showRow(undefined);
        this.vmForm.reset();
    }

    protected view = observer(() => {
        //let {label, list, renderItem, start, addClick, header, footer, readOnly} = vm;
        let button;
        if (this.readOnly === false) {
            button = <button onClick={this.addRow}
                type="button" 
                className="btn btn-outline-info btn-sm">
                <FA name="plus" />
            </button>;
        }
        let header = this.header || <div className="px-3 bg-light" style={{paddingTop:'1px', paddingBottom:'1px'}}>
            <div className="flex-fill align-self-center">{this.label}</div>
            {button}
        </div>;
        return <List
            header={header}
            items={this.list} 
            item={{render: this.renderItem, onClick: this.editRow}} />;
    });
}
/*
const ArrList = ({vm}:{vm:VmArr}) => {
    let {label, list, renderItem, start, addClick, header, footer, readOnly} = vm;
    let button;
    if (readOnly === false) {
        button = <button onClick={addClick}
            type="button" 
            className="btn btn-primary btn-sm">
            <FA name="plus" />
        </button>;
    }
    header = header || <div className="">
        <div className="flex-fill align-self-center">{label}</div>
        {button}
    </div>;
    return <List
        header={header}
        footer={footer}
        items={list} 
        item={{render: renderItem, onClick: start}} />;
};

const RowPage = ({vm}:{vm:VmArr}) => {
    let {label, vmForm} = vm;
    
    return <Page header={label}>
        {vmForm.render()}
    </Page>
}
*/