import getColorAsString from './getColorAsString';
import getShadowCoords from './getShadowCoords';

const getStyleFromShadow = (value) => {
    if (value == null) {
        return null;
    }
    const {
        shadowAngle = 0,
        shadowDistance = 5,
        shadowBlur = 0,
        shadowColor = '#000000',
    } = value || {};
    const color = getColorAsString(shadowColor);
    const {x, y} = getShadowCoords(shadowAngle, shadowDistance);
    const boxShadow = `${x}px ${y}px ${shadowBlur}px 0 ${color}`;

    return {
        boxShadow
    };
};

export default getStyleFromShadow;
