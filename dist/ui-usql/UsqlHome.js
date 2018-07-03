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
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Page } from 'tonva-tools';
//import {pageMapper} from './pages';
//import {pageMapper as 货主Mapper} from './货主';
import { AppUI } from './ui';
import { VmApp } from './vm';
let UsqlHome = class UsqlHome extends React.Component {
    constructor(props) {
        super(props);
        this.view = React.createElement(Page, null,
            React.createElement("div", { className: "m-3" }, "waiting..."));
        let { appName, caption, ui, uiMappers } = this.props;
        this.appUI = new AppUI(appName, caption, uiMappers);
        this.state = {
            uiLoaded: false
        };
        this.vmApp = new VmApp(appName, ui);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            //await this.appUI.load();
            //this.view = <MainPage appUI={this.appUI} />;
            yield this.vmApp.load();
            this.view = this.vmApp.renderView();
        });
    }
    componentWillUnmount() {
        //this.appUI.close();
    }
    render() {
        return this.view;
    }
};
__decorate([
    observable
], UsqlHome.prototype, "view", void 0);
UsqlHome = __decorate([
    observer
], UsqlHome);
export { UsqlHome };
//# sourceMappingURL=UsqlHome.js.map