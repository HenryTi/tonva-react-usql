import * as React from 'react';
import { EntityUI } from './entityUI';
class SheetDetailRow extends React.Component {
    render() {
        let { data } = this.props;
        let { item, detail } = data;
        return React.createElement("div", { className: "mx-3 my-2" },
            "default: ",
            JSON.stringify(item));
    }
}
export class SheetUI extends EntityUI {
    mapDetail(name, schemaFields, detailRow) {
        let nfc = this.detialFaces && this.detialFaces[name];
        let fields = schemaFields.map(sf => this.tfmMap(sf, nfc && nfc.fields[sf.name]));
        return {
            name: name,
            label: nfc && nfc.label,
            fields: fields,
            renderRow: detailRow || (nfc && nfc.renderRow) || SheetDetailRow,
        };
    }
    mapMainDetails(detailViews) {
        let { fields, arrs } = this.entity.schema;
        let main = this.mapFields(fields);
        let details;
        if (arrs !== undefined) {
            details = [];
            for (let arr of arrs) {
                let { name, fields } = arr;
                details.push(this.mapDetail(name, fields, detailViews && detailViews[name]));
            }
        }
        return {
            main: main,
            details: details,
        };
    }
}
//# sourceMappingURL=sheetUI.js.map