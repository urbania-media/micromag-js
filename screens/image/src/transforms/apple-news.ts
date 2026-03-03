import { Container, Text, Heading1, Image } from '@micromag/transforms/apple-news';

const transform = (newStory, { layout, image, text, title }) => {
    const { story: imageStory, component: imageComponent } = Image(newStory, image);
    const { story: titleStory, component: titleComponent } = Heading1(imageStory, title);
    const { story: textStory, component: textComponent } = Text(titleStory, text);

    let items = [];
    switch (layout) {
        case 'reverse':
            items = [
                ...(textComponent ? [textComponent] : []),
                ...(titleComponent ? [titleComponent] : []),
                ...(imageComponent ? [imageComponent] : []),
            ];
            break;
        case 'title-top':
            items = [
                ...(titleComponent ? [titleComponent] : []),
                ...(imageComponent ? [imageComponent] : []),
                ...(textComponent ? [textComponent] : []),
            ];
            break;
        default:
            items = [
                ...(imageComponent ? [imageComponent] : []),
                ...(titleComponent ? [titleComponent] : []),
                ...(textComponent ? [textComponent] : []),
            ];
            break;
    }

    const { story: containerStory, component } = Container(textStory, items);

    return {
        ...containerStory,
        components: [...(newStory.components || []), ...(component ? [component] : [])],
    };
};

export default transform;
