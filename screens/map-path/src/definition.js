import { defineMessage } from 'react-intl';
import MapPath from './MapPath';

export default {
    id: 'map-path',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'MapPath',
        description: 'MapPath screen title'
    }),
    component: MapPath,
    layouts: ['top', 'bottom'],
    fields: [
        {
            name: 'layout',
            type: 'screen-layout',
            label: defineMessage({
                defaultMessage: 'Layout',
                description: 'Layout field label'
            }),
        },
        {
            name: 'map',
            type: 'map',
            label: defineMessage({
                defaultMessage: 'Map',
                description: 'Map field label'
            }),
        },
        {
            name: 'markers',
            type: 'markers',
            label: defineMessage({
                defaultMessage: 'Markers',
                description: 'Markers field label'
            }),
        },
        {
            name: 'button',
            type: 'button',
            label: defineMessage({
                defaultMessage: 'Button style',
                description: 'Button style field label'
            }),
        },
        {
            name: 'background',
            type: 'background',
            label: defineMessage({
                defaultMessage: 'Background',
                description: 'Background field label'
            }),
        },
    ],
};
