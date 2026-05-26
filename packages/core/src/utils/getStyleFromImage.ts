import getStyleFromColor from './getStyleFromColor';

const getStyleFromImage = (value) => {
    if (value == null) {
        return null;
    }
    const { fit = {}, backgroundColor = null } = value;
    const { size = null, position = {} } = fit;
    const { vertical = null, horizontal = null } = position;

    return {
        ...(size !== null ? { objectFit: size } : null),
        ...(vertical !== null || horizontal !== null
            ? { objectPosition: [vertical, horizontal].filter((it) => it !== null).join(' ') }
            : null),
        ...getStyleFromColor(backgroundColor, 'backgroundColor'),
    };
};

export default getStyleFromImage;
