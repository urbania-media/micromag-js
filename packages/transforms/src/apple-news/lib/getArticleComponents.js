import Heading1 from '../components/Heading1';
import Heading2 from '../components/Heading2';
import Image from '../components/Image';

const getArticleComponents = (story) => {
    const { title = null, metadata = {}, components = [] } = story || {};
    const { description = 'Ma description' } = metadata || {};
    const { component: heading1 } = title ? Heading1(story, { body: title }) : null;
    const { component: heading2 } = description ? Heading2(story, { body: description }) : null;

    const titleScreen = components.reduce((comp, next, i) => {
        if (comp === null && i < 3) {
            if (next.type.indexOf('title') !== false) {
                return next;
            }
        }
        return comp;
    }, null);

    let imageResult = {};
    if (titleScreen !== null) {
        const { image = null, background = null } = titleScreen;
        if (image !== null) {
            imageResult = Image(story, image);
        } else if (background !== null && background.image !== null) {
            imageResult = Image(story, background.image);
        }
    }
    const { component: imageComponent } = imageResult;

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
