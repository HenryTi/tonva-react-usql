import { VmEntity, vmLinkIcon } from '../vmEntity';
export class VmSheet extends VmEntity {
    constructor(vmApi, sheet, ui) {
        super(vmApi, sheet, ui);
    }
    get icon() { return vmLinkIcon('text-primary', 'wpforms'); }
    getStateUI(stateName) {
        let res = this.getRes();
        if (res === undefined)
            return;
        let { states } = res;
        if (states === undefined)
            return;
        return states[stateName];
    }
    getStateLabel(stateName) {
        let state = this.getStateUI(stateName);
        return (state && state.label) || stateName;
    }
    getActionLabel(stateName, actionName) {
        let state = this.getStateUI(stateName);
        if (state === undefined)
            return actionName;
        let actions = state.actions;
        if (actions === undefined)
            return actionName;
        let action = actions[actionName];
        return (action && action.label) || actionName;
    }
}
/*
const FlowRow = (item) => {
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

const SheetView = ({vm}:{vm: VmSheet}) => {
    let {className, sheetState, data, flows, flowRow} = vm;
    let removed;
    if (sheetState === '-')
        removed = <div className="mx-3 my-2" style={{color:'red'}}>本单据作废</div>;
    let flow = <List header={<Muted>流程</Muted>}
        items={flows}
        item={{render:flowRow}}/>
    return <div className={className}>
        {removed}
        {flow}
    </div>;
}
*/ 
//# sourceMappingURL=vmSheet.js.map