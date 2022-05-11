import getColorAsString from './getColorAsString';

const getStyleFromShadow = (value) => {
    if (value == null) {
        return null;
    }
    const {
        shadowHorizontalOffset = 0,
        shadowVerticalOffset = 0,
        shadowBlur = 0,
        shadowColor = '#000000',
    } = value || {};
    const color = getColorAsString(shadowColor);
    const boxShadow = `${shadowHorizontalOffset}px ${shadowVerticalOffset}px ${shadowBlur}px 0 ${color}`;

    return {
        boxShadow
    };
};

export default getStyleFromShadow;
