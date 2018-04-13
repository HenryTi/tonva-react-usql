import * as React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {LMR, SearchBox} from 'tonva-react-form';
import {Tuid} from '../../entities';
import {EntitiesUIProps, TuidUIProps} from '../../ui';
import {EntitiesUI, TuidUI} from '../../ui';
import {EditPage} from './editPage';
import {ListPage} from './listPage';
import {SearchPage} from './searchPage';

export class MainPage extends React.Component<TuidUIProps> {
    constructor(props) {
        super(props);
        this.addNew = this.addNew.bind(this);
        this.list = this.list.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    addNew() {
        nav.push(<EditPage ui={this.props.ui} />);
    }

    list() {
        nav.push(<SearchPage ui={this.props.ui} />);
    }

    onSearch(key:string) {
        nav.push(<SearchPage ui={this.props.ui} data={key} />);
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
        
// <pre>{JSON.stringify(schema, undefined, ' ')}</pre>
