import * as React from 'react';
import { autorun, IReactionDisposer, IReactionPublic } from 'mobx';
import { IAutorunOptions } from 'mobx/lib/api/autorun';
import { nav } from 'tonva-tools';
import { ViewModel } from './viewModel';

export abstract class VmPage extends ViewModel {
    private reactionDisposers: IReactionDisposer[];
    private wsId: number;

    regAutorun(view: (r: IReactionPublic) => any, opts?: IAutorunOptions) {
        if (this.reactionDisposers === undefined) this.reactionDisposers = [];
        this.reactionDisposers.push(autorun(view, opts));
    }

    async start(param?:any):Promise<void> {
        this.onReceive = this.onReceive.bind(this);
        this.wsId = nav.registerReceiveHandler(this.onReceive);
        await this.beforeStart(param);
        await this.show();
    }

    protected async beforeStart(param?:any):Promise<void> {
    }

    pushPage(page: JSX.Element) {
        nav.push(page, this.disposer);
    }

    popPage(level?:number) {
        nav.pop(level);
    }

    replacePage(page: JSX.Element) {
        nav.replace(page, this.disposer);
    }

    async show() {
        //nav.push(this.render(), this.disposer);
        this.pushPage(this.render());
    }

    private disposer = () => {
        if (this.reactionDisposers !== undefined) {
            for (let d of this.reactionDisposers) d();
            console.log("auto run disposed in VmSheetOrderNew");
        }
        nav.unregisterReceiveHandler(this.wsId);
        this.end();
    }

    async end() {
    }

    protected async onReceive(msg: any) {
        console.log('message receive from websocket to %s: %s', this.constructor.name, JSON.stringify(msg));
    }
}
