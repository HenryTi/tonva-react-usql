import * as React from 'react';
import { ViewModel } from '../viewModel';
import { VmEntity } from '../vmEntity';
export declare abstract class VmLink extends ViewModel {
    abstract onClick: () => void;
}
export declare class VmEntityLink extends VmLink {
    vmEntity: VmEntity;
    constructor(vmEntity: VmEntity);
    protected view: ({ vm }: {
        vm: VmEntityLink;
    }) => JSX.Element;
    onClick: () => Promise<void>;
}
export declare type TypeLink = React.StatelessComponent<{
    vm: VmEntityLink;
}>;
