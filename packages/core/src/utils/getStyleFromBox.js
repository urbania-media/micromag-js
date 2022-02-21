import getStyleFromBorder from './getStyleFromBorder';
import getStyleFromColor from './getStyleFromColor';

const getStyleFromBox = (value) => {
    if (value === null) {
        return null;
    }
    const {
        backgroundColor = null,
        borderRadius = null,
        padding,
        borderWidth = null,
        borderStyle = null,
        borderColor = null,
    } = value;

    const border = {
        width: borderWidth,
        style: borderStyle,
        color: borderColor,
    };

    return {
        ...getStyleFromColor(backgroundColor, 'backgroundColor'),
        ...(borderRadius !== null ? { borderRadius } : null),
        ...getStyleFromBorder(border),
        padding,
    };
};

export default getStyleFromBox;
