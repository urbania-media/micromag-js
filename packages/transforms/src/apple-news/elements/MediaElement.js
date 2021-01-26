import { validate } from '../../utils';

const MediaElement = (story, media, role = 'audio', definition = null) => {
    const { url } = media || {};
    const content = {
        role,
        URL: url,
        layout: role,
    };
    const component = validate(content, definition);

    return {
        story,
        component,
    };
};

export default MediaElement;
