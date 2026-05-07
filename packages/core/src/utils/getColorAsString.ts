import isString from 'lodash/isString';
import tinycolor from 'tinycolor2';

import { Color } from '../types';

const getColorAsString = (value: Color | null = null, overideAlpha = null) => {
    if (value === null) {
        return null;
    }
    const { color = null, alpha = null } = isString(value) ? { color: value } : value;
    return alpha !== null || overideAlpha !== null
        ? tinycolor(color)
              .setAlpha(overideAlpha !== null ? overideAlpha : alpha)
              .toRgbString()
        : color;
};

export default getColorAsString;
