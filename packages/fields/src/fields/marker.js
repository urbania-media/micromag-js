import Marker from '../components/Marker';

export default {
    id: 'marker',
    component: Marker,
    fields: [
        {
            name: 'title',
            type: 'heading',
        },
        {
            name: 'position',
            type: 'geo-position',
        }
    ]
};
