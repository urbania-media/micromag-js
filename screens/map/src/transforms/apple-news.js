import { Container, Map } from '@micromag/transforms/apple-news';

const transform = (newStory, { map }) => {
    const { story: titleStory, component: titleComponent } = Map(newStory, map);

    const { story: containerStory, component: containerComponent } = Container(titleStory, [
        ...(titleComponent ? [titleComponent] : []),
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
