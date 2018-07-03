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
import { nav, Page, loadAppApis, meInFrame } from 'tonva-tools';
import { defaultMapper } from '../pages';
import { EntitiesUI, entitiesUICollection } from './entitiesUI';
//import {Entities, defaultMapper, Entity, Tuid, Action, Sheet, Query,
//    AppUI, EntitiesUI, EntitiesUIProps, EntitySet, 
//    EntityUI, ActionUI, QueryUI, SheetUI, TuidUI} from './ui-usql';
export class AppUI {
    constructor(tonvaApp, caption, uiMappers) {
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
            let isDebug = process.env.NODE_ENV === 'development';
            let appApis = yield loadAppApis(this.appOwner, this.appName);
            for (let appApi of appApis) {
                let { apiOwner, apiName, url, urlDebug, ws, access, token } = appApi;
                let api = apiOwner + '/' + apiName;
                let mapper = this.uiMappers && this.uiMappers[api];
                if (mapper === null)
                    continue;
                if (isDebug === true && urlDebug !== undefined) {
                    let lud = urlDebug.toLowerCase();
                    if (lud.startsWith('http://') || lud.startsWith('https://')) {
                        try {
                            console.log('try urlDebug %s', urlDebug);
                            if (!lud.endsWith('/'))
                                lud += '/';
                            let resp = yield fetch(lud + 'hello');
                            let text = yield resp.text();
                            console.log('respond from %s: %s', urlDebug, text);
                            url = urlDebug;
                            console.log('urlDebug %s works ok', urlDebug);
                        }
                        catch (e) {
                            console.log('url %s not working', urlDebug);
                        }
                    }
                }
                let apiUI = new EntitiesUI(url, ws, api, access, defaultMapper, mapper);
                this.apiUIs.push(apiUI);
                yield apiUI.loadEntities();
            }
        });
    }
}
export class MainPage extends React.Component {
    entityRender(ui, index) {
        let { caption } = ui;
        if (ui.entity.sys === true)
            return;
        return ui.link ?
            React.createElement(ui.link, { ui: ui }) :
            React.createElement("div", { className: "px-3 py-2" }, caption);
    }
    entityClick(ui) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ui.showMain();
            //await ui.entity.loadSchema();
            //nav.push(<ui.mainPage ui={ui} />);
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
        return React.createElement(Page, { header: (appUI.caption || '同花默认界面') + (meInFrame.page || ''), logout: this.logout }, appUI.apiUIs.map((v, index) => {
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