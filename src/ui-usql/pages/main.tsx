import * as React from 'react';
import * as _ from 'lodash';
import {nav, Page} from 'tonva-tools';
import {List, Muted} from 'tonva-react-form';
import {Entities, Entity, Tuid, Action, Sheet, Query} from '../entities';
import {EntitiesUIProps, EntitiesUI, EntitySet, EntityUI, ActionUI, QueryUI, SheetUI, TuidUI} from '../ui';

export class Main extends React.Component<EntitiesUIProps> {
    constructor(props) {
        super(props);
        this.entityRender = this.entityRender.bind(this);
        this.entityClick = this.entityClick.bind(this);
/*
        this.actionClick = this.actionClick.bind(this);
        this.sheetClick = this.sheetClick.bind(this);
        this.queryClick = this.queryClick.bind(this);
        this.tuidClick = this.tuidClick.bind(this);
*/
    }
    
    private entityRender(ui: TuidUI, index: number): JSX.Element {
        let {caption} = ui;
        return ui.link?
            <ui.link ui={ui} />:
            <div className="px-3 py-2">{caption}</div>;
    }
    private async entityClick<E extends Entity, U extends EntityUI<E>>(ui:U) {
        await ui.entity.loadSchema();
        nav.push(<ui.mainPage ui={ui} />);
    }
/*    
    private tuidRender<E extends Entity, U extends EntityUI<E>>(ui: U, index: number): JSX.Element {
        let {caption} = ui;
        return <div className="px-3 py-2">{caption}</div>
    }
    private actionRender(ui: ActionUI, index: number): JSX.Element {
        let {caption} = ui;
        return <div className="px-3 py-2">{caption}</div>
    }
    private sheetRender(ui: SheetUI, index: number): JSX.Element {
        let {caption} = ui;
        return <div className="px-3 py-2">{caption}</div>
    }
    private queryRender(ui: QueryUI, index: number): JSX.Element {
        let {caption} = ui;
        return <div className="px-3 py-2">{caption}</div>
    }

    private async tuidClick(ui:TuidUI) {
        await ui.entity.loadSchema();
        nav.push(<ui.mainPage ui={ui} />);
    }
    private async actionClick(ui:ActionUI) {
        await ui.entity.loadSchema();
        nav.push(<ui.mainPage ui={ui} />);
    }
    private async sheetClick(ui:SheetUI) {
        await ui.entity.loadSchema();
        nav.push(<ui.mainPage ui={ui} />);
    }
    private async queryClick(ui:QueryUI) {
        await ui.entity.loadSchema();
        nav.push(<ui.mainPage ui={ui} />);
    }
*/
    private renderList<E extends Entity>(entitySet:EntitySet<E,EntityUI<E>>, caption:string) {
        return <List className='my-2'
                header={<Muted>{entitySet.caption || caption}</Muted>}
                items={entitySet.list} 
                item={{render: this.entityRender, onClick:this.entityClick}} />;
    }  
    render() {
        let {ui} = this.props;
        let {caption, tuid, action, sheet, query, book, history} = ui;
        return <Page header={caption}>
            {this.renderList(tuid, 'Tuid')}
            {this.renderList(action, 'Action')}
            {this.renderList(sheet, 'Sheet')}
            {this.renderList(query, 'Query')}
            {this.renderList(book, 'Book')}
            {this.renderList(history, 'History')}
        </Page>;
    }
}
