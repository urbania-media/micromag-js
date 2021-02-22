/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

import Number from './Number';

const propTypes = {
    sizes: PropTypes.arrayOf(PropTypes.number),
};

const defaultProps = {
    sizes: [10, 12, 14, 16, 20, 24, 28, 36, 48],
};

const FontSize = ({ sizes, ...props }) => <Number {...props} dataList={sizes} />;

FontSize.propTypes = propTypes;
FontSize.defaultProps = defaultProps;
FontSize.isHorizontal = true;

export default FontSize;
