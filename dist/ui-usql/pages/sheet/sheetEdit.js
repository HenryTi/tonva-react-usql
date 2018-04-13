var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
export class SheetEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.data = {
            id1: 1,
            f1: 3,
            f2: 5,
            arr1: [
                { f11: 'a', f12: 'b' },
                { f11: 'a1', f12: 'b1' },
                { f11: 'a2', f12: 'b2' },
            ],
        };
        this.state = { result: '' };
    }
    click() {
        return __awaiter(this, void 0, void 0, function* () {
            let { entity: sheet } = this.props.ui;
            this.id = yield sheet.save('kkk bbb', this.data);
            //this.setState({result: res})
            //this.id = res.id;
            //alert(JSON.stringify(res, undefined, ' '));
        });
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
        let { entity: sheet } = this.props.ui;
        return React.createElement(Page, null,
            React.createElement("div", null,
                "SheetEdit: ",
                sheet.name),
            React.createElement("div", null,
                React.createElement(Button, { onClick: () => this.click() }, "\u65B0\u5EFA")),
            React.createElement(Button, { onClick: () => this.click() }, "\u6D4B\u8BD5\u4FDD\u5B58\u5355\u636E"),
            React.createElement("pre", null, JSON.stringify(this.state.result, undefined, ' ')),
            React.createElement("pre", null, JSON.stringify(sheet.schema, undefined, ' ')));
    }
}
//# sourceMappingURL=sheetEdit.js.map