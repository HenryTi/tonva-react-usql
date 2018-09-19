/// <reference types="react" />
import { TuidMain } from '../../entities';
import { CrLink } from '../link';
import { VEntity } from '../VM';
import { CrTuidMain, TuidUI } from './crTuid';
export declare class VmTuidMain extends VEntity<TuidMain, TuidUI, CrTuidMain> {
    protected controller: CrTuidMain;
    onNew: () => Promise<void>;
    onList: () => Promise<void>;
    onSearch: (key: string) => Promise<void>;
    showEntry(param?: any): Promise<void>;
    protected entityRender(link: CrLink, index: number): JSX.Element;
    protected entityClick(link: CrLink): Promise<void>;
    protected readonly view: () => JSX.Element;
}
