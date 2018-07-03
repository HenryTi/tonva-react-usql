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
import { VmEntity, vmLinkIcon } from '../entity';
import { Page, nav, } from 'tonva-tools';
export class VmActionMain extends VmEntity {
    get icon() { return vmLinkIcon('text-success', 'hand-o-right'); }
    initValues() {
        this.values = this.buildObservableValues(this.entity.schema.fields);
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.returns = yield this.entity.submit(this.values);
            nav.pop();
            nav.push(React.createElement(ResultPage, { vm: this }));
            return;
        });
    }
    /*
    renderForm(className?:string) {
        let fieldUIs:any[] = undefined;
        let vmForm = this.newVmForm(
            this.entity.schema.fields, fieldUIs, className);
        return vmForm.renderView();
    }*/
    renderView() {
        return React.createElement(ActionPage, { vm: this });
    }
}
let ActionPage = class ActionPage extends React.Component {
    render() {
        let { vm } = this.props;
        let { caption, values } = this.props.vm;
        return React.createElement(Page, { header: caption }, vm.renderForm('mx-3 my-2'));
    }
};
ActionPage = __decorate([
    observer
], ActionPage);
export { ActionPage };
class ResultPage extends React.Component {
    render() {
        let { vm } = this.props;
        let { caption, entity, returns } = vm;
        return React.createElement(Page, { header: caption, back: "close" },
            "\u5B8C\u6210\uFF01",
            React.createElement("pre", null, JSON.stringify(returns, undefined, ' ')));
    }
}
//# sourceMappingURL=vmAction.js.map