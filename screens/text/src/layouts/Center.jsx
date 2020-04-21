/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextScreen from '../TextScreen';

const propTypes = {
    box: MicromagPropTypes.boxElement,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
};

const TextCenter = ({ box, ...otherProps }) => {
    return <TextScreen box={box} {...otherProps} />;
};

TextCenter.propTypes = propTypes;
TextCenter.defaultProps = defaultProps;

export default TextCenter;
