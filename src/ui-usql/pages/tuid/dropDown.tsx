import * as React from 'react';
import {observer} from 'mobx-react';
import {TuidPickFace, FormProps, SearchBox, List} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {Tuid} from '../../entities';
import {EntitiesUI, TuidUIO, TuidInputProps, TuidInput} from '../../ui';
import {EntityLink} from '../index';
import { POINT_CONVERSION_HYBRID } from 'constants';

export interface DropDownTuidInputState {
    id: number;
    proxyId: number;
    proxyName: string;
}

@observer
export class DropDownTuidInput extends React.Component<TuidInputProps, DropDownTuidInputState> {
    private id = 0;
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            id: this.props.id,
            proxyId: undefined,
            proxyName: undefined,
        };
    }
    async componentWillMount() {
        let tuid = this.props.ui.entity;
        await tuid.loadSchema();
        await tuid.loadAll();
    }
    onSelect(evt: React.ChangeEvent<any>) {
        //if (evt.target === undefined) return;
        //let {id, proxyId, proxyName} = value;
        let id = Number(evt.target.value);
        this.setState({
            id: id,
            proxyId: undefined, //proxyId,
            proxyName: undefined, //proxyName,
        })
        let {ui, onIdChanged}  = this.props;
        if (id !== undefined) ui.entity.useId(id);
        onIdChanged({id: id});
    }
    render() {
        let {ui, onIdChanged} = this.props;
        let {entity, caption, entitiesUI, input} = ui;
        let InputContent = input.inputContent || JsonContent;
        let id = this.state.id;
        if (id === undefined) id = 0;
        if (onIdChanged === undefined) {
            return <span><InputContent value={entity.getId(id)} /></span>;
        }
        let {all, proxies} = entity;
        if (proxies !== undefined) {
            return <span>proxy TUID 不能是 dropdown list</span>;
        }
        if (all === undefined)
            return <div>下拉选择{caption}</div>;
        return <select  className="form-control" onChange={this.onSelect} value={id}>
            <option value={0}>请选择</option>
            {all.map(v => 
                <option key={v.id} value={v.id}>
                    <InputContent value={v} />
                </option>
            )}
        </select>;
    }
}

class JsonContent extends React.Component<{value:any}> {
    render() {
        return <>{JSON.stringify(this.props.value)}</>;
    }
}

