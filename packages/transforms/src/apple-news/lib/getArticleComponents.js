const getArticleComponents = (story) => {
    const { title = null, metadata = {}, components = [] } = story || {};
    const { description = 'Ma description' } = metadata || {};
    const { component: heading1 } = title ? { role: 'heading1', body: title } : {};
    const { component: heading2 } = description ? { role: 'heading2', body: description } : {};

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
        components: [
            {
                role: 'header',
                components: headerComponents,
                layout: 'header',
            },
        ],
    };
};

export default getArticleComponents;
