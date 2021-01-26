import { validate } from '../../utils';

const GalleryElement = (story, gallery, role = 'gallery', definition = null) => {
    const { componentLayouts = {} } = story;

    const { images = [] } = gallery || {};
    const galleryImages = images !== null ? images.map((image) => ({ URL: image.url })) : [];

    const content = {
        role,
        ...(componentLayouts[role] ? { layout: role } : {}),
        items: galleryImages,
    };
    const component = validate(content, definition);
    return {
        story,
        component,
    };
};

export default GalleryElement;
