import getStyleFromColor from './getStyleFromColor';

const getStyleFromImage = (value) => {
    if (value == null) {
        return null;
    }
    const { fit = {}, backgroundColor = null } = value;
    const { size = null, position = {} } = fit;
    const { axisAlign = null, crossAlign = null } = position;

    return {
        ...(size !== null ? { objectFit: size } : null),
        ...(axisAlign !== null && crossAlign !== null
            ? { objectPosition: `${axisAlign} ${crossAlign}` }
            : null),
        ...getStyleFromColor(backgroundColor, 'backgroundColor'),
    };
};

export default getStyleFromImage;
