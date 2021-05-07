import get from 'lodash/get';

const getListItemFromScreen = (fieldParams, screen) => {
    const path = fieldParams.split('/');
    const listKey = path.filter((_, i) => i < path.length - 1).join('.');
    const itemIndex = path.length > 0 ? parseInt(path[path.length - 1], 10) : null;
    const list = get(screen, listKey, null);
    const item = list !== null ? list[itemIndex] : null;

    return {
        listKey,
        itemIndex, 
        list,
        item,
    };
};

export default getListItemFromScreen;
