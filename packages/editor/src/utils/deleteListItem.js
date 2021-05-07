import set from 'lodash/set';
import getListItemFromScreen from './getListItemFromScreen';

const deleteListItem = (fieldParams, story, screenIndex) => {
    
    const { components: screens = [] } = story || {};
    const screen = screens.length > screenIndex ? screens[screenIndex] : null;
    const { listKey, list, itemIndex } = getListItemFromScreen(fieldParams, screen);
    const newScreen = set({ ...screen }, listKey, list.filter((it, index) => itemIndex !== index));
    return {
        ...story,
        components: screens.map((scr, index) => (index === screenIndex ? newScreen : scr)),
    };
};

export default deleteListItem;
