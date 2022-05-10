import getColorAsString from './getColorAsString';

const getStyleFromShadow = (value) => {
    if (value == null) {
        return null;
    }
    const {
        shadowDistance = null,
        shadowBlur = null,
        shadowColor = null,
    } = value;
    const color = getColorAsString(shadowColor);
    const boxShadow = `${shadowDistance}px ${shadowDistance}px ${shadowBlur}px 0 ${color}`;

    return {
        boxShadow
    };
};

export default getStyleFromShadow;
