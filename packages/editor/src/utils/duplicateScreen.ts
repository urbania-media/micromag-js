/* eslint-disable no-nested-ternary */
import { v1 as uuid } from 'uuid';

const duplicateScreen = (story, screenId, screenIndex = null) => {
    const { components = [], ...currentValue } = story || {};
    const screen = components.find((it) => it.id === screenId) || null;
    return {
        ...currentValue,
        components:
            screen !== null
                ? screenIndex !== null && screenIndex > -1
                    ? [
                          ...components.slice(0, screenIndex + 1),
                          {
                              ...screen,
                              id: uuid(),
                          },
                          ...components.slice(screenIndex + 1),
                      ]
                    : [
                          ...components,
                          {
                              ...screen,
                              id: uuid(),
                          },
                      ]
                : components,
    };
};

export default duplicateScreen;
