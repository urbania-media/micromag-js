import { Container, Mosaic } from '@micromag/transforms/apple-news';

const transform = (newStory, { images }) => {
    const galleryImages = images !== null ? images.map((image) => image.url) : [];
    const { story: titleStory, component: titleComponent } = Mosaic(newStory, {
        items: galleryImages,
    });

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
