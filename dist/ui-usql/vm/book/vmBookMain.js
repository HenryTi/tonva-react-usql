import * as React from 'react';
import { Page } from 'tonva-tools';
import { VmBook } from './vmBook';
export class VmBookMain extends VmBook {
    render() {
        return React.createElement(Page, { header: this.label }, "Book");
    }
}
//# sourceMappingURL=vmBookMain.js.map