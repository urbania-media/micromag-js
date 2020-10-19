import uuid from 'uuid/v1';

const createScreen = (screen, data = {}) => {
    const { id } = screen;
    return {
        id: uuid(),
        type: id,
        ...data,
    };
};

export default createScreen;
