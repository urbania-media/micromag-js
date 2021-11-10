import getColorAsString from './getColorAsString';
import getFontFamilyFromFont from './getFontFamilyFromFont';
import getStyleFromColor from './getStyleFromColor';

const getStyleFromText = (value) => {
    if (value == null) {
        return null;
    }
    const {
        fontFamily = null,
        fontSize = null,
        fontStyle = null,
        lineHeight = null,
        letterSpacing = null,
        align: textAlign = null,
        color = null,
    } = value;
    const {
        italic = false,
        bold = false,
        underline = false,
        transform: textTransform,
        outline = false,
    } = fontStyle || {};
    return {
        fontFamily: getFontFamilyFromFont(fontFamily),
        ...(fontSize !== null ? { fontSize } : null),
        ...(italic ? { fontStyle: 'italic' } : null),
        ...(bold ? { fontWeight: 'bold' } : null),
        ...(underline ? { textDecoration: 'underline' } : null),
        ...(textTransform !== null ? { textTransform } : null),
        ...(textAlign !== null ? { textAlign } : null),
        ...(lineHeight !== null ? { lineHeight } : null),
        ...(letterSpacing !== null ? { letterSpacing } : null),
        ...getStyleFromColor(color, 'color'),
        ...(outline
            ? {
                  WebkitTextStroke: `2px ${getColorAsString(color, 'color')}`,
                  color: 'transparent',
              }
            : null),
    };
};

export default getStyleFromText;
