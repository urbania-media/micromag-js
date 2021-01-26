import { Container, Video } from '@micromag/transforms/apple-news';

const transform = (newStory, { video }) => {
    const { story: titleStory, component: titleComponent } = Video(newStory, video);

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
