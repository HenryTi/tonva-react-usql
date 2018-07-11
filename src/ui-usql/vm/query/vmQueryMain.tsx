import * as React from 'react';
import { observer } from 'mobx-react';
import { TonvaForm, List, SubmitResult, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { Tuid, Query, Entity } from '../../entities';
import { VmQuery } from './vmQuery';
import { VmForm } from '../vmForm';

export class VmQueryMain extends VmQuery {
    vmForm: VmForm;

    async beforeStart(param?:any) {
        this.vmForm = this.createVmFieldsForm();
        this.vmForm.onSubmit = this.onSubmit;
    }

    onSubmit = async () => {
        await this.entity.resetPage(30, this.vmForm.values);
        await this.entity.loadPage();
        this.replacePage(<QueryResultPage vm={this} />);
    }

    again = () => {
        this.vmForm.reset();
        this.replacePage(<QueryPage vm={this} />);
    }

    renderExtra() {
        return;
    }

    protected view = QueryPage;
}

export const QueryPage = ({vm}: {vm:VmQueryMain}) => {
    let {label, vmForm} = vm;
    return <Page header={label}>
        {vmForm.render('mx-3 my-2')}
        {vm.renderExtra()}
    </Page>;
};

const QueryResultPage = ({vm}:{vm:VmQueryMain}) => {
    let {entity, label, again} = vm;
    let {name, list} = entity;
    let rightClose = <button
        className="btn btn-outline-success btn-sm"
        onClick={again}>
        <FA name="search" /> 再查询
    </button>;
    return <Page header={label} right={rightClose}>
        <List items={list} item={{}} />
    </Page>;
};
