import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
import { VmForm } from '../vmForm';

export class VmSheetNew extends VmSheet {
    vmForm: VmForm;

    async beforeStart(param?:any) {
        this.vmForm = this.createVmFieldsForm();
    }

    protected view = Edit;
}

const Edit = ({vm}:{vm:VmSheetNew}) => {
    let {label, vmForm} = vm;
    return <Page header={label}>
        {vmForm.render()}
    </Page>;
}
