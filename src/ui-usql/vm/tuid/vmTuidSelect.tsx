import { nav } from 'tonva-tools';
import { VmTuidListBase } from './vmTuidList';

export class VmTuidSelect  extends VmTuidListBase {
    protected async onSelected(item:any): Promise<void> {
        this.closePage();
        this.return(item);
    }
}
