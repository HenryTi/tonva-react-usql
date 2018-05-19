import * as React from 'react';
import { Button } from 'reactstrap';
import { nav } from 'tonva-tools';
import { SlaveList } from './slaveList';
export class SlaveInput extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }
    click() {
        nav.push(React.createElement(SlaveList, Object.assign({}, this.props)));
    }
    render() {
        return React.createElement(Button, { className: "mr-3", outline: true, color: "primary", onClick: this.click },
            "\u4ECE\u5C5E",
            this.props.slave.caption);
    }
}
//# sourceMappingURL=slaveInput.js.map