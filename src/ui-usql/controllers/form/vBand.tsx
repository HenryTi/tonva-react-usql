import * as React from 'react';
import { VField } from './vField';
import { VArr } from './vArr';
import { VSubmit } from './vSubmit';
import { uid } from 'tonva-react-form';

export abstract class VBand {
    protected label: string;
    protected view = () => <div />;

    constructor(label:string) {
        this.label = label;
    }

    render():JSX.Element {
        return <div key={this.key} className='form-group row'>
            <label className='col-sm-2 col-form-label text-sm-right'>
                {this.label}
            </label>
            <div className="col-sm-10">
                {this.renderContent()}
            </div>
        </div>;
    }

    protected get key() {return this.label}
    public getVmFields():VField[] {return;}
    public getVmArr():VArr {return;}
    public getVmSubmit():VSubmit {return;}

    protected renderContent():JSX.Element {
        return <div className="form-control form-control-plaintext bg-white border border-info rounded ">content</div>;
    }
}

export class VmFieldBand extends VBand {
    protected vmField:VField;
    constructor(label:string, vmField:VField) {
        super(label);
        this.vmField = vmField;
    }

    protected get key() {return this.vmField.name}
    public getVmFields():VField[] {return [this.vmField];}

    protected renderContent():JSX.Element {
        return this.vmField.render();
        /*
        <div className="form-control form-control-plaintext bg-white border border-info rounded ">
            {this.vmField.render()}
        </div>;*/
    }
}

export class VmArrBand extends VBand {
    protected vmArr:VArr;
    constructor(label:string, vmArr:VArr) {
        super(label);
        this.vmArr = vmArr;
    }

    protected get key() {return this.vmArr.name}
    public getVmArr():VArr {return this.vmArr;}

    render():JSX.Element {
        return <div key={this.key} className="form-group row flex-column">
            {this.vmArr && this.vmArr.render()}
        </div>;
    }
}

export class VmFieldsBand extends VBand {
    protected vmFields: VField[];
    constructor(label:string, vmFields:VField[]) {
        super(label);
        this.vmFields = vmFields;
    }

    protected get key() {return this.label || uid()}
    public getVmFields():VField[] {return this.vmFields;}

    protected renderContent():JSX.Element {
        return <div className="form-control form-control-plaintext bg-white border border-info rounded ">
            fields
        </div>;
    }
}

export class VmSubmitBand extends VBand {
    protected vmSubmit: VSubmit;
    constructor(vmSubmit:VSubmit) {
        super(undefined);
        this.vmSubmit = vmSubmit;
    }

    public getVmSubmit():VSubmit {return this.vmSubmit;}

    render():JSX.Element {
        return <div key="$submit" className="form-group row">
            <div className="offset-sm-2 col-sm-10">
                {this.vmSubmit.render()}
            </div>
        </div>;
    }
}
