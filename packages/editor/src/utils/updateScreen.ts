const updateScreen = (story, newScreenValue) => {
    const { id: newScreenId } = newScreenValue;
    const { components = [], ...currentValue } = story || {};
    const index = components.findIndex(it => it.id === newScreenId);
    return {
        ...currentValue,
        components: [
            ...components.slice(0, index),
            {
                ...components[index],
                ...newScreenValue,
            },
            ...components.slice(index + 1),
        ],
    };
};

export default updateScreen;
