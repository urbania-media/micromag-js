import { Container } from '@micromag/transforms/apple-news';

const transform = (newStory, { body }) => {
    const bodyComponent = body;

    const { story: containerStory, component: containerComponent } = Container(null, [
        ...(bodyComponent ? [bodyComponent] : []),
    ]);
    return {
        ...containerStory,
        components: [
            ...(newStory.components || []),
            ...(containerComponent ? [containerComponent] : []),
        ],
    };
};

export default transform;
