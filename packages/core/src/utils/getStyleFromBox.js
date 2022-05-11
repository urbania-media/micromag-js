import isObject from 'lodash/isObject';
import getStyleFromBorder from './getStyleFromBorder';
import getStyleFromColor from './getStyleFromColor';
import getStyleFromShadow from './getStyleFromShadow';

const getStyleFromBox = (value) => {
    if (value === null) {
        return null;
    }
    const {
        backgroundColor = null,
        borderRadius = null,
        padding = null,
        paddingTop = null,
        paddingRight = null,
        paddingBottom = null,
        paddingLeft = null,
        borderWidth = null,
        borderStyle = null,
        borderColor = null,
        shadowDistance = null,
        shadowBlur = null,
        shadowColor = null,
    } = value;

    const border = {
        width: borderWidth,
        style: borderStyle,
        color: borderColor,
    };

    const shadow = {
        shadowDistance,
        shadowBlur,
        shadowColor,
    };

    const {
        top: paddingValueTop = null,
        right: paddingValueRight = null,
        bottom: paddingValueBottom = null,
        left: paddingValueLeft = null,
        padding: paddingValue = null,
    } = isObject(padding) ? padding : { padding };

    return {
        ...getStyleFromColor(backgroundColor, 'backgroundColor'),
        ...(borderRadius !== null ? { borderRadius } : null),
        ...getStyleFromBorder(border),
        ...getStyleFromShadow(shadow),
        ...(padding !== null || paddingValue !== null
            ? { padding: padding || paddingValue }
            : null),
        ...(paddingTop !== null || paddingValueTop !== null
            ? { paddingTop: paddingTop || paddingValueTop }
            : null),
        ...(paddingRight !== null || paddingValueRight != null
            ? { paddingRight: paddingRight || paddingValueRight }
            : null),
        ...(paddingBottom !== null || paddingValueBottom !== null
            ? { paddingBottom: paddingBottom || paddingValueBottom }
            : null),
        ...(paddingLeft !== null || paddingValueLeft !== null
            ? { paddingLeft: paddingLeft || paddingValueLeft }
            : null),
    };
};

export default getStyleFromBox;
