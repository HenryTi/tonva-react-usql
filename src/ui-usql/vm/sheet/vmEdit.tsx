import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
import { VmFieldsForm } from '../vmFieldsForm';

export class VmEdit extends VmSheet {
    vmFieldsForm: VmFieldsForm;

    async load() {
        await super.load();
        let {schema} = this.entity;
        let {fields, arrs} = schema;
        this.vmFieldsForm = new VmFieldsForm({
            fields: fields,
            arrs: arrs,
            vmApi: this.vmApi,
        });
    }

    showField1 = () => {
        this.vmFieldsForm.showBands(['f1'], 'f1');
    }

    showField2 = () => {
        this.vmFieldsForm.showBands(['f2'], 'f2');
    }

    showAll = () => {
        this.vmFieldsForm.showBands(undefined);
    }

    protected view = Edit;
}

const Edit = ({vm}:{vm:VmEdit}) => {
    let {vmFieldsForm, showAll, showField1, showField2} = vm;
    return <Page header={vm.caption}>
        {vmFieldsForm.renderView()}
        <div>
            <button className="btn btn-primary" onClick={showAll}>all</button> &nbsp; 
            <button className="btn btn-primary" onClick={showField1}>f1</button> &nbsp; 
            <button className="btn btn-primary" onClick={showField2}>f2</button>
        </div>
    </Page>;
}
