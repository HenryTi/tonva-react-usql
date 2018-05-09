import * as React from 'react';
import {observer} from 'mobx-react';
import {TuidPickFace, FormProps, SearchBox, List} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {EntityLink} from '../entityLink';
import {EntitiesUI, TuidUI, TuidInputProps, TuidInput, TuidPickPageProps} from '../../ui';
import {Tuid} from '../../entities';
import { POINT_CONVERSION_HYBRID } from 'constants';

interface TuidInputState {
    id: number;
    proxyId: number;
    proxyName: string;
}

@observer
export class GeneralTuidInput extends React.Component<TuidInputProps, TuidInputState> {
    private id = 0;
    private tuidUI:TuidUI;
    private tuid:Tuid;
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onPicked = this.onPicked.bind(this);
        this.inputOnBlur = this.inputOnBlur.bind(this);
        this.state = {
            id: this.props.id,
            proxyId: undefined,
            proxyName: undefined,
        };
        let {id, tuid, entitiesUI} = this.props;
        if (entitiesUI === undefined) {
            console.log('TonvaForm props 应该包含 context=EntitiesUI')
            return;
        }
        this.tuidUI = entitiesUI.tuid.coll[tuid];
        this.tuid = this.tuidUI.entity;
        if (this.tuidUI === undefined) {
            console.log('Tuid ' + tuid + ' 没有定义');
            return;
        }
    }
    async componentWillMount() {
        await this.tuid.loadSchema();
    }
    onPicked(value:any) {
        if (value === undefined) return;
        let {id, proxyId, proxyName} = value;
        this.setState({
            id: id,
            proxyId: proxyId,
            proxyName: proxyName,
        })
        let {onPicked}  = this.props;
        if (id !== undefined) this.tuidUI.entity.useId(id);
        onPicked(value);
    }
    onClick() {
        let {input, params, onPicked} = this.props;
        let id = this.state.id;
        let tuid = this.tuidUI.entity;
        let proxies = tuid.schema.proxies;
        let {pickPage:PickPage} = input;
        if (PickPage === undefined) PickPage = PickTuidPage;
        if (proxies === undefined) {
            nav.push(<PickPage 
                id={id}
                input={input}
                tuidUI={this.tuidUI} 
                params={params} 
                onPicked={this.onPicked} />);
        }
        else {
            nav.push(<SelectTuidPage 
                id={id}
                proxies={proxies}
                input={input}
                tuidUI={this.tuidUI} 
                params={params} 
                onPicked={this.onPicked} />);
        }
    }
    inputOnBlur(evt) {
        let value = evt.currentTarget.value;
        let id = Number(value);
        if (id <= 0) {
            evt.currentTarget.value = '';
            return;
        }
        let {onPicked}  = this.props;
        this.tuidUI.entity.useId(id);
        onPicked({id:id});
    }
    render() {
        let {tuid, input, entitiesUI, params, readOnly} = this.props;
        if (this.tuidUI === undefined) {
            if (readOnly === true)
                return <span>{tuid+'没有定义或未处理'}</span>;
            return <input className="form-control" type="number" step={1} 
                onBlur={this.inputOnBlur}
                placeholder={tuid+'没有定义或未处理，可直接输入数字'} />
        }
        let content = this.content(input);
        if (readOnly === true) {
            return <span>{content}</span>;
        }
        return <button className="form-control btn btn-outline-info"
            type="button"
            style={{textAlign:'left', paddingLeft:'0.75rem'}}
            onClick={this.onClick}>
            {content}
        </button>
    }

    private content(input: TuidInput):JSX.Element {
        let {entity, caption, entitiesUI} = this.tuidUI;
        let id = this.state.id;
        let content;
        if (id === undefined) {
            let {proxyName, proxyId} = this.state;
            if (proxyId !== undefined) {
                return this.idContent(proxyName, proxyId);
            }
            return <div>点击搜索{caption}</div>;
        }

        let proxies = this.tuid.proxies;
        if (proxies === undefined) {
            let val = entity.getId(id);
            if (typeof val === 'number') {
                return this.idContent(caption, id);
            }
            let InputContent = input.inputContent;
            if (InputContent === undefined || val === undefined) {
                return this.idContent(caption, id);
            }
            return <InputContent value={val} />;
        }

        // ==== proxy tuid =====
        let val = entity.getId(id);
        if (typeof val === 'number')
            return this.idContent(caption, id);

        let {type, $proxy} = val;
        let tuidUI:TuidUI = entitiesUI.tuid.coll[type];
        let InputContent = tuidUI.input.inputContent;
        caption = tuidUI.caption;
        id = $proxy;
        val = tuidUI.entity.getId($proxy);
        if (typeof val === 'number')
            return this.idContent(caption, id);

        if (InputContent === undefined || val === undefined) {
            return this.idContent(caption, id);
        }
        return <InputContent value={val} />;
    }

    private idContent(caption:string, id:number) {
        return <div>{caption}: {id}</div>;
    }
}

