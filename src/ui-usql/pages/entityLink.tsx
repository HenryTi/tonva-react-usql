import * as React from 'react';
import {FA} from 'tonva-react-form';
import {Entity} from '../entities';
import {EntitiesUIProps, EntityUIProps, EntitiesUI, EntityUIO} from '../ui';

export class EntityLink<E extends Entity, U extends EntityUIO<E>> extends React.Component<EntityUIProps<E, U>> {
    render() {
        let {ui} = this.props;
        let {caption, entitySet} = ui;
        return <div className="px-3 py-2 d-flex align-items-center">
            <FA className="text-info" size="lg" name={ui.icon || entitySet.icon} fixWidth={true} />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;{caption}</span>
        </div>
    }
}
