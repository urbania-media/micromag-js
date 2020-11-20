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
        align = null,
        color = null,
    } = value;
    const { italic = false, bold = false, underline = false, transform: textTransform } = fontStyle || {};
    return {
        fontFamily: getFontFamilyFromFont(fontFamily),
        fontSize,
        fontStyle: italic ? 'italic' : null,
        fontWeight: bold ? 'bold' : null,
        textDecoration: underline ? 'underline' : null,
        textTransform,
        textAlign: align,
        lineHeight,
        letterSpacing,
        ...getStyleFromColor(color, 'color'),
    };
};

export default getStyleFromText;
