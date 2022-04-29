import { Container, Video } from '@micromag/transforms/apple-news';

const transform = (newStory, { video }) => {
    const { media = null } = video || {};
    const { story: titleStory, component: titleComponent } = Video(newStory, media);

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
