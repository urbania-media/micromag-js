const getArticleComponents = (story) => {
    const { title = null, metadata = {}, components = [] } = story || {};
    const { description = 'Ma description' } = metadata || {};

    const heading1 = title ? { role: 'heading1', text: title, format: 'html' } : null;
    const heading2 = description ? { role: 'heading2', text: description, format: 'html' } : null;

    const titleScreen = components.reduce((comp, next, i) => {
        if (comp === null && i < 3) {
            if (next.type.indexOf('title') !== false) {
                return next;
            }
        }
        return comp;
    }, null);

    let imageComponent = null;
    if (titleScreen !== null) {
        const { image = null, background = null } = titleScreen || {};
        if (image !== null) {
            imageComponent = { role: 'image', URL: image.url };
        } else if (background !== null && background.image !== null) {
            imageComponent = { role: 'image', URL: background.image.url };
        }
    }

    const headerComponents = [imageComponent, heading1, heading2].filter((it) => it !== null);

    return {
        components:
            headerComponents.length > 0
                ? [
                      {
                          role: 'header',
                          components: headerComponents,
                          layout: 'header',
                      },
                  ]
                : [],
    };
};

export default getArticleComponents;
