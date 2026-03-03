/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';

import SliderField from './Slider';

interface SliderPixelFieldProps {
    unit?: string;
    withInput?: boolean;
}

function SliderPixelField({
    unit: unit = 'px',
    withInput: withInput = true,
    ...props
}: SliderPixelFieldProps) {
    return <SliderField {...props} />;
}

export default SliderPixelField;
