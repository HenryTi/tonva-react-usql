import * as React from 'react';
import {List, Muted, LMR, EasyDate, FA} from 'tonva-react-form';
import { VmSheet, SheetUI } from './vmSheet';
import { Sheet } from '../../entities';
import { VmApi } from '../vmApi';
import { ViewModel } from '../viewModel';
import { VmForm, VmFormOptions } from '../vmForm';
//import {Page} from 'tonva-tools';
//import {Sheet} from '../../entities';
//import {EntitiesUIProps, SheetUIProps, SheetViewProps, EntitiesUI, SheetUIO} from '../../ui';
//import {MainDetails, MainDetailsView} from '../tools';

export class VmView extends VmSheet {
    vmForm: VmForm;
    data: any;
    state: string;
    flows:any[];

    constructor(vmApi:VmApi, sheet: Sheet, ui:SheetUI, data: any, state:string, flows:any[]) {
        super(vmApi, sheet, ui);
        this.data = data;
        this.state = state;
        this.flows = flows;
        this.vmForm = this.createVmFieldsForm();
        this.vmForm.setValues(data);
    }

    protected get fieldsFormOptions():VmFormOptions {
        let ret = super.fieldsFormOptions;
        ret.readOnly = true;
        return ret;
    }

    flowRow = (item:any, index:number):JSX.Element => {
        let {date, user, preState, state, action} = item;
        if (action === undefined) action = <><FA className="text-primary" name="pencil-square-o" /> 制单</>;
        let to;
        switch (state) {
            case '$': break;
            case '#': to = <><FA className="text-success" name="file-archive-o" /></>; break;
            default: to = <><FA className="text-muted" name="arrow-right" /> &nbsp; {state}</>; break;
        }
        return <div className="row">
            <div className="col-sm"><div className="pl-3 py-2">{action}</div></div>
            <div className="col-sm"><div className="p-2">{to}</div></div>
            <div className="col-sm text-right"><div className="p-2"><Muted><EasyDate date={date} /></Muted></div></div>
        </div>;
    }

    protected view = View;
}

const View = ({vm}:{vm:VmView}) => {
    let {entity, state, data, vmForm, flows, flowRow} = vm;
    let removed;
    if (state === '-')
        removed = <div className="mx-3 my-2" style={{color:'red'}}>本单据作废</div>;
    return <div>
        {removed}
        {vmForm.render()}

        <List header={<Muted>流程</Muted>}
            items={flows}
            item={{render:flowRow}}/>
    </div>;
}

//{/*来不及写了，先用JSON方式显示吧。反正就是显示<br/>*/}
//{/*JSON.stringify(data)*/}
