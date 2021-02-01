const getListItemFromScreen = (fieldParams, screen) => {
    const path = fieldParams.split('/');
    const listKey = path.length ? path[0] : null;
    const itemIndex = path.length > 0 ? parseInt(path[1], 10) : null;
    const list = typeof screen[listKey] !== 'undefined' ? screen[listKey] : null;
    const item = list !== null ? list[itemIndex] : null;

    return {
        listKey,
        itemIndex, 
        list,
        item,
    };
};

export default getListItemFromScreen;
