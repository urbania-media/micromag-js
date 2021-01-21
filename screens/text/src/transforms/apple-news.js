import { Text } from '@micromag/transforms/apple-news';

const transform = (newStory, { text: { body: textBody = null } = {} }) => {
    console.log(Text({ body: textBody }));

    return {
        ...newStory,
        components: [
            ...(newStory.components || []),
            {
                role: 'text',
                body: textBody,
            },
        ],
    };
};

export default transform;
