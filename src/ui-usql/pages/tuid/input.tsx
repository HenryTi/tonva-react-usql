import * as React from 'react';
import {observer} from 'mobx-react';
import {TuidPickFace, FormProps, SearchBox, List} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {EntitiesUI, TuidUI, TuidInputProps, TuidInput, TuidPickPageProps} from '../../ui';

@observer
export class GeneralTuidInput extends React.Component<TuidInputProps> {
    private id = 0;
    private tuidUI:TuidUI;
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onPicked = this.onPicked.bind(this);
        this.inputOnBlure = this.inputOnBlure.bind(this);
        let {id, tuid, entitiesUI} = this.props;
        if (entitiesUI === undefined) {
            console.log('TonvaForm props 应该包含 context=EntitiesUI')
            return;
        }
        this.tuidUI = entitiesUI.tuid.coll[tuid];
        if (this.tuidUI === undefined) {
            console.log('Tuid ' + tuid + ' 没有定义');
            return;
        }
    }
    onPicked(value:any) {
        if (value === undefined) return;
        let {onPicked}  = this.props;
        this.tuidUI.entity.useId(value.id);
        onPicked(value);
    }
    onClick() {
        let {id, input, params, onPicked} = this.props;
        let {pickPage:PickPage} = input;
        if (PickPage === undefined) PickPage = PickTuidPage;
        nav.push(<PickPage 
            id={id}
            input={input}
            tuidUI={this.tuidUI} 
            params={params} 
            onPicked={this.onPicked} />);
    }
    inputOnBlure(evt) {
        let value = evt.currentTarget.value;
        let id = Number(value);
        if (id <= 0) {
            evt.currentTarget.value = '';
            return;
        }
        let {onPicked}  = this.props;
        //this.tuidUI.entity.useId(id);
        onPicked({id:id});
    }
    render() {
        let {id, tuid, input, entitiesUI, params, readOnly} = this.props;
        if (this.tuidUI === undefined) {
            if (readOnly === true)
                return <span>{tuid+'没有定义或未处理'}</span>;
            return <input className="form-control" type="number" step={1} 
                onBlur={this.inputOnBlure}
                placeholder={tuid+'没有定义或未处理，可直接输入数字'} />
        }
        let caption = this.tuidUI.caption;
        let content;
        if (id === undefined) {
            content = <div>点击搜索{caption}</div>;
        }
        else {
            let val = this.tuidUI.entity.getId(id);
            switch (typeof val) {
                case 'number':
                    content = <div>{caption}: {id}</div>;
                    break;
                default:
                    content = input.inputContent? 
                        <input.inputContent value={val} /> :
                        <>{caption}: {id}</>;
                    break;
            }
        }
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
