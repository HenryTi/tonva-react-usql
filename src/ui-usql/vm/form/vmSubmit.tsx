import * as React from 'react';
import { Button } from 'reactstrap';
import { ViewModel } from "../viewModel";
import { VmForm } from './vmForm';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

export class VmSubmit extends ViewModel {
    private vmForm: VmForm;
    constructor(vmForm: VmForm) {
        super();
        this.vmForm = vmForm;
        this.caption = this.vmForm.submitCaption;
        this.className = 'btn btn-primary';
    }
    @observable caption: string;
    @observable className: string;
    protected view = observer(() => {
        let {onSubmit, isOk} = this.vmForm;
        return <button type="button" 
            onClick={onSubmit} 
            className={this.className}
            disabled={isOk === false}>
            {this.caption}
        </button>;
    });
}