function getJustifyContent(horizontal) {
    if (horizontal === 'left') return 'flex-start';
    if (horizontal === 'middle') return 'center';
    if (horizontal === 'right') return 'flex-end';
    return null;
}
function getAlignItems(vertical) {
    if (vertical === 'top') return 'flex-start';
    if (vertical === 'middle') return 'center';
    if (vertical === 'bottom') return 'flex-end';
    return null;
}

const getStyleFromAlignment = (value, invertAxis = false, defaultAlignment = null) => {
    if (value === null) {
        return null;
    }
    const { horizontal = null, vertical = null } = value;

    const justifyContent = getJustifyContent(horizontal);
    const alignItems = getAlignItems(vertical);

    if (invertAxis) {
        return {
            justifyContent: alignItems || defaultAlignment,
            alignItems: justifyContent || defaultAlignment,
        };
    }

    return {
        justifyContent: justifyContent || defaultAlignment,
        alignItems: alignItems || alignItems,
    };
};

export default getStyleFromAlignment;
