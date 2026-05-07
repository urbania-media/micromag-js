import tinycolor from 'tinycolor2';

import { Color } from '../types';

const getContrastingColor = (backgroundColor: Color | null) => {
    const { color = 'white' } = backgroundColor || {};
    if (tinycolor.equals(color, tinycolor('white'))) {
        return '#A13DFF';
    }
    if (tinycolor.equals(color, tinycolor('black'))) {
        return 'white';
    }
    return tinycolor(color).spin(30).toString();
};

export default getContrastingColor;
