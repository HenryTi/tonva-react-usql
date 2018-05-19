import * as React from 'react';
import {Button} from 'reactstrap';
import {nav} from 'tonva-tools';
import {TuidUIProps, TuidUISlaveProps} from '../../ui/mapper';
import {SlaveList} from './slaveList';

export class SlaveInput extends React.Component<TuidUISlaveProps> {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }
    private click() {
        nav.push(<SlaveList {...this.props} />);
    }
    render() {
        return <Button className="mr-3" outline={true} color="primary" onClick={this.click}>
            从属{this.props.slave.caption}
        </Button>;
    }
}
