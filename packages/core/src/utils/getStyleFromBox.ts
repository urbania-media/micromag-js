import isObject from 'lodash/isObject';
import getStyleFromBorder from './getStyleFromBorder';
import getStyleFromColor from './getStyleFromColor';
import getStyleFromShadow from './getStyleFromShadow';

// @todo hmm, gotta find a better way to handle this
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
        shadowAngle = null,
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
        shadowAngle,
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

    const basePadding = padding || paddingValue;
    const hasBasePadding = basePadding !== null;
    const topVal = paddingTop || paddingValueTop;
    const rightVal = paddingRight || paddingValueRight;
    const bottomVal = paddingBottom || paddingValueBottom;
    const leftVal = paddingLeft || paddingValueLeft;
    const hasAnyIndividual =
        topVal !== null || rightVal !== null || bottomVal !== null || leftVal !== null;

    // Avoid mixing shorthand `padding` with longhand `paddingTop`/etc — React warns about this
    const paddingStyles =
        hasBasePadding && hasAnyIndividual
            ? {
                  paddingTop: topVal ?? basePadding,
                  paddingRight: rightVal ?? basePadding,
                  paddingBottom: bottomVal ?? basePadding,
                  paddingLeft: leftVal ?? basePadding,
              }
            : {
                  ...(hasBasePadding ? { padding: basePadding } : null),
                  ...(topVal !== null ? { paddingTop: topVal } : null),
                  ...(rightVal !== null ? { paddingRight: rightVal } : null),
                  ...(bottomVal !== null ? { paddingBottom: bottomVal } : null),
                  ...(leftVal !== null ? { paddingLeft: leftVal } : null),
              };

    return {
        ...getStyleFromColor(backgroundColor, 'backgroundColor'),
        ...(borderRadius !== null ? { borderRadius } : null),
        ...getStyleFromBorder(border),
        ...getStyleFromShadow(shadow),
        ...paddingStyles,
    };
};

export default getStyleFromBox;
