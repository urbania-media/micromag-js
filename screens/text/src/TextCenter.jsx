/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextComponent from './TextComponent';

const propTypes = {
    box: MicromagPropTypes.box,
};

const defaultProps = {
    box: {
        spacing: 10,
    },
};

const TextCenter = ({ box, ...otherProps }) => {
    return <TextComponent box={box} {...otherProps} />;
};

TextCenter.propTypes = propTypes;
TextCenter.defaultProps = defaultProps;

export default TextCenter;
