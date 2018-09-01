var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { autorun } from 'mobx';
import { nav } from 'tonva-tools';
import { ViewModel } from './viewModel';
export class VmPage extends ViewModel {
    constructor() {
        super(...arguments);
        this.disposer = () => {
            if (this.reactionDisposers !== undefined) {
                for (let d of this.reactionDisposers)
                    d();
                console.log("auto run disposed in VmSheetOrderNew");
            }
            nav.unregisterReceiveHandler(this.wsId);
            this.end();
        };
    }
    regAutorun(view, opts) {
        if (this.reactionDisposers === undefined)
            this.reactionDisposers = [];
        this.reactionDisposers.push(autorun(view, opts));
    }
    start(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.onReceive = this.onReceive.bind(this);
            this.wsId = nav.registerReceiveHandler(this.onReceive);
            yield this.beforeStart(param);
            yield this.show();
        });
    }
    beforeStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    pushPage(page) {
        nav.push(page, this.disposer);
    }
    popPage(level) {
        nav.pop(level);
    }
    replacePage(page) {
        nav.replace(page, this.disposer);
    }
    back(confirm) {
        return __awaiter(this, void 0, void 0, function* () {
            yield nav.back(confirm);
        });
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            //nav.push(this.render(), this.disposer);
            this.pushPage(this.render());
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    onReceive(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('message receive from websocket to %s: %s', this.constructor.name, JSON.stringify(msg));
        });
    }
}
//# sourceMappingURL=vmPage.js.map