var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { List, Muted } from 'tonva-react-form';
import { nav, Page, loadAppApis } from 'tonva-tools';
import { defaultMapper } from '../pages';
import { EntitiesUI, entitiesUICollection } from './entitiesUI';
//import {Entities, defaultMapper, Entity, Tuid, Action, Sheet, Query,
//    AppUI, EntitiesUI, EntitiesUIProps, EntitySet, 
//    EntityUI, ActionUI, QueryUI, SheetUI, TuidUI} from './ui-usql';
export class AppUI {
    constructor(tonvaApp, caption, uiMappers) {
        //private mainPage: new ({appUI:AppUI})=>React.Component;
        this.entitiesUICollection = entitiesUICollection;
        this.apiUIs = [];
        let parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.caption = caption;
        //this.mainPage = mainPage || MainPage;
        this.uiMappers = uiMappers;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let appApis = yield loadAppApis(this.appOwner, this.appName);
            for (let appApi of appApis) {
                let { apiOwner, apiName, url, ws, access, token } = appApi;
                let api = apiOwner + '/' + apiName;
                let mapper = this.uiMappers && this.uiMappers[api];
                if (mapper === null)
                    continue;
                let apiUI = new EntitiesUI(url, ws, api, access, defaultMapper, mapper);
                this.apiUIs.push(apiUI);
                yield apiUI.loadEntities();
            }
        });
    }
    close() {
        for (let p in this.entitiesUICollection) {
            this.entitiesUICollection[p].close();
        }
    }
}
export class MainPage extends React.Component {
    entityRender(ui, index) {
        let { caption } = ui;
        return ui.link ?
            React.createElement(ui.link, { ui: ui }) :
            React.createElement("div", { className: "px-3 py-2" }, caption);
    }
    entityClick(ui) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ui.entity.loadSchema();
            nav.push(React.createElement(ui.mainPage, { ui: ui }));
        });
    }
    renderList(entitySet, caption) {
        if (entitySet.list.length === 0)
            return;
        return React.createElement(List, { className: 'my-2', header: React.createElement(Muted, null, entitySet.caption || caption), items: entitySet.list, item: { render: this.entityRender, onClick: this.entityClick } });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield nav.logout();
        });
    }
    render() {
        let { appUI } = this.props;
        return React.createElement(Page, { header: appUI.caption || '同花默认界面-2', logout: this.logout }, appUI.apiUIs.map((v, index) => {
            let { api, tuid, action, sheet, query, book, history } = v;
            return React.createElement(React.Fragment, { key: index },
                React.createElement("div", { className: "px-3 pt-1" },
                    React.createElement(Muted, null, api)),
                this.renderList(tuid, 'Tuid'),
                this.renderList(action, 'Action'),
                this.renderList(sheet, 'Sheet'),
                this.renderList(query, 'Query'),
                this.renderList(book, 'Book'),
                this.renderList(history, 'History'));
        }));
    }
}
//# sourceMappingURL=appUI.js.map