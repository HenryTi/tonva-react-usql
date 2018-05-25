import * as React from 'react';
import {nav, Page} from 'tonva-tools';
import {List, LMR, FA} from 'tonva-react-form';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {EntitiesUI, SheetUI} from '../../ui';
import {ArchivedSheet} from './archivedSheet';

export interface State {
    rows:any[];
}
export class ArchivedList extends React.Component<SheetUIProps, State> {
    constructor(props) {
        super(props);
        this.state = {
            rows: undefined
        }
        this.renderRow = this.renderRow.bind(this);
        this.click = this.click.bind(this);
    }

    async componentDidMount() {
        let res = await this.props.ui.entity.getArchives(undefined, 10);
        this.setState({rows: res});
    }

    click(brief:any) {
        if (brief.processing===1) return;
        nav.push(<ArchivedSheet ui={this.props.ui} data={brief} />);
    }

    renderRow(row:any, index:number) {
        let left = <>
            {row.processing===1? '... ' : ''}
            id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}
        </>;
        let right = <FA className="align-self-center" name="angle-right" />;
        return <LMR className="px-3 py-2" left={left} right={right} />
    }
    render() {
        let {name} = this.props.ui.entity;
        return <Page header={'已归档' + name}>
            <List items={this.state.rows} item={{render:this.renderRow, onClick:this.click}} />
        </Page>;
    }
}
