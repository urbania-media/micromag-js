const getStyleFromFont = value => {
    if (value == null) {
        return null;
    }
    const {
        name = null,
        size = null,
        style = null,
        lineHeight = null,
        letterSpacing = null,
    } = value;
    const { italic = false, bold = false, underline = false, align = null } = style || {};
    return {
        fontFamily: name,
        fontSize: size,
        fontStyle: italic ? 'italic' : null,
        fontWeight: bold ? 'bold' : null,
        textDecoration: underline ? 'underline' : null,
        textAlign: align,
        lineHeight,
        letterSpacing,
    };
};


export default getStyleFromFont;
