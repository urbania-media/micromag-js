export default function getShadowCoords(angle, distance) {
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
}
