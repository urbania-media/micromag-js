import getListItemFromScreen from './getListItemFromScreen';

const duplicateListItem = (fieldParams, story, screenIndex) => {
    const { components: screens = [] } = story || {};
    const screen = screens.length > screenIndex ? screens[screenIndex] : null;
    const { listKey, list, item } = getListItemFromScreen(fieldParams, screen);
    const newScreen = {
        ...screen,
        [listKey]: [...list, item],
    };
    return {
        ...story,
        components: screens.map((scr, index) => (index === screenIndex ? newScreen : scr)),
    };
};

export default duplicateListItem;
