/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextVideoComponent from '../TextVideoComponent';

const propTypes = {
    box: MicromagPropTypes.box,
    reverse: PropTypes.bool,
};

const defaultProps = {
    box: {
        spacing: 10,
    },
    reverse: false,
};

const TextCenter = ({ box, reverse, ...otherProps }) => {
    return <TextVideoComponent box={box} reverse={reverse} {...otherProps} />;
};

TextCenter.propTypes = propTypes;
TextCenter.defaultProps = defaultProps;

export default TextCenter;
