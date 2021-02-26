import tinycolor from 'tinycolor2';
import isString from 'lodash/isString';

const getStyleFromColor = (value, property = 'backgroundColor', overideAlpha = null) => {
    if (value === null || typeof value === 'undefined') {
        return null;
    }
    const { color = null, alpha = null } = isString(value) ? { color: value } : value;
    return {
        [property]:
            alpha !== null || overideAlpha !== null
                ? tinycolor(color)
                      .setAlpha(overideAlpha !== null ? overideAlpha : alpha)
                      .toRgbString()
                : color,
    };
};

export default getStyleFromColor;
