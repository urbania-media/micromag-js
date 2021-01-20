const transform = (newStory, { text: { body: textBody = null } = {} }) => ({
    ...newStory,
    components: [
        ...(newStory.components || []),
        {
            role: 'text',
            body: textBody
        },
    ]
});

export default transform;
