import { Container, Heading1, Heading2, Text } from '@micromag/transforms/apple-news';

const transform = (newStory, { title, subtitle, credits }) => {
    const { story: titleStory, component: titleComponent } = Heading1(newStory, title);
    const { story: subtitleStory, component: subtitleComponent } = Heading2(titleStory, subtitle);
    const { story: creditsStory, component: creditsComponent } = Text(subtitleStory, credits);

    const { story: containerStory, component: containerComponent } = Container(creditsStory, [
        ...(titleComponent ? [titleComponent] : []),
        ...(subtitleComponent ? [subtitleComponent] : []),
        ...(creditsComponent ? [creditsComponent] : []),
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
