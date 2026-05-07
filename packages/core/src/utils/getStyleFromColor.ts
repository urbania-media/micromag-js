import { Color } from '../types';
import getColorAsString from './getColorAsString';

const getStyleFromColor = (
    value: Color | null = null,
    property = 'backgroundColor',
    overideAlpha = null,
) => {
    const color = getColorAsString(value, overideAlpha);
    return color !== null
        ? {
              [property]: color,
          }
        : null;
};

export default getStyleFromColor;
