import isObject from 'lodash/isObject';
import getStyleFromBorder from './getStyleFromBorder';
import getStyleFromColor from './getStyleFromColor';

const getStyleFromBox = (value) => {
    if (value === null) {
        return null;
    }
    const {
        backgroundColor = null,
        borderRadius = null,
        padding: paddingValue = null,
        borderWidth = null,
        borderStyle = null,
        borderColor = null,
    } = value;

    const border = {
        width: borderWidth,
        style: borderStyle,
        color: borderColor,
    };

    const {
        top: paddingTop = null,
        right: paddingRight = null,
        bottom: paddingBottom = null,
        left: paddingLeft = null,
        padding = null,
    } = isObject(paddingValue) ? paddingValue : { padding: paddingValue };

    return {
        ...getStyleFromColor(backgroundColor, 'backgroundColor'),
        ...(borderRadius !== null ? { borderRadius } : null),
        ...getStyleFromBorder(border),
        ...(padding !== null ? { padding } : null),
        ...(paddingTop !== null ? { paddingTop } : null),
        ...(paddingRight !== null ? { paddingRight } : null),
        ...(paddingBottom !== null ? { paddingBottom } : null),
        ...(paddingLeft !== null ? { paddingLeft } : null),
    };
};

export default getStyleFromBox;
