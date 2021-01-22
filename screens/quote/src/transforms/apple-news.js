import { Text, Quote } from '@micromag/transforms/apple-news';

const transform = (newStory, { quote, author }) => {
    const { story: quoteStory, component: quoteComponent } = Quote(newStory, quote);
    const { story: authorStory, component: authorComponent } = Text(quoteStory, author);

    return {
        ...authorStory,
        components: [
            ...(newStory.components || []),
            ...(quoteComponent ? [quoteComponent] : []),
            ...(authorComponent ? [authorComponent] : []),
        ],
    };
};

export default transform;
