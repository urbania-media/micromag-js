import getStyleFromColor from './getStyleFromColor';

const getStyleFromLink = (value) => {
    if (value == null) {
        return null;
    }
    const { color = null, fontStyle } = value;
    const { italic = false, bold = false, underline = false } = fontStyle || {};
    return {
        ...(color !== null ? getStyleFromColor(color, 'color') : null),
        ...(italic ? { fontStyle: 'italic' } : null),
        ...(bold ? { fontWeight: 'bold' } : null),
        ...(underline ? { textDecoration: 'underline' } : null),
    };
};

export default getStyleFromLink;
