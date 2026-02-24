/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';

import Number from './Number';

const propTypes = {
    sizes: PropTypes.arrayOf(PropTypes.number),
};

const FontSize = ({ sizes = [12, 14, 16, 18, 20, 24, 28, 32, 48], ...props }) => <Number {...props} dataList={sizes} />;

FontSize.propTypes = propTypes;
FontSize.isHorizontal = true;

export default FontSize;
