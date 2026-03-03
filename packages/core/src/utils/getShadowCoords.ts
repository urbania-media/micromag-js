export default function getShadowCoords(angle, distance) {
    const x = (Math.cos(angle) * distance).toFixed(3);
    const y = (Math.sin(angle) * distance).toFixed(3);

    return { x, y };
}
