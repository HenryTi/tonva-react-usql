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
export class ArchivedSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flows: undefined,
            data: undefined,
        };
        this.mainDetails = this.props.ui.mapMainDetails();
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let { ui, data } = this.props;
            let sheet = ui.entity;
            let res = yield sheet.getArchive(data.id);
            let { brief, data: sheetData, flows } = res;
            this.setState({
                data: sheetData,
                flows: flows
            });
        });
    }
    mapper(row, index) {
        return React.createElement("li", { key: index },
            "id:",
            row.id,
            ", no:",
            row.no,
            ", discription:",
            row.discription,
            ", date:",
            row.date);
    }
    render() {
        let { ui, data: brief } = this.props;
        let { entity: sheet } = ui;
        /*
        let removed;
        if (brief.state === '-')
            removed = <div className="mx-3 my-2" style={{color:'red'}}>本单据作废</div>;
        let flow;
        if (this.state.res !== undefined) {
            flow = <List className="mx-3" header="流程"
                items={this.state.res[1]}
                item={{}}/>
        }
        */
        return React.createElement(Page, { header: sheet.name + ':' + '-' + brief.no },
            React.createElement(ui.view, { ui: ui, data: this.state.data, className: "mx-3 my-2", sheetState: brief.state, flows: this.state.flows }));
    }
}
//# sourceMappingURL=archivedSheet.js.map