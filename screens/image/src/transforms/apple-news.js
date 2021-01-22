import { Text, Title } from '@micromag/transforms/apple-news';

const transform = (newStory, { text, title }) => {
    const { story: titleStory, component: titleComponent } = Title(newStory, title);
    const { story: textStory, component: textComponent } = Text(titleStory, text);

    return {
        ...textStory,
        components: [
            ...(newStory.components || []),
            ...(titleComponent ? [titleComponent] : []),
            ...(textComponent ? [textComponent] : []),
        ],
    };
};

export default transform;
