import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Button, Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {TonvaForm, List, FormRow, SubmitResult} from 'tonva-react-form';
import {Entity} from '../../entities';
import {EntitiesUI, EntityUIO, SheetUIO} from '../../ui';
import {Detail, MainDetails} from './model';

export interface MainDetailsViewProps {
    ui: SheetUIO;
    mainDetails: MainDetails;
    values: any;
}

@observer
export class MainDetailsView<T extends Entity> extends React.Component<MainDetailsViewProps> {
    constructor(props) {
        super(props);
    }
    private detailRow(item:any, index:number):JSX.Element {
        return;
    }
    private buildMainRows() {
        let {ui, mainDetails} = this.props;
        let {main, details} = mainDetails;
        let formRows:FormRow[] = main === undefined? [] : _.clone(main);
        if (details === undefined) return;
        let values = this.props.values;
        if (values === undefined) return;
        for (let d of details) {
            let header = <div className={classNames('main-detail-header')}>
                <label>{d.label || d.name}</label>
            </div>;
            formRows.push(<List
                header={header}
                items={values[d.name]}
            item={{render:(item:any, index:number) => {
                return <d.renderRow ui={ui} data={{item:item, detail:d}} />
            }}} />);
        }
        return formRows;
    }
    onSubmit(values:any):Promise<SubmitResult> {
        return;
    }
    render() {
        let formRows:FormRow[];
        let {values, mainDetails, ui} = this.props;
        let {main, details} = this.props.mainDetails;
        let v = _.merge({}, values);
        for (let arr of details) {
            let name = arr.name;
            let vArr = v[name];
            if (vArr === undefined) v[name] = [];
        }
        formRows = this.buildMainRows();
        if (formRows === undefined) return <div>...</div>;
        return <div>
            <TonvaForm formRows={formRows}
                initValues={values}
                //context={ui.entitiesUI}
                onSubmit={this.onSubmit}
                readOnly={true} />
        </div>;
    }
}
