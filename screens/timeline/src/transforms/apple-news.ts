/* eslint-disable arrow-body-style */
import { Container, Text } from '@micromag/transforms/apple-news';

const transform = (newStory, { items = [] }) => {
    const allItems = items || [];

    const list = allItems.reduce(
        (acc, it) => {
            const { story: titleStory, component: titleComponent } = Text(acc.story, it.title);
            const { story: descriptionStory, component: descriptionComponent } = Text(
                titleStory,
                it.description,
            );
            const {
                story: containerStory,
                component: containerComponent,
            } = Container(descriptionStory, [
                ...(titleComponent ? [titleComponent] : []),
                ...(descriptionComponent ? [descriptionComponent] : []),
            ]);

            return {
                story: containerStory,
                components: [
                    ...(acc.components || []),
                    ...(containerComponent ? [containerComponent] : []),
                ],
            };
        },
        { story: newStory, components: [] },
    );

    const { story: reducedStory, components: reducedComponents = [] } = list || {};
    const { story: bigContainerStory, component: bigContainerComponent } = Container(
        reducedStory,
        reducedComponents,
    );

    return {
        ...bigContainerStory,
        components: [
            ...(newStory.components || []),
            ...(bigContainerComponent ? [bigContainerComponent] : []),
        ],
    };
};

export default transform;
