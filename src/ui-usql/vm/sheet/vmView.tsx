import * as React from 'react';
import {List, Muted, LMR, EasyDate, FA} from 'tonva-react-form';
import { Sheet } from '../../entities';
import { VmForm } from '../form';
import { VmEntity } from '../VM';
import { CrSheet, SheetUI } from './crSheet';

export class VmView extends VmEntity<Sheet, SheetUI> {
    vmForm: VmForm;
    data: any;
    state: string;
    flows:any[];

    constructor(crSheet:CrSheet, data: any, state:string, flows:any[]) {
        super(crSheet);
        this.data = data;
        this.state = state;
        this.flows = flows;
    }

    async showEntry(param?:any) {}

    render() {
        this.vmForm = this.createForm(this.data);
        return <this.view />;
    }

    /*
    protected get fieldsFormOptions():VmFormOptions {
        let ret = super.fieldsFormOptions;
        ret.readOnly = true;
        return ret;
    }*/

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

    protected view = () => {
        let removed;
        if (this.state === '-')
            removed = <div className="mx-3 my-2" style={{color:'red'}}>本单据作废</div>;
        return <div>
            {removed}
            {this.vmForm.render()}
    
            <List header={<Muted>流程</Muted>}
                items={this.flows}
                item={{render:this.flowRow}}/>
        </div>;
    };
}
