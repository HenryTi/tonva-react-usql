import { nav } from 'tonva-tools';
import { ViewModel } from './viewModel';

export abstract class VmPage extends ViewModel {
    async start(param?:any):Promise<void> {
        await this.beforeStart(param);
        await this.show();
    }

    async beforeStart(param?:any):Promise<void> {
    }

    async show() {
        nav.push(this.render());
    }

    async end() {
    }
}
