/// <reference types="react" />
import { TuidMain } from '../../entities';
import { CLink } from '../link';
import { VEntity } from '../VM';
import { CTuidMain, TuidUI } from './cTuid';
export declare class VTuidMain extends VEntity<TuidMain, TuidUI, CTuidMain> {
    protected controller: CTuidMain;
    onNew: () => any;
    onList: () => any;
    onSearch: (key: string) => Promise<any>;
    showEntry(param?: any): Promise<void>;
    protected entityRender(link: CLink, index: number): JSX.Element;
    protected entityClick(link: CLink): Promise<void>;
    protected readonly view: () => JSX.Element;
}
