/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import SliderField from './Slider';

const propTypes = {
    unit: PropTypes.string,
    withInput: PropTypes.bool,
};

const defaultProps = {
    unit: '%',
    withInput: true,
};

const SliderPixelField = props => <SliderField {...props} />;

SliderPixelField.propTypes = propTypes;
SliderPixelField.defaultProps = defaultProps;

export default SliderPixelField;
