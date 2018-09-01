import { Coordinator } from "../vm/VM";
import { Organization, Team, Section, Post } from "./model";
export declare class OpCoordinator extends Coordinator {
    private crApp;
    private unitxUsq;
    private apps;
    organizations: Organization[];
    teams: Team[];
    sections: Section[];
    posts: Post[];
    postDict: {
        [id: number]: Post;
    };
    teamDict: {
        [id: number]: Team;
    };
    organizationDict: {
        [id: number]: Organization;
    };
    sectionDict: {
        [id: number]: Section;
    };
    protected internalStart(): Promise<void>;
    private buildAppsApis;
    private buildPosts;
    private setApiEntities;
    private setNames;
    private setSheets;
    saveSheetStatePosts(sheetName: string, stateName: string, toArr: {
        post: number;
        team: number;
        section: number;
    }[]): Promise<void>;
    private appRender;
    private appClick;
    private appsView;
    private nameRender;
    private sheetRender;
    private tuidClick;
    private mapClick;
    private actionClick;
    private bookClick;
    private queryClick;
    private historyClick;
    private sheetClick;
    private apiRender;
    private appView;
}
