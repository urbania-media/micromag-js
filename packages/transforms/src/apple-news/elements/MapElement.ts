import { validate } from '../../utils';

const MapElement = (story, map, role = 'map', definition = null) => {
    const { componentLayouts = {} } = story;
    const { latitude = null, longitude = null } = map || {};
    const content = {
        role,
        ...(componentLayouts[role] ? { layout: role } : {}),
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
