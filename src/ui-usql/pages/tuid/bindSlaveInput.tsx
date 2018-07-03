import * as React from 'react';
import {Button} from 'reactstrap';
import {nav} from 'tonva-tools';
import {TuidUIProps, TuidUIBindSlaveProps} from '../../ui/mapper';
import {BindSlaveList} from './bindSlaveList';

export class BindSlaveInput extends React.Component<TuidUIBindSlaveProps> {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }
    private click() {
        nav.push(<BindSlaveList {...this.props} />);
    }
    render() {
        return <Button className="mr-3" outline={true} color="primary" onClick={this.click}>
            从属{this.props.bindSlave.caption}
        </Button>;
    }
}
