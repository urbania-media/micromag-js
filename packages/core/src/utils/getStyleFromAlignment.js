// import isObject from 'lodash/isObject';

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

const getStyleFromAlignment = (value) => {
    if (value === null) {
        return null;
    }
    const {
        horizontal = null,
        vertical = null,
    } = value;

    const justifyContent = getJustifyContent(horizontal);
    const alignItems = getAlignItems(vertical);

    return {
        justifyContent,
        alignItems,
    };
};

export default getStyleFromAlignment;
