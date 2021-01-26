import { Container, Audio } from '@micromag/transforms/apple-news';

const transform = (newStory, { audio }) => {
    const { media = null } = audio || {};
    const { story: titleStory, component: titleComponent } = Audio(newStory, media);
    console.log(media);
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
