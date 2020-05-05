import getStyleFromColor from './getStyleFromColor';

const getStyleFromBorder = value => {
    if (value == null) {
        return null;
    }
    const { width = null, style = null, color = null, radius = null } = value;
    const colorProcessed = getStyleFromColor(color, 'color');

    return {
        border: `${width}px ${style} ${colorProcessed ? colorProcessed.color : null}`,
        borderRadius: radius || null,
    };
};

export default getStyleFromBorder;
