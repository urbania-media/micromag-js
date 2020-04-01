import uuid from 'uuid/v1';

const duplicateScreen = (story, screenId) => {
    const { components = [], ...currentValue } = story || {};
    const screen = components.find(it => it.id === screenId) || null;
    return {
        ...currentValue,
        components: screen !== null ? [
            ...components,
            {
                ...screen,
                id: uuid(),
            },
        ] : components,
    };
}

export default duplicateScreen;
