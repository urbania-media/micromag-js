import { Container, Text, Quote } from '@micromag/transforms/apple-news';

const transform = (newStory, { quote, author }) => {
    const { story: quoteStory, component: quoteComponent } = Quote(newStory, quote);
    const { story: authorStory, component: authorComponent } = Text(quoteStory, author);

    const { story: containerStory, component: containerComponent } = Container(authorStory, [
        ...(quoteComponent ? [quoteComponent] : []),
        ...(authorComponent ? [authorComponent] : []),
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
