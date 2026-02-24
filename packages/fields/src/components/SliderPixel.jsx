/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import SliderField from './Slider';

const propTypes = {
    unit: PropTypes.string,
    withInput: PropTypes.bool,
};

const SliderPixelField = (
    {
        unit: unit = 'px',
        withInput: withInput = true,
        ...props
    },
) => <SliderField {...props} />;

SliderPixelField.propTypes = propTypes;

export default SliderPixelField;
