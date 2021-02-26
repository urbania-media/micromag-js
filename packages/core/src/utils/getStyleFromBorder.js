import getStyleFromColor from './getStyleFromColor';

const getStyleFromBorder = (value) => {
    if (value == null) {
        return null;
    }
    const { width = null, style = null, color = null } = value;
    const colorProcessed = getStyleFromColor(color, 'color');

    const validBorder = width !== null && style !== null && color !== null && colorProcessed;

    return {
        border: validBorder
            ? `${width !== null ? `${width}px` : ''} ${style !== null ? style : ''} ${
                  colorProcessed ? colorProcessed.color : ''
              }`
            : null,
    };
};

export default getStyleFromBorder;
