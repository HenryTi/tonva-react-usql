import * as React from 'react';
import { Button } from 'reactstrap';
import { nav } from 'tonva-tools';
import { BindSlaveList } from './bindSlaveList';
export class BindSlaveInput extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }
    click() {
        nav.push(React.createElement(BindSlaveList, Object.assign({}, this.props)));
    }
    render() {
        return React.createElement(Button, { className: "mr-3", outline: true, color: "primary", onClick: this.click },
            "\u4ECE\u5C5E",
            this.props.bindSlave.caption);
    }
}
//# sourceMappingURL=bindSlaveInput.js.map