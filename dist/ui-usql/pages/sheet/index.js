import { EntityLink } from '../entityLink';
import { MainPage } from './mainPage';
import { SheetView } from './sheetView';
import { ArchivedList } from './archivedList';
import { ArchivedSheet } from './archivedSheet';
import { SheetAction } from './sheetAction';
import { StateSheetList } from './stateSheetList';
import { SheetNew } from './sheetNew';
export const mapperContainer = {
    caption: '凭单',
    icon: 'wpforms',
    mapper: {
        link: EntityLink,
        mainPage: MainPage,
        view: SheetView,
        archivedList: ArchivedList,
        archivedSheet: ArchivedSheet,
        sheetAction: SheetAction,
        sheetNew: SheetNew,
        stateSheetList: StateSheetList,
    }
};
//# sourceMappingURL=index.js.map