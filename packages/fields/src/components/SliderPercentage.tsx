/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import SliderField from './Slider';

interface SliderPixelFieldProps {
    unit?: string;
    withInput?: boolean;
}

const SliderPixelField = (
    {
        unit: unit = '%',
        withInput: withInput = true,
        ...props
    },
) => <SliderField {...props} />;

export default SliderPixelField;
