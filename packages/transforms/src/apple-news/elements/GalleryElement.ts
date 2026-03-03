import { validate, stripTags } from '../../utils';

const GalleryElement = (story, gallery, role = 'gallery', definition = null) => {
    const { componentLayouts = {} } = story;

    const { images = [] } = gallery || {};
    const galleryImages =
        images !== null
            ? images
                  .map((image) => {
                      if (image == null) {
                          return null;
                      }
                      const { media = null, url = null, caption = null } = image || {};
                      const mediaUrl = media !== null && media.url ? media.url : null;
                      const imageUrl = url !== null ? url : null;
                      const hasUrl = imageUrl || mediaUrl;
                      const imageCaption =
                          caption !== null && caption.body ? stripTags(caption.body) : null;
                      return hasUrl
                          ? {
                                URL: imageUrl || mediaUrl,
                                ...(imageCaption !== null ? { caption: imageCaption } : {}),
                            }
                          : null;
                  })
                  .filter((i) => i !== null)
            : [];

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
