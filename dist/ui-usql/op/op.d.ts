import { Coordinator } from "../vm/VM";
import { Organization, Team, Section, Post, Sheet } from "./model";
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
    private buildAppsUsqs;
    private buildPosts;
    private setUsqEntities;
    private setNames;
    private setSheets;
    saveSheetStatePosts(sheet: Sheet, stateName: string, toArr: {
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
    private usqRender;
    private appView;
}
