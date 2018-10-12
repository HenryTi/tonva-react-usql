import React from 'react';
import { FA } from "tonva-react-form";
export function icon(className, name) {
    return React.createElement(FA, { className: className, name: name, fixWidth: true });
}
export const entitiesRes = {
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
    pending: {
        caption: 'Pending',
        icon: icon('text-info', 'forward'),
    },
    sheet: {
        caption: 'Sheet',
        icon: icon('text-primary', 'wpforms'),
    },
};
//# sourceMappingURL=icons.js.map