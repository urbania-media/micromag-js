import { Container, Text, Title } from '@micromag/transforms/apple-news';

const transform = (newStory, { text, title }) => {
    const { story: titleStory, component: titleComponent } = Title(newStory, title);
    const { story: textStory, component: textComponent } = Text(titleStory, text);

    const { story: containerStory, component: containerComponent } = Container(textStory, [
        ...(titleComponent ? [titleComponent] : []),
        ...(textComponent ? [textComponent] : []),
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