interface Proxy {
    tuidName: string;
}
class SelectTuidPage extends React.Component<TuidPickPageProps & {proxies:any}> {
    private proxies:Proxy[];
    private proxy:Proxy;

    constructor(props) {
        super(props);
        this.itemClick = this.itemClick.bind(this);
        this.itemRender = this.itemRender.bind(this);
        this.onPicked = this.onPicked.bind(this);
        this.proxies = [];
        let {proxies} = this.props;
        for (let i in proxies) {
            let p = proxies[i];
            this.proxies.push({
                tuidName: p.name,
            });
        }
    }
    private itemRender(proxy:Proxy, index:number):JSX.Element {
        return <EntityLink ui={this.props.tuidUI.entitiesUI.tuid.coll[proxy.tuidName]} />;
        //return <div>{proxy.tuidName}</div>;
    }
    private itemClick(proxy:Proxy) {
        this.proxy = proxy;
        let {id, tuidUI, input, params, onPicked} = this.props;
        let proxyTuidUI = tuidUI.entitiesUI.tuid.coll[proxy.tuidName];
        let proxyTuid = proxyTuidUI.entity;
        let {pickPage:PickPage} = input;
        if (PickPage === undefined) PickPage = PickTuidPage;
        nav.pop();
        nav.push(<PickPage 
            id={id}
            input={input}
            tuidUI={proxyTuidUI} 
            params={params} 
            onPicked={this.onPicked} />);
    }
    async onPicked(value:any) {
        if (value === undefined) return;
        let {onPicked, tuidUI}  = this.props;
        let vid = value.id;
        let proxy = this.proxy.tuidName;
        onPicked({id: undefined, proxyId: vid, proxyName: proxy});
        let proxiedValue = await tuidUI.entity.proxied(proxy, vid);
        if (!proxiedValue) {
            console.log("proxiedValue is null");
            return;
        }
        let {id, $proxy, type} = proxiedValue;
        onPicked({id: id, proxyId: $proxy, proxyName: type});
    }
    render() {
        let {tuidUI, input} = this.props;
        return <Page header="选择">
            <List items={this.proxies} item={{render: this.itemRender, onClick: this.itemClick}} />
        </Page>;
    }
}

interface State {
    items: any[];
}
class PickTuidPage extends React.Component<TuidPickPageProps, State> {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.rowClick = this.rowClick.bind(this);
        this.state = {
            items: null
        }
    }
    async onSearch(key:string) {
        let result = await this.props.tuidUI.entity.search(key, 0, 30);
        this.setState({
            items: result
        });
    }
    renderRow(item:any, index:number):JSX.Element {
        let {candidateRow:CandidateRow} = this.props.input;
        if (CandidateRow !== undefined) return <CandidateRow item={item} index={index} />;
        return <div className="px-3 py-2">{JSON.stringify(item)}</div>
    }
    rowClick(item:any) {
        this.props.onPicked(item);
        nav.pop();
    }
    render() {
        let {tuidUI, input} = this.props;
        let header=<SearchBox className="mx-1 w-100" placeholder={tuidUI.caption} onSearch={this.onSearch}  />;
        return <Page header={header}>
            <List 
                className="my-3"
                before={'搜索' + tuidUI.caption}
                items={this.state.items} 
                item={{render: this.renderRow, onClick:this.rowClick}} />
        </Page>;
    }
}
