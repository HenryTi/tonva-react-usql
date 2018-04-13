/// <reference types="react" />
import * as React from 'react';
import { Entity } from '../entities';
import { EntityUIProps, EntityUI } from '../ui';
export declare class EntityLink<E extends Entity, U extends EntityUI<E>> extends React.Component<EntityUIProps<E, U>> {
    render(): JSX.Element;
}
