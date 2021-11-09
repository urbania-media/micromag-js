import getStyleFromColor from './getStyleFromColor';

const getStyleFromLink = (value) => {
    if (value == null) {
        return null;
    }
    const { color = null, fontStyle } = value;
    const { italic = false, bold = false, underline = false } = fontStyle || {};
    return {
        ...(color !== null ? getStyleFromColor(color, 'color') : null),
        fontStyle: italic ? 'italic' : null,
        fontWeight: bold ? 'bold' : null,
        textDecoration: underline ? 'underline' : null,
    };
};

export default getStyleFromLink;
