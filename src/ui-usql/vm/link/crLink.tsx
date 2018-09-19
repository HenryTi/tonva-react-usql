import * as React from 'react';
import classNames from 'classnames';
import { Coordinator } from 'tonva-tools';

export abstract class Link {
    abstract onClick: () => void;
    abstract render(className?:string):JSX.Element;
}

export class CrLink extends Link {
    private coordinator: Coordinator;
    protected icon:string|JSX.Element;
    protected label:string|JSX.Element;

    constructor(coordinator:Coordinator) {
        super();
        this.coordinator = coordinator;
        this.icon = coordinator.icon;
        this.label = coordinator.label;
    }

    onClick = async () => {
        await this.coordinator.start();
    }

    render(className?:string) {
        return React.createElement(this.view, className);
    }

    protected view = (className?:string) => {
        return <div
            className={classNames('px-3', 'py-2', 'align-items-center', 'cursor-pointer', className)}
            onClick={this.onClick}>
            {this.icon} &nbsp; {this.label}
        </div>;
    }
}
