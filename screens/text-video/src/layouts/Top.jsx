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
        direction: null,
        axisAlign: 'top',
        crossAlign: null,
        spacing: 10,
    },
    reverse: false,
};

const TextTop = ({ box, reverse, ...otherProps }) => {
    return <TextVideoComponent box={box} reverse={reverse} {...otherProps} />;
};

TextTop.propTypes = propTypes;
TextTop.defaultProps = defaultProps;

export default TextTop;
