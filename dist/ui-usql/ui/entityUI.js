var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import * as _ from 'lodash';
import { wsBridge, nav } from 'tonva-tools';
export class EntityUIO {
    mapMain() {
        return this.mapFields(this.entity.schema.fields);
    }
    onWsReceive(cmd, onWsReceive) {
        if (this.wsHandlers === undefined)
            this.wsHandlers = [];
        this.wsHandlers.push(wsBridge.onWsReceive(cmd, onWsReceive));
    }
    onWsReceiveAny(onWsReceive) {
        if (this.wsHandlers === undefined)
            this.wsHandlers = [];
        this.wsHandlers.push(wsBridge.onWsReceiveAny(onWsReceive));
    }
    endWsReceive() {
        if (this.wsHandlers === undefined)
            return;
        for (let h of this.wsHandlers)
            wsBridge.endWsReceive(h);
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
    showMain() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.loadSchema();
            nav.push(React.createElement(this.mainPage, { ui: this }));
        });
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
//# sourceMappingURL=entityUI.js.map