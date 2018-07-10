import * as React from 'react';
import { observer } from 'mobx-react';
import { TonvaForm, List, SubmitResult, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { Tuid, Query, Entity } from '../../entities';
import { VmQuery } from './vmQuery';

export class VmQueryMain extends VmQuery {
    protected buildValuesFromSchema() {
        this.values = this.buildObservableValues(this.entity.schema.fields);
    }

    async submit() {
        await this.entity.resetPage(30, this.values);
        await this.entity.loadPage();
        nav.push(<this.resultPage vm={this} />);
    }

    close = () => nav.pop(2);

    /*
    renderForm(className?:string) {
        let fieldUIs:any[] = undefined;
        let vmForm = this.newVmForm(
            this.entity.schema.fields, fieldUIs, className);
        return vmForm.renderView();
    }*/

    renderExtra() {
        return;
    }

    resultPage = observer(QueryResultPage);
    protected view = QueryPage;
}

export const QueryPage = ({vm}: {vm:VmQueryMain}) => {
    let {label, values} = vm;
    return <Page header={label}>
        {vm.renderForm('mx-3 my-2')}
        {vm.renderExtra()}
    </Page>;
};

const QueryResultPage = ({vm}:{vm:VmQueryMain}) => {
    let {entity, label, close} = vm;
    let {name, list} = entity;
    let rightClose = <button
        className="btn btn-outline-secondary btn-sm"
        onClick={close}>
        <FA name="close" />
    </button>;
    return <Page header={label || name} right={rightClose}>
        <List items={list} item={{}} />
    </Page>;
};
