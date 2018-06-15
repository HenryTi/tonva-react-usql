import { ApiBase } from 'tonva-tools';
export declare class UsqlApi {
    private api;
    private access;
    constructor(api: ApiBase, access: string[]);
    update(): Promise<string>;
    loadAccess(): Promise<any>;
    schema(name: string): Promise<any>;
    schemas(names: string[]): Promise<any[]>;
    tuidGet(name: string, id: number): Promise<any>;
    tuidGetAll(name: string): Promise<any[]>;
    tuidSave(name: string, params: any): Promise<any>;
    tuidSearch(name: string, key: string, pageStart: string | number, pageSize: number): Promise<any>;
    tuidSlaveSave(name: string, slave: any, params: any): Promise<any>;
    tuidSlaves(name: string, slave: string, masterId: number, order: number, pageSize: number): Promise<any>;
    tuidIds(name: string, ids: number[]): Promise<any[]>;
    proxied(name: string, proxy: string, id: number): Promise<any>;
    sheetSave(name: string, data: object): Promise<any>;
    sheetAction(name: string, data: object): Promise<any>;
    stateSheets(name: string, data: object): Promise<any>;
    stateSheetCount(name: string): Promise<any>;
    getSheet(name: string, id: number): Promise<any>;
    sheetArchives(name: string, data: object): Promise<any>;
    sheetArchive(name: string, id: number): Promise<any>;
    action(name: string, data: object): Promise<any>;
    queryPage(queryApi: string, name: string, pageStart: any, pageSize: number, params: any): Promise<string>;
    query(name: string, params: any): Promise<any>;
    user(): Promise<any>;
}
