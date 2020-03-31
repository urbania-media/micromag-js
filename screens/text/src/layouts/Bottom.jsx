/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextComponent from '../TextComponent';

const propTypes = {
    box: MicromagPropTypes.box,
};

const defaultProps = {
    box: {
        direction: null,
        axisAlign: 'bottom',
        crossAlign: null,
        spacing: 10,
    },
};

const TextBottom = ({ box, ...otherProps }) => {
    return <TextComponent box={box} {...otherProps} />;
};

TextBottom.propTypes = propTypes;
TextBottom.defaultProps = defaultProps;

export default TextBottom;
