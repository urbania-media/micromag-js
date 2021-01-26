import { Container, Text, Heading1, Image } from '@micromag/transforms/apple-news';

const transform = (newStory, { image, text, title }) => {
    const { story: imageStory, component: imageComponent } = Image(newStory, image);
    const { story: titleStory, component: titleComponent } = Heading1(imageStory, title);
    const { story: textStory, component: textComponent } = Text(titleStory, text);

    const { story: containerStory, component } = Container(textStory, [
        ...(imageComponent ? [imageComponent] : []),
        ...(titleComponent ? [titleComponent] : []),
        ...(textComponent ? [textComponent] : []),
    ]);

    return {
        ...containerStory,
        components: [...(newStory.components || []), ...(component ? [component] : [])],
    };
};

export default transform;
