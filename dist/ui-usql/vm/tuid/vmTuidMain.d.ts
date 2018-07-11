import { VmTuid } from './vmTuid';
import { VmEntityLink } from '../link';
export declare class VmTuidMain extends VmTuid {
    onNew: () => Promise<void>;
    onList: () => Promise<void>;
    onSearch: (key: string) => Promise<void>;
    entityRender(link: VmEntityLink, index: number): JSX.Element;
    entityClick(link: VmEntityLink): Promise<void>;
    protected beforeStart(param?: any): Promise<void>;
}
