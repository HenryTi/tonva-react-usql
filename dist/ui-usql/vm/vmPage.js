var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { nav } from 'tonva-tools';
import { ViewModel } from './viewModel';
export class VmPage extends ViewModel {
    start(param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.beforeStart(param);
            yield this.show();
        });
    }
    beforeStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            nav.push(this.render());
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
//# sourceMappingURL=vmPage.js.map