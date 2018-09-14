/// <reference types="react" />
import { TuidMain } from '../../entities';
import { VmEntityLink } from '../link';
import { VmEntity } from '../VM';
import { CrTuidMain, TuidUI } from './crTuid';
export declare class VmTuidMain extends VmEntity<TuidMain, TuidUI> {
    protected coordinator: CrTuidMain;
    onNew: () => Promise<void>;
    onList: () => Promise<void>;
    onSearch: (key: string) => Promise<void>;
    showEntry(param?: any): Promise<void>;
    protected entityRender(link: VmEntityLink, index: number): JSX.Element;
    protected entityClick(link: VmEntityLink): Promise<void>;
    protected readonly view: () => JSX.Element;
}
