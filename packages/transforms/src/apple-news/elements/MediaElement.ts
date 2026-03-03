import { validate } from '../../utils';

const MediaElement = (story, media, role = 'audio', definition = null) => {
    const { componentLayouts = {} } = story;
    const { url } = media || {};
    const content = {
        role,
        ...(componentLayouts[role] ? { layout: role } : {}),
        URL: url,
    };
    const component = validate(content, definition);

    return {
        story,
        component: role === 'audio' ? component : component, // Figure out HLS for videos
    };
};

export default MediaElement;
