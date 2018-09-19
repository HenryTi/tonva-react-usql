import * as React from 'react';
import { Button } from 'reactstrap';
import { ViewModel } from "../viewModel";
import { VForm } from './vForm';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

export class VSubmit extends ViewModel {
    private vmForm: VForm;
    constructor(vmForm: VForm) {
        super();
        this.vmForm = vmForm;
        this.caption = this.vmForm.submitCaption;
        this.className = 'btn btn-primary';
    }
    @observable caption: string;
    @observable className: string;
    protected view = observer(() => {
        let {onSubmit, isOk, formValues} = this.vmForm;
        return <button type="button" 
            onClick={() => onSubmit(formValues.values)}
            className={this.className}
            disabled={isOk === false}>
            {this.caption}
        </button>;
    });
}