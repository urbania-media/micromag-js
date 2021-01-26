import { validate } from '../../utils';

const MapElement = (story, map, role = 'map', definition = null) => {
    const { latitude = null, longitude = null } = map || {};
    const content = {
        role,
        layout: role,
        latitude,
        longitude,
    };
    const component = validate(content, definition);
    return {
        story,
        component,
    };
};

export default MapElement;
