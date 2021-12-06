import getStyleFromBorder from './getStyleFromBorder';
import getStyleFromColor from './getStyleFromColor';

const getStyleFromButton = (value) => {
    if (value === null) {
        return null;
    }
    const {
        backgroundColor = null,
        borderRadius = null,
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
    };
};

export default getStyleFromButton;
