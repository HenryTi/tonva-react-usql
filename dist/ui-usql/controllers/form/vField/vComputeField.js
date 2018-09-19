import React from 'react';
import { VField } from './vField';
import { observer } from 'mobx-react';
export class VComputeField extends VField {
    constructor(field, fieldUI, formValues) {
        super(field, fieldUI, formValues, undefined, true);
        this.view = observer(() => {
            let value = this.formValues.values[this.field.name];
            return React.createElement("div", { className: "form-control form-control-plaintext border border-info rounded bg-light cursor-pointer" },
                value,
                " \u00A0");
        });
    }
}
//# sourceMappingURL=vComputeField.js.map