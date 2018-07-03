import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheet } from './vmSheet';

export class VmSchema extends VmSheet {
    protected view = SchemaPage;
}

const SchemaPage = ({vm}:{vm:VmSchema}) => {
    let {caption, entity} = vm;
    return <Page header={caption + "模板"}>
        <pre className="mx-3 my-2">{JSON.stringify(entity.schema, undefined, ' ')}</pre>
    </Page>;
}
