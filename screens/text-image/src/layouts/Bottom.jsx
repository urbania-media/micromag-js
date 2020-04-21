/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextImageScreen from '../TextImageScreen';

const propTypes = {
    box: MicromagPropTypes.boxElement,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'bottom',
    },
};

const TextImageBottom = ({ box, ...otherProps }) => {
    return <TextImageScreen box={box} {...otherProps} />;
};

TextImageBottom.propTypes = propTypes;
TextImageBottom.defaultProps = defaultProps;

export default TextImageBottom;
