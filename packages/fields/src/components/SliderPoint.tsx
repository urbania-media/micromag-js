/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';

import SliderField from './Slider';

interface SliderPointFieldProps {
    unit?: string;
    withInput?: boolean;
}

function SliderPointField({ unit: unit = 'pt', withInput: withInput = true, ...props }) {
    return <SliderField {...props} />;
}

export default SliderPointField;
