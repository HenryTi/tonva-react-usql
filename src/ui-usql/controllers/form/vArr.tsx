import * as React from 'react';
import { IObservableArray, observable } from 'mobx';
import * as _ from 'lodash';
import { List, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { ViewModel, RowContent, TypeContent, JSONContent } from '../viewModel';
import { ArrFields, Field } from '../../entities';
import { VForm, FieldInputs } from './vForm';
import { SubmitBandUI } from '../formUI';
import { VBand } from './vBand';
import { observer } from 'mobx-react';

export type ArrEditRow = (initValues:any, onRowChanged:(rowValues:any)=>void) => Promise<void>;

export class VArr extends ViewModel {
    protected readOnly: boolean;
    protected label: any;
    protected header: any;
    protected footer: any;
    protected rowValues: any;                 // 仅仅用来判断是不是新增，undefined则是新增
    protected onEditRow: ArrEditRow;
    protected ownerForm:VForm;
    protected vForm:VForm;
    protected rowContent:TypeContent;
    protected newSubmitCaption: string;
    protected editSubmitCaption: string;

    name:string;
    list: IObservableArray<any>;

    constructor(ownerForm:VForm, arr:ArrFields, onEditRow?:ArrEditRow) {
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
            this.vForm = new VForm({
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
        this.vForm.reset();
        this.list.clear();
    }

    protected rowPage = () => {
        return <Page header={this.label} back="close">
            {this.vForm.render('p-3')}
        </Page>
    }
    private onSubmit = async () => {
        let values = this.vForm.values;
        await this.onRowChanged(values);
        //if (this.afterEditRow !== undefined) await this.afterEditRow(values);
    }

    private onRowChanged = async (rowValues:any) => {
        if (this.rowValues === undefined) {
            this.list.push(rowValues);
            if (this.onEditRow === undefined)
                this.vForm.reset();
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
        this.vForm.reset();
        if (rowValues !== undefined) this.vForm.setValues(rowValues);
        nav.push(<this.rowPage />);
    }
    private editRow = async (rowValues:any): Promise<void> => {
        this.rowValues = rowValues;
        let {vSubmit} = this.vForm;
        if (vSubmit !== undefined) {
            vSubmit.caption = this.editSubmitCaption;
            vSubmit.className = 'btn btn-outline-success';
        }
        await this.showRow(rowValues);
    }
    private addRow = async () => {
        this.rowValues = undefined;
        let {vSubmit} = this.vForm;
        vSubmit.caption = this.newSubmitCaption;
        vSubmit.className = 'btn btn-outline-success';
        await this.showRow(undefined);
        this.vForm.reset();
    }

    protected view = observer(() => {
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
