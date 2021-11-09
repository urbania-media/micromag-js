import getColorAsString from './getColorAsString';
import getStyleFromColor from './getStyleFromColor';

const getStyleFromHighlight = (value) => {
    if (value == null) {
        return null;
    }
    const { textColor = null, color = null } = value;
    const colorString = color !== null ? getColorAsString(color) : null;
    const boxShadow =
        colorString !== null
            ? `0.05em 0px 0px ${colorString}, -0.05em 0px 0px ${colorString}`
            : null;
    return color !== null || textColor !== null
        ? {
              ...(color !== null ? getStyleFromColor(color, 'backgroundColor') : null),
              ...(textColor !== null ? getStyleFromColor(textColor, 'color') : null),
              ...(color !== null
                  ? {
                        boxShadow,
                        mozBoxShadow: boxShadow,
                        msBoxShadow: boxShadow,
                        webkitBoxShadow: boxShadow,
                    }
                  : null),
          }
        : null;
};

export default getStyleFromHighlight;
