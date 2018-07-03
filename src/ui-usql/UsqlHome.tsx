import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import {List, Muted} from 'tonva-react-form';
import {WSChannel, nav, Page} from 'tonva-tools';
//import {pageMapper} from './pages';
//import {pageMapper as 货主Mapper} from './货主';
import {AppUI, MainPage, EntitiesMapper} from './ui';
import {VmApp} from './vm';

/*
const tonvaApp = process.env.REACT_APP_TONVA_APP;
const appUI = new AppUI(tonvaApp, {
    "$$$/usql-first": pageMapper,
    "$$$/货主": 货主Mapper,
});
*/

export interface UsqlHomeProps {
    appName: string;
    caption?: string;
    ui?: any;
    uiMappers?:{[api:string]: EntitiesMapper};
}

@observer
export class UsqlHome extends React.Component<UsqlHomeProps> {
    private appUI:AppUI;
    private vmApp:VmApp;
    @observable private view = <Page><div className="m-3">waiting...</div></Page>;

    constructor(props) {
        super(props);
        let {appName, caption, ui, uiMappers} = this.props;
        this.appUI = new AppUI(appName, caption,  uiMappers);
        this.state = {
            uiLoaded: false
        }
        this.vmApp = new VmApp(appName, ui);
    }
    async componentDidMount() {
        //await this.appUI.load();
        //this.view = <MainPage appUI={this.appUI} />;
        await this.vmApp.load();
        this.view = this.vmApp.renderView();
    }
    componentWillUnmount() {
        //this.appUI.close();
    }
    render() {
        return this.view
    }
}
