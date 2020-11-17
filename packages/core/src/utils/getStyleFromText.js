import getStyleFromColor from './getStyleFromColor';

const getStyleFromText = value => {
    if (value == null) {
        return null;
    }
    const {
        fontFamily = null,
        fontSize = null,
        fontStyle = null,
        lineHeight = null,
        letterSpacing = null,
        uppercase = false,
        color = null,        
    } = value;
    const { italic = false, bold = false, underline = false, align = null } = fontStyle || {};
    return {
        fontFamily,
        fontSize,
        fontStyle: italic ? 'italic' : null,
        fontWeight: bold ? 'bold' : null,
        textDecoration: underline ? 'underline' : null,
        textAlign: align,
        lineHeight,
        letterSpacing,
        textTransform: uppercase ? 'uppercase' : null,
        ...getStyleFromColor(color, 'color'),
    };
};

export default getStyleFromText;
