import { VmPage } from 'tonva-tools';
import { OpController } from './op';
import { Sheet, To } from './model';
export declare class VmSheet extends VmPage<OpController> {
    private sheet;
    private states;
    private selectablePosts;
    private sheetOpsChanged;
    private stateClick;
    private buildSelectablePost;
    private buildSelectableTeams;
    private buildSelectableSections;
    private renderState;
    private stateTosView;
    private tosTexts;
    showEntry({ sheet, opTos }: {
        sheet: Sheet;
        opTos: {
            [op: string]: To[];
        };
    }): Promise<void>;
    private saveOps;
    private organizationRow;
    private teamRow;
    private sectionRow;
    private postRow;
    private stateView;
    private onPostSelectChanged;
    private onTeamSelectChanged;
    private onSectionSelectChanged;
    private observablePostRow;
    private observableTeamRow;
    private observableSectionRow;
}
