import * as _ from 'lodash';
export class EntityUI {
    mapMain() {
        return this.mapFields(this.entity.schema.fields);
    }
    onWsReceive(cmd, onWsReceive) {
        return this.entitiesUI.entities.onWsReceive(cmd, onWsReceive);
    }
    onWsReceiveAny(onWsReceive) {
        return this.entitiesUI.entities.onWsReceiveAny(onWsReceive);
    }
    endWsReceive(handlerId) {
        this.entitiesUI.entities.endWsReceive(handlerId);
    }
    tfmMap(sf, ff) {
        let ret;
        let { type, tuid, url } = sf;
        let tuidInput = {};
        let tfm = this.typeFieldMappers;
        let face;
        if (ff === undefined) {
            let fm = tfm[type];
            if (fm === undefined) {
                console.log('type field mapper not defined');
                return;
            }
            ret = fm(sf);
            face = ret.face;
            if (face === undefined)
                ret.face = face = {};
        }
        else {
            let fm = ff.mapper || tfm[type];
            if (fm === undefined) {
                console.log('type field mapper not defined');
                return;
            }
            ret = fm(sf);
            let { label, notes, placeholder, input } = ff;
            if (label !== undefined)
                ret.label = label;
            face = ret.face;
            if (face !== undefined) {
                if (notes !== undefined)
                    face.notes = notes;
                if (placeholder !== undefined)
                    face.placeholder = placeholder;
                if (input !== undefined)
                    _.merge(tuidInput, input);
            }
        }
        if (tuid !== undefined) {
            let tuidUI = this.entitiesUI.tuid.coll[tuid];
            if (tuidUI !== undefined) {
                _.merge(tuidInput, tuidUI.input);
            }
            let input0 = this.entitiesUI.getTuidInput(tuid, url);
            _.merge(tuidInput, input0, face.input);
            face.ui = tuidUI;
            face.input = tuidInput;
        }
        if (sf.null === false) {
            ret.field.required = true;
        }
        return ret;
    }
    mapFields(schemaFields) {
        if (schemaFields === undefined)
            return;
        let nfc = this.fieldFaces;
        return schemaFields.map(sf => this.tfmMap(sf, nfc !== undefined && nfc[sf.name]));
    }
}
//# sourceMappingURL=entityUI.js.map