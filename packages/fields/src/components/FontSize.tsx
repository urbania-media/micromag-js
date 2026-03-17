/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';

import Number from './Number';

interface FontSizeProps {
    sizes?: number[];
}

const defaultFontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 48];

function FontSize({ sizes = defaultFontSizes, ...props }: FontSizeProps) {
    return <Number {...props} dataList={sizes} />;
}

FontSize.isHorizontal = true;

export default FontSize;
