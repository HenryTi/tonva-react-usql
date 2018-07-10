import * as React from 'react';
import { Entity } from '../entities';
import { EntityUIProps, EntityUIO } from '../ui';
export declare class EntityLink<E extends Entity, U extends EntityUIO<E>> extends React.Component<EntityUIProps<E, U>> {
    render(): JSX.Element;
}
