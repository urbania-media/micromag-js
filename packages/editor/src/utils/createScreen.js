import { v1 as uuid } from 'uuid';

const createScreen = (screen, data = {}) => {
    const { id, layouts = null } = screen;
    return {
        id: uuid(),
        type: id,
        ...(layouts !== null
            ? {
                  layout: layouts[0],
              }
            : {}),
        ...data,
    };
};

export default createScreen;
