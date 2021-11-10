import getStyleFromColor from './getStyleFromColor';

const getStyleFromBorder = (value) => {
    if (value == null) {
        return null;
    }
    const { width = null, style: borderStyle = null, color = null } = value;

    return {
        ...(width !== null ? { borderWidth: `${width}px` } : null),
        ...(borderStyle !== null ? { borderStyle } : null),
        ...getStyleFromColor(color, 'borderColor'),
    };
};

export default getStyleFromBorder;
