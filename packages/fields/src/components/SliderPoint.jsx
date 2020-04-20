/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import SliderField from './Slider';

const propTypes = {
    unit: PropTypes.string,
    withInput: PropTypes.bool,
};

const defaultProps = {
    unit: 'pt',
    withInput: true,
};

const SliderPointField = props => <SliderField {...props} />;

SliderPointField.propTypes = propTypes;
SliderPointField.defaultProps = defaultProps;

export default SliderPointField;
