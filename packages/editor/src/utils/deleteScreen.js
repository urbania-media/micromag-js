const deleteScreen = (story, screenId) => {
    const { components = [], ...currentValue } = story || {};
    return {
        ...currentValue,
        components: components.filter(({ id }) => id !== screenId),
    };
};


export default deleteScreen;
