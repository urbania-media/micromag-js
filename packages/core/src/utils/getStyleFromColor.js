import getColorAsString from './getColorAsString';

const getStyleFromColor = (value = null, property = 'backgroundColor', overideAlpha = null) =>
    value !== null
        ? {
              [property]: getColorAsString(value, overideAlpha),
          }
        : null;

export default getStyleFromColor;
