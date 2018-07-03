import * as React from 'react';
import { ViewModel } from '../viewModel';
import { VmEntity } from '../entity';
export declare abstract class VmLink extends ViewModel {
    abstract onClick: () => void;
}
export declare class VmEntityLinkBase<T extends VmEntity> extends VmLink {
    vmEntity: T;
    constructor(vmEntity: T, link: TypeLink);
    onClick: () => Promise<void>;
}
export declare class VmEntityLink<T extends VmEntity> extends VmEntityLinkBase<T> {
    constructor(vmEntity: T);
}
export declare type TypeLink = React.StatelessComponent<{
    vm: VmEntityLinkBase<any>;
}>;
