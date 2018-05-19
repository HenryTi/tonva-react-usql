var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as _ from 'lodash';
import { Api } from 'tonva-tools';
export class UsqlApi extends Api {
    constructor(apiOwner, apiName, url, access) {
        let hash = document.location.hash;
        let baseUrl = hash === undefined || hash === '' ? 'debug/' : 'tv/';
        super(baseUrl, url, apiOwner, apiName);
        this.access = access;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('update', {});
        });
    }
    loadAccess() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('access', { acc: this.access.join('|') });
        });
    }
    schema(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('schema/' + name, undefined);
        });
    }
    tuidGet(name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tuid/' + name + '/' + id, {});
        });
    }
    tuidSave(name, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('tuid/' + name, params);
        });
    }
    tuidSearch(name, key, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.post('tuids/' + name, {
                key: key,
                pageStart: pageStart,
                pageSize: pageSize
            });
            return ret;
        });
    }
    tuidSlaveSave(name, slave, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('tuid-slave/' + name + '/' + slave, params);
        });
    }
    tuidSlaves(name, slave, masterId, order, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.get('tuid-slaves/' + name, {
                slave: slave,
                masterId: masterId,
                pageStart: order,
                pageSize: pageSize
            });
            return ret;
        });
    }
    tuidIds(name, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('tuidids/' + name, ids);
        });
    }
    proxied(name, proxy, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tuid-proxy/' + name + '/' + proxy + '/' + id, undefined);
        });
    }
    sheetSave(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('sheet/' + name, data);
        });
    }
    sheetAction(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.put('sheet/' + name, data);
        });
    }
    stateSheets(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('sheet/' + name + '/states', data);
        });
    }
    stateSheetCount(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('sheet/' + name + '/statecount', undefined);
        });
    }
    getSheet(name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('sheet/' + name + '/get/' + id, undefined);
        });
    }
    sheetArchives(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('sheet/' + name + '/archives', data);
        });
    }
    sheetArchive(name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('sheet/' + name + '/archive/' + id, undefined);
        });
    }
    action(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('action/' + name, data);
        });
    }
    queryPage(queryApi, name, pageStart, pageSize, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let p = _.clone(params);
            p['$pageStart'] = pageStart;
            p['$pageSize'] = pageSize;
            return yield this.post(queryApi + '/' + name, p);
        });
    }
    /*
        async history(name:string, pageStart:any, pageSize:number, params:any):Promise<string> {
            let p = _.clone(params);
            p['$pageStart'] = pageStart;
            p['$pageSize'] = pageSize;
            let ret = await this.post('history/' + name, p);
            return ret;
        }
    
        async book(name:string, pageStart:any, pageSize:number, params:any):Promise<string> {
            let p = _.clone(params);
            p['$pageStart'] = pageStart;
            p['$pageSize'] = pageSize;
            let ret = await this.post('history/' + name, p);
            return ret;
        }
    */
    user() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('user', undefined);
        });
    }
}
//# sourceMappingURL=usqlApi.js.map