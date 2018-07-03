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
        let { slave, ui } = this.props;
        return React.createElement(Button, { className: "mr-3", outline: true, color: "primary", onClick: this.click },
            "\u4ECE\u5C5E",
            slave.tuid.caption);
    }
}
//# sourceMappingURL=slaveInput.js.map