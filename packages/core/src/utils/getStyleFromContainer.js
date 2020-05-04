import getStyleFromColor from './getStyleFromColor';

const getStyleFromContainer = value => {
    if (value == null) {
        return null;
    }
    const { size = {}, backgroundColor = null } = value;
    const { width = null, height = null } = size;

    return {
        // DO NOT OVERRIDE
        ...(width ? { width: `${width}%` } : null),
        ...(height ? { height: `${height}%` } : null),
        ...getStyleFromColor(backgroundColor, 'backgroundColor'),
    };
};

export default getStyleFromContainer;
