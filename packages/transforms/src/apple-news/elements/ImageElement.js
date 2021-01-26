import { validate } from '../../utils';

const ImageElement = (story, image, role = 'image', definition = null) => {
    const { url } = image || {};

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

export default ImageElement;
