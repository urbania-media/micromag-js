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
        axisAlign: 'top',
        crossAlign: null,
        spacing: 10,
    },
};

const TextTop = ({ box, ...otherProps }) => {
    return <TextComponent box={box} {...otherProps} />;
};

TextTop.propTypes = propTypes;
TextTop.defaultProps = defaultProps;

export default TextTop;
