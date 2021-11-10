import getColorAsString from './getColorAsString';

const getStyleFromColor = (value = null, property = 'backgroundColor', overideAlpha = null) => {
    const color = getColorAsString(value, overideAlpha);
    return color !== null
        ? {
              [property]: color,
          }
        : null;
};

export default getStyleFromColor;
