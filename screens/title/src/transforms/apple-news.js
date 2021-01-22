import { Container, Title, Subtitle, Text } from '@micromag/transforms/apple-news';

const transform = (newStory, { title, subtitle, credits }) => {
    const { story: titleStory, component: titleComponent } = Title(newStory, title);
    const { story: subtitleStory, component: subtitleComponent } = Subtitle(titleStory, subtitle);
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
