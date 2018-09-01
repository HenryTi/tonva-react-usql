import React from 'react';
import { FA } from "tonva-react-form";

export function icon(className:string, name:string) {
    return <FA className={className} name={name} fixWidth={true} />;
}

export interface EntityRes {
    caption: string;
    icon: JSX.Element;
}

export const entitiesRes:{[type:string]:EntityRes} = {
    tuid: {
        caption: 'Tuid',
        icon: icon('text-info', 'list-alt'),
    },
    action: {
        caption: 'Action',
        icon: icon('text-info', 'hand-o-right'),
    },
    map: {
        caption: 'Map',
        icon: icon('text-muted', 'list-ul'),
    },
    book: {
        caption: 'Book',
        icon: icon('text-muted', 'book'),
    },
    query: {
        caption: 'Query',
        icon: icon('text-warning', 'search'),
    },
    history: {
        caption: 'History',
        icon: icon('text-info', 'hand-o-right'),
    },
    sheet: {
        caption: 'Sheet',
        icon: icon('text-primary', 'wpforms'),
    },
};
