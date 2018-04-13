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
import { FA } from 'tonva-react-form';
import { nav, Page } from 'tonva-tools';
import { MainDetailsForm } from '../tools';
export class SheetNewPage extends React.Component {
    constructor(props) {
        super(props);
        `{"fields":[
            {"name":"id1","type":"bigint","tuid":"article"},
            {"name":"f1","type":"dec","scale":2,"precision":12},
            {"name":"f2","type":"dec","scale":2,"precision":12}
        ],"name":"单据","type":"sheet",
        "states":[{"name":"$","actions":[{"name":"s1","returns":[],"busFaces":[]},{"name":"s2","returns":[],"busFaces":[]}]},{"name":"a","actions":[{"name":"a1","returns":[{"name":"statearet1","fields":[{"name":"c","type":"int"},{"name":"state","type":"char","size":30}]},{"name":"statearet2","fields":[{"name":"dd","type":"datetime"}]}],"busFaces":[]},{"name":"a2","returns":[],"busFaces":[]}]},{"name":"b","actions":[]}],
        "arrs":[
            {
                "name":"arr1",
                "fields":[
                    {"name":"f11","type":"char","size":50},
                    {"name":"f12","type":"char","size":30}
                ]
            }
        ]}`;
        let { ui } = this.props;
        this.mainDetails = ui.mapMainDetails();
        this.state = {
            data: undefined
        };
        this.onSubmit = this.onSubmit.bind(this);
    }
    /*
    componentDidMount() {
        this.packData = new PackData;
        this.packData.item = {id: 1};
        this.setState({
            data: this.packData
        })
        this.packData.onChange(d => {
            this.setState({
                data: d
            });
        });
    }*/
    /*
    componentWillUnmount() {
        if (this.packData !== undefined) this.packData.clearInterval();
    }

    async handleValidSubmit(event, values) {
        let entity = this.props.ui.entity;
        let schema = entity.schema;
        let res = await entity.save(undefined, values);
        let retId = res.id;
        if (retId < 0) {
            let unique = schema.unique;
            if (unique !== undefined) {
                for (let u of unique) {
                    //this.form.setError(u, true, '重复');
                }
            }
        }
        else {
            let callback = this.callback.bind(this);
            nav.push(<Success callback={callback} />);
        }
    }
*/
    successCallback() {
    }
    onSubmit(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let entity = this.props.ui.entity;
            let schema = entity.schema;
            let id = yield entity.save(undefined, values);
            if (id < 0) {
                let unique = schema.unique;
                if (unique !== undefined) {
                    for (let u of unique) {
                        //this.form.setError(u, true, '重复');
                    }
                }
            }
            else {
                let callback = this.successCallback.bind(this);
                nav.push(React.createElement(Success, { callback: callback }));
            }
        });
    }
    render() {
        let { ui } = this.props;
        let { entity } = ui;
        let { name, schema } = entity;
        return React.createElement(Page, { header: '新' + name },
            React.createElement(MainDetailsForm, { className: "mx-3 my-2", ui: ui, mainDetails: this.mainDetails, values: {}, onSubmit: this.onSubmit }));
    }
}
class Success extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.finish = this.finish.bind(this);
    }
    next() {
        this.props.callback();
        nav.pop();
    }
    finish() {
        nav.pop(2);
    }
    render() {
        return React.createElement(Page, { header: '\u63D0\u4EA4\u6210\u529F' },
            React.createElement("div", { className: 'm-3' },
                React.createElement("span", { className: "text-success" },
                    React.createElement(FA, { name: 'check-circle', size: 'lg' }),
                    " \u6210\u529F\u63D0\u4EA4\uFF01"),
                React.createElement("div", { className: 'mt-5' },
                    React.createElement(Button, { className: "mr-3", color: "primary", onClick: this.next }, "\u7EE7\u7EED\u5F55\u5165"),
                    React.createElement(Button, { color: "primary", outline: true, onClick: this.finish }, "\u4E0D\u7EE7\u7EED"))));
    }
}
//# sourceMappingURL=sheetNew.js.map