var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Page } from 'tonva-tools';
//import {pageMapper} from './pages';
//import {pageMapper as 货主Mapper} from './货主';
import { AppUI, MainPage } from './ui';
export class UsqlHome extends React.Component {
    constructor(props) {
        super(props);
        let { appName, caption, uiMappers } = this.props;
        this.appUI = new AppUI(appName, caption, uiMappers);
        this.state = {
            uiLoaded: false
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            //ws.setToken('aaa');
            //await ws.connect();
            yield this.appUI.load();
            this.setState({
                uiLoaded: true,
            });
        });
    }
    componentWillUnmount() {
        this.appUI.close();
    }
    render() {
        let { uiLoaded } = this.state;
        if (uiLoaded === false)
            return React.createElement(Page, null, "loading UI ...");
        return React.createElement(MainPage, { appUI: this.appUI });
    }
}
//# sourceMappingURL=UsqlHome.js.map