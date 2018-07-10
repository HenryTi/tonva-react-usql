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
import { List, LMR, FA } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
import { VmArchived } from './vmArchived';
export class VmArchives extends VmSheet {
    constructor() {
        super(...arguments);
        //archivedSheet = undefined;
        //archiveData: any;
        //brief: any;
        this.archiveClick = (brief) => __awaiter(this, void 0, void 0, function* () {
            //this.brief = brief;
            if (brief.processing === 1)
                return;
            //this.archiveData = await this.entity.getArchive(brief.id);
            //let {brief, data:sheetData, flows} = res;
            this.nav(VmArchived, brief);
        });
        this.archiveRow = (row, index) => {
            let left = React.createElement(React.Fragment, null,
                row.processing === 1 ? '... ' : '',
                "id:",
                row.id,
                ", no:",
                row.no,
                ", discription:",
                row.discription,
                ", date:",
                row.date);
            let right = React.createElement(FA, { className: "align-self-center", name: "angle-right" });
            return React.createElement(LMR, { className: "px-3 py-2", left: left, right: right });
        };
        this.view = Archives;
    }
    beforeStart() {
        return __awaiter(this, void 0, void 0, function* () {
            this.list = yield this.entity.getArchives(undefined, 10);
        });
    }
}
const Archives = ({ vm }) => {
    let { label, list, archiveRow, archiveClick } = vm;
    return React.createElement(Page, { header: '已归档' + label },
        React.createElement(List, { items: list, item: { render: archiveRow, onClick: archiveClick } }));
};
/*
export class ArchivedSheet extends React.Component<SheetUIProps, State> {
    private mainDetails: MainDetails;
    constructor(props) {
        super(props);
        this.state = {
            flows: undefined,
            data: undefined,
        }
        this.mainDetails = this.props.ui.mapMainDetails();
    }

    async componentDidMount() {
        let {ui, data} = this.props;
        let sheet = ui.entity;
        let res = await sheet.getArchive(data.id);
        let {brief, data:sheetData, flows} = res;
        this.setState({
            data: sheetData,
            flows: flows
        });
    }
    mapper(row:any, index:number) {
        return <li key={index}>id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}</li>
    }
    render() {
*/
/*
const ArchivedSheet = ({vm}:{vm: VmArchives}) => {
    let {label, archiveData, typeSheetView:SheetView} = vm;
    let {brief, data:sheetData, flows} = archiveData;
    //let {ui, data:brief} = this.props;
    //let {entity:sheet} = ui;
    return <Page header={label + ':' + '-' + brief.no}>
        <SheetView vm={vm} />
    </Page>;
}
*/
//# sourceMappingURL=vmArchives.js.map