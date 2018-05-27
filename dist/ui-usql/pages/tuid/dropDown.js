var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observer } from 'mobx-react';
let DropDownTuidInput = class DropDownTuidInput extends React.Component {
    constructor(props) {
        super(props);
        this.id = 0;
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            id: this.props.id,
            proxyId: undefined,
            proxyName: undefined,
        };
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let tuid = this.props.ui.entity;
            yield tuid.loadSchema();
            yield tuid.loadAll();
        });
    }
    onSelect(evt) {
        //if (evt.target === undefined) return;
        //let {id, proxyId, proxyName} = value;
        let id = Number(evt.target.value);
        this.setState({
            id: id,
            proxyId: undefined,
            proxyName: undefined,
        });
        let { ui, onIdChanged } = this.props;
        if (id !== undefined)
            ui.entity.useId(id);
        onIdChanged({ id: id });
    }
    render() {
        let { ui, onIdChanged } = this.props;
        let { entity, caption, entitiesUI, input } = ui;
        let InputContent = input.inputContent || JsonContent;
        let id = this.state.id;
        if (id === undefined)
            id = 0;
        if (onIdChanged === undefined) {
            return React.createElement("span", null,
                React.createElement(InputContent, { value: entity.getId(id) }));
        }
        let { all, proxies } = entity;
        if (proxies !== undefined) {
            return React.createElement("span", null, "proxy TUID \u4E0D\u80FD\u662F dropdown list");
        }
        if (all === undefined)
            return React.createElement("div", null,
                "\u4E0B\u62C9\u9009\u62E9",
                caption);
        return React.createElement("select", { className: "form-control", onChange: this.onSelect, value: id },
            React.createElement("option", { value: 0 }, "\u8BF7\u9009\u62E9"),
            all.map(v => React.createElement("option", { key: v.id, value: v.id },
                React.createElement(InputContent, { value: v }))));
    }
};
DropDownTuidInput = __decorate([
    observer
], DropDownTuidInput);
export { DropDownTuidInput };
class JsonContent extends React.Component {
    render() {
        return React.createElement(React.Fragment, null, JSON.stringify(this.props.value));
    }
}
//# sourceMappingURL=dropDown.js.map