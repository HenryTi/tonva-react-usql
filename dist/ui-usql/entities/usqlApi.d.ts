import { Api } from 'tonva-tools';
export declare class UsqlApi extends Api {
    access: string[];
    constructor(apiOwner: string, apiName: string, url: string, access: string[]);
    update(): Promise<string>;
    loadAccess(): Promise<any>;
    schema(name: string): Promise<any>;
    tuidGet(name: string, id: number): Promise<any>;
    tuidSave(name: string, params: any): Promise<any>;
    tuidSearch(name: string, key: string, pageStart: string | number, pageSize: number): Promise<any>;
    tuidIds(name: string, ids: number[]): Promise<any[]>;
    sheetSave(name: string, data: object): Promise<any>;
    sheetAction(name: string, data: object): Promise<any>;
    stateSheets(name: string, data: object): Promise<any>;
    stateSheetCount(name: string): Promise<any>;
    getSheet(name: string, id: number): Promise<any>;
    sheetArchives(name: string, data: object): Promise<any>;
    sheetArchive(name: string, id: number): Promise<any>;
    action(name: string, data: object): Promise<any>;
    queryPage(queryApi: string, name: string, pageStart: any, pageSize: number, params: any): Promise<string>;
    user(): Promise<any>;
}
