import getColorAsString from './getColorAsString';
import getShadowCoords from './getShadowCoords';

const getStyleFromShadow = (value) => {
    if (value == null) {
        return null;
    }
    const {
        shadowAngle = null,
        shadowDistance = null,
        shadowBlur = null,
        shadowColor = null
    } = value || {};

    if (!shadowAngle) return null;

    const blur = shadowBlur || '0';
    const color = getColorAsString(shadowColor) || '#000000';
    const {x, y} = getShadowCoords(shadowAngle, shadowDistance);
    const boxShadow = `${x}px ${y}px ${blur}px 0 ${color}`;

    return {
        boxShadow
    };
};

export default getStyleFromShadow;
