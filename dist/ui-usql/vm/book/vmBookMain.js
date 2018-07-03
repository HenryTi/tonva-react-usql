import * as React from 'react';
import { Page } from 'tonva-tools';
import { VmBook } from './vmBook';
export class VmBookMain extends VmBook {
    renderView() {
        return React.createElement(Page, { header: this.caption }, "Book");
    }
}
//# sourceMappingURL=vmBookMain.js.map