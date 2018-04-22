import * as React from 'react';
import {List, Muted} from 'tonva-react-form';
import {WSChannel, nav, Page} from 'tonva-tools';
//import {pageMapper} from './pages';
//import {pageMapper as 货主Mapper} from './货主';
import {AppUI, MainPage, EntitiesMapper} from './ui';

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
    uiMappers?:{[api:string]: EntitiesMapper};
}

export interface State {
    uiLoaded: boolean;
}
export class UsqlHome extends React.Component<UsqlHomeProps, State> {
    private appUI:AppUI;

    constructor(props) {
        super(props);
        let {appName, caption, uiMappers} = this.props;
        this.appUI = new AppUI(appName, caption,  uiMappers);
        this.state = {
            uiLoaded: false
        }
    }
    async componentDidMount() {
        //ws.setToken('aaa');
        //await ws.connect();
        await this.appUI.load();
        this.setState({
            uiLoaded: true,
        });

    }
    componentWillUnmount() {
        this.appUI.close();
    }
    render() {
        let {uiLoaded} = this.state;
        if (uiLoaded === false) return <Page>loading UI ...</Page>;
        return <MainPage appUI={this.appUI} />;
    }
}
