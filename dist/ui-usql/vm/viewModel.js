var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observer } from 'mobx-react';
export class ViewModel {
    load() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    renderView() {
        if (this.view === undefined)
            return React.createElement("div", null, "??? viewModel \u5FC5\u987B\u5B9A\u4E49 view ???");
        return React.createElement(this.view, { vm: this });
    }
}
export const JSONContent = observer((values) => React.createElement(React.Fragment, null,
    "content: ",
    JSON.stringify(values)));
export const RowContent = (values) => React.createElement("div", { className: "px-3 py-2" },
    "Row: ",
    JSON.stringify(values));
//# sourceMappingURL=viewModel.js.map