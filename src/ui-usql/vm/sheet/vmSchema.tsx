import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheet } from './vmSheet';

export class VmSheetSchema extends VmSheet {
    protected view = SchemaPage;
}

const SchemaPage = ({vm}:{vm:VmSheetSchema}) => {
    let {label, entity} = vm;
    return <Page header={label + "模板"}>
        <pre className="mx-3 my-2">{JSON.stringify(entity.schema, undefined, ' ')}</pre>
    </Page>;
}
