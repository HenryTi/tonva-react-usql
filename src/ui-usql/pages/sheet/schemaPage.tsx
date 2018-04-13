import * as React from 'react';
import {Button} from 'reactstrap';
import {Page} from 'tonva-tools';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';

export class SchemaPage extends React.Component<SheetUIProps> {
    render() {
        let {name, schema} = this.props.ui.entity;
        return <Page header={name + "模板"}>
            <pre className="mx-3 my-2">{JSON.stringify(schema, undefined, ' ')}</pre>
        </Page>;
    }
}
