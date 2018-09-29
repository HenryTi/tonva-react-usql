import * as React from 'react';
import { IObservableArray, observable } from 'mobx';
import _ from 'lodash';
import { List, FA, Muted } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { ViewModel, RowContent, TypeContent, JSONContent } from '../viewModel';
import { ArrFields, Field } from '../../entities';
import { VForm, FieldInputs } from './vForm';

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
    protected none: string;
    protected newSubmitCaption: string;
    protected editSubmitCaption: string;
    protected addRow: ()=>Promise<void>;

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
        let {label, none, newSubmit, editSubmit} = arrRes;
        this.none = none || ownerForm.none;
        this.newSubmitCaption = newSubmit || ownerForm.arrNewCaption;
        this.editSubmitCaption = editSubmit || ownerForm.arrEditCaption;
        this.label = label || name;
        let arrUI = (ui && ui.arrs && ui.arrs[name]) || {};
        this.rowContent = arrUI.rowContent;// || JSONContent;
        this.readOnly = readOnly;
        if (this.onEditRow === undefined) {
            this.vForm = new VForm({
                fields: fields,
                arrs: undefined,
                ui: arrUI,
                res: arrRes,
                inputs: inputs[name] as FieldInputs,
                none: ownerForm.none,
                submitCaption: 'submit',
                arrNewCaption: undefined,
                arrEditCaption: undefined,
                arrTitleNewButton: undefined,
                readonly: false,
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

    setAddRow(addRow:()=>Promise<void>) {
        this.addRow = addRow;
    }

    protected rowPage = () => {
        return <Page header={this.label} back="close">
            {this.vForm.render('py-3')}
        </Page>
    }
    private onSubmit = async () => {
        let {valueBoxs} = this.vForm;
        await this.onRowChanged(valueBoxs);
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
        if (this.rowContent === undefined)
            return <div className="px-3 py-2"><JSONContent {...item} /></div>
        return <this.rowContent {...item} />;
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
    private internalAddRow = async () => {
        this.rowValues = undefined;
        let {vSubmit} = this.vForm;
        vSubmit.caption = this.newSubmitCaption;
        vSubmit.className = 'btn btn-outline-success';
        await this.showRow(undefined);
        this.vForm.reset();
    }

    protected view = () => {
        let button;
        if (this.addRow !== undefined || this.readOnly === false) {
            button = <button onClick={this.addRow || this.internalAddRow}
                type="button" 
                className="btn btn-link p-0">
                {this.ownerForm.arrTitleNewButton}
            </button>;
        }
        let header = this.header || <div className="px-3 bg-light small" style={{paddingTop:'1px', paddingBottom:'1px'}}>
            <div className="flex-fill align-self-center">{this.label}</div>
            {button}
        </div>;
        return <List className="pb-3"
            header={header}
            none={<Muted className="px-3 py-2">{this.none}</Muted>}
            items={this.list}
            item={{render: this.renderItem, onClick: this.editRow}} />;
    };
}
