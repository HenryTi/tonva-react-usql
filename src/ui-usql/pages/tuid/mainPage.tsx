import * as React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {LMR, SearchBox, List, Muted} from 'tonva-react-form';
import {Tuid} from '../../entities';
import {EntitiesUIProps, TuidUIProps, EntityUI, EntitiesUI, TuidUI} from '../../ui';
import {Entities, Entity} from '../../entities';

export class MainPage extends React.Component<TuidUIProps> {
    render() {
        let {entity, caption} = this.props.ui;
        let proxies = entity.schema.proxies;
        if (proxies === undefined)
            return <TuidMainPage {...this.props} />;
        return <TuidProxyMainPage {...this.props} />;
    }
}

class TuidMainPage extends React.Component<TuidUIProps> {
    constructor(props) {
        super(props);
        this.addNew = this.addNew.bind(this);
        this.list = this.list.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    addNew() {
        //nav.push(<EditPage ui={this.props.ui} />);
        let ui = this.props.ui;
        nav.push(<ui.editPage ui={ui} />)
    }

    list() {
        //nav.push(<SearchPage ui={this.props.ui} />);
        let ui = this.props.ui;
        nav.push(<ui.listPage ui={ui} />)
    }

    onSearch(key:string) {
        //nav.push(<SearchPage ui={this.props.ui} data={key} />);
        let ui = this.props.ui;
        nav.push(<ui.listPage ui={ui} data={key} />)
    }

    render() {
        let {entity, caption} = this.props.ui;
        let {name, schema} = entity;
        caption = caption || name;
        let right = <SearchBox className="mr-3" onSearch={this.onSearch} placeholder={'搜索'+caption} />;
        return <Page header={caption || name}>
            <LMR className="mt-3" right={right}>
                <div>
                    <Button className="mr-3" color="primary" onClick={this.addNew}>新增</Button>
                    <Button className="mr-3" color="primary" onClick={this.list}>列表</Button>
                </div>
            </LMR>
        </Page>;
    }
}
        
class TuidProxyMainPage extends React.Component<TuidUIProps> {
    private entityRender(ui: EntityUI<any>, index: number): JSX.Element {
        let {caption} = ui;
        return ui.link?
            <ui.link ui={ui} />:
            <div className="px-3 py-2">{caption}</div>;
    }
    private async entityClick<E extends Entity, U extends EntityUI<E>>(ui:U) {
        await ui.entity.loadSchema();
        nav.push(<ui.mainPage ui={ui} />);
    }
    render() {
        let ui = this.props.ui;
        let {entity, entitySet} = ui;
        let {coll} = entitySet;
        let proxies = entity.schema.proxies;
        let tuidUIs:TuidUI[] = [];
        for (let i in proxies) {
            let tuidUI = coll[i];
            tuidUIs.push(tuidUI);
        }
        return <Page header={ui.caption}>
            <List className="my-2"
                header={<Muted>{ui.caption} 代理下列Tuid</Muted>}
                items={tuidUIs} 
                item={{render: this.entityRender, onClick:this.entityClick}} />
        </Page>
    }
}
