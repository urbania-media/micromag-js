import { validate } from '../../utils';

const GalleryElement = (story, gallery, role = 'gallery', definition = null) => {
    const { items = [] } = gallery || {};
    const content = {
        role,
        layout: role,
        items,
    };
    const component = validate(content, definition);
    return {
        story,
        component,
    };
};

export default GalleryElement;
