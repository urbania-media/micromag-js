const postProcessor = (story, type) => {
    if (type === 'appleNews') {
        const { components } = story || {};
        return { ...story, components: components.filter((c) => c !== null) };
    }
    return story;
};

export default postProcessor;
