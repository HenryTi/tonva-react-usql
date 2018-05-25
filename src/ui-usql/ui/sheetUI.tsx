import * as React from 'react';
import {UIComponent, FieldMappers, FieldMapper, FieldFaces, FieldFace, DetailFace, 
    SheetUIComponent, SheetViewComponent, EntitiesUIProps, EntitiesUIComponent,
    SheetUIProps} from './mapper';
import {Entities, Entity, Tuid, Action, Sheet, Query} from '../entities';
import {EntitiesUI} from './entitiesUI';
import {EntityUI} from './entityUI';

class SheetDetailRow extends React.Component<SheetUIProps> {
    render() {
        let {data} = this.props;
        let {item, detail} = data;
        return <div className="mx-3 my-2">default: {JSON.stringify(item)}</div>;
    }
}

export class SheetUI extends EntityUI<Sheet> {
    view: SheetViewComponent;
    archivedList?: SheetUIComponent;
    archivedSheet?: SheetUIComponent;
    sheetAction?: SheetUIComponent;
    sheetNew?: SheetUIComponent;
    stateSheetList?: SheetUIComponent;

    detialFaces?: {
        [detail:string]: DetailFace;
    }
    
    mapDetail(name:string, schemaFields:any, detailRow:EntitiesUIComponent):any {
        let nfc = this.detialFaces && this.detialFaces[name];
        let fields = schemaFields.map(sf => this.tfmMap(sf, nfc&&nfc.fields[sf.name]));
        return {
            name: name,
            label: nfc&&nfc.label,
            fields: fields,
            renderRow: detailRow || (nfc && nfc.renderRow) || SheetDetailRow,
        }
    }
    mapMainDetails(detailViews?: {[name:string]: EntitiesUIComponent}):any {
        let {fields, arrs} = this.entity.schema;
        let main = this.mapFields(fields);
        let details:any[];
        if (arrs !== undefined) {
            details = [];
            for (let arr of arrs) {
                let {name, fields} = arr;
                details.push(this.mapDetail(name, fields, detailViews && detailViews[name]));
            }
        }
        return {
            main: main,
            details: details,
        }
    }
}

