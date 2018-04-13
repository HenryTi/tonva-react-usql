import * as React from 'react';
import {Button} from 'reactstrap';
import {Page} from 'tonva-tools';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';

export interface State {
    result: any;
}
export class SheetEditPage extends React.Component<SheetUIProps, State> {
    data = {
        id1: 1,
        f1: 3,
        f2: 5,
        arr1: [
            {f11:'a', f12:'b'},
            {f11:'a1', f12: 'b1'},
            {f11:'a2', f12: 'b2'},
        ],
    };
    id:number;
    constructor(props) {
        super(props);
        this.state = {result:''}
    }
    async click() {
        let {entity:sheet} = this.props.ui;
        this.id = await sheet.save('kkk bbb', this.data);
        //this.setState({result: res})
        //this.id = res.id;
        //alert(JSON.stringify(res, undefined, ' '));
    }
    action() {
        /*
        this.props.entity.action(9, 'a', 'a1').then(res => {
            //this.setState({result: res})
            //this.id = res.id;
            //alert(JSON.stringify(res, undefined, ' '));
            <Button onClick={()=>this.action()}>单据操作</Button>
        });*/
    }

    render() {
        let {entity:sheet} = this.props.ui;
        return <Page>
            <div>SheetEdit: {sheet.name}</div>
            <div><Button onClick={()=>this.click()}>新建</Button></div>
            <Button onClick={()=>this.click()}>测试保存单据</Button>
            <pre>{JSON.stringify(this.state.result, undefined, ' ')}</pre>
            <pre>{JSON.stringify(sheet.schema, undefined, ' ')}</pre>
        </Page>;
    }
}
