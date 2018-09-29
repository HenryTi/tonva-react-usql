/// <reference types="react" />
import { VEntity } from '../VM';
import { Tuid } from '../../entities';
import { CTuid, TuidUI } from './cTuid';
export declare class VTuidSelect extends VEntity<Tuid, TuidUI, CTuid<Tuid>> {
    protected mainRowContent: (row: any) => JSX.Element;
    protected divRowContent: (row: any) => JSX.Element;
    showEntry(param?: any): Promise<void>;
    private showMain;
    private showDiv;
    protected mainView: () => JSX.Element;
    onSearchMain: (key: string) => Promise<void>;
    renderMainRow: (item: any, index: number) => JSX.Element;
    clickMainRow: (item: any) => Promise<void>;
    protected divView: (param: any) => JSX.Element;
    renderDivRow: (item: any, index: number) => JSX.Element;
    clickDivRow: (item: any) => void;
}
