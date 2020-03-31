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
        axisAlign: 'bottom',
        crossAlign: null,
        spacing: 10,
    },
    reverse: false,
};

const TextBottom = ({ box, reverse, ...otherProps }) => {
    return <TextVideoComponent box={box} reverse={reverse} {...otherProps} />;
};

TextBottom.propTypes = propTypes;
TextBottom.defaultProps = defaultProps;

export default TextBottom;
