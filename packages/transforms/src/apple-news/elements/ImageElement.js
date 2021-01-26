import { validate } from '../../utils';

const ImageElement = (story, image, role = 'image', definition = null) => {
    const { componentLayouts = {} } = story;
    const { url } = image || {};

    const content = {
        role,
        ...(componentLayouts[role] ? { layout: role } : {}),
        URL: url,
    };
    const component = validate(content, definition);

    return {
        story,
        component,
    };
};

export default ImageElement;
