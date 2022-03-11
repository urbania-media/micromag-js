import tinycolor from 'tinycolor2';

const getContrastingColor = (backgroundColor) => {
    const { color = 'white' } = backgroundColor || {};
    if (tinycolor.equals(color, tinycolor('white'))) {
        return 'lightblue';
    }
    if (tinycolor.equals(color, tinycolor('black'))) {
        return 'white';
    }
    return tinycolor(color).spin(30).toString();
};

export default getContrastingColor;
