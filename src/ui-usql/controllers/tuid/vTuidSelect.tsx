import { nav } from 'tonva-tools';
import { VTuidListBase } from './vTuidList';

export class VTuidSelect  extends VTuidListBase {
    protected async onSelected(item:any): Promise<void> {
        this.closePage();
        this.return(item);
    }
}
