import { Text } from '@micromag/transforms/apple-news';

const transform = (newStory, { text }) => {
    const { body } = text || {};
    const component = body ? Text({ body }) : null;
    return {
        ...newStory,
        components: [...(newStory.components || []), ...([component] || {})],
    };
};

export default transform;
