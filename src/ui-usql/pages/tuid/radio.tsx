import * as React from 'react';
import {observer} from 'mobx-react';
import {TuidPickFace, FormProps, SearchBox, List} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {Tuid} from '../../entities';
import {EntitiesUI, TuidUI, TuidInputProps, TuidInput} from '../../ui';
import {EntityLink} from '../index';
import { POINT_CONVERSION_HYBRID } from 'constants';

export interface RadioTuidInputState {
    id: number;
    proxyId: number;
    proxyName: string;
}

const marginBottom:React.CSSProperties = {marginBottom: '0'};
const verticalMiddle:React.CSSProperties = {verticalAlign: 'middle'};

@observer
export class RadioTuidInput extends React.Component<TuidInputProps, RadioTuidInputState> {
    private id = 0;
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
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
    onClick(evt: React.ChangeEvent<any>) {
        //if (value === undefined) return;
        //let {id, proxyId, proxyName} = value;
        let id = Number(evt.target.value);
        this.setState({
            id: id,
            //proxyId: proxyId,
            //proxyName: proxyName,
        })
        let {ui, onIdChanged}  = this.props;
        if (id !== undefined) ui.entity.useId(id);
        onIdChanged({id:id});
    }
    render() {
        let {ui, onIdChanged} = this.props;
        let content = this.content(ui.input);
        if (onIdChanged === undefined) {
            return <span>{content}</span>;
        }
        return <div className="form-control"
            style={{textAlign:'left', paddingLeft:'0.75rem'}}>
            {content}
        </div>
    }

    private content(input: TuidInput):JSX.Element {
        let {ui, onIdChanged} = this.props;
        let {entity, caption, entitiesUI} = ui;
        let {all, proxies} = entity;
        if (proxies !== undefined) {
            return <span>proxy TUID 不能是 radio</span>;
        }
        let InputContent = input.inputContent || JsonContent;
        let id = this.state.id;
        let content;
        if (onIdChanged === undefined) {
            return <span><InputContent value={entity.getId(id)} /></span>;
        }
        if (all !== undefined) {
            return <div>{all.map(v => 
                <label key={v.id} style={marginBottom}>
                    <input type='radio' style={verticalMiddle}
                        onClick={this.onClick}
                        name={entity.name}
                        value={v.id}
                        checked={v.id === id} />
                    <InputContent value={v} /> &nbsp;
                </label>
            )}</div>;
        }
        return <div>radio 选择 {caption}</div>;
    }
}

class JsonContent extends React.Component<{value:any}> {
    render() {
        return <>{JSON.stringify(this.props.value)}</>;
    }
}
