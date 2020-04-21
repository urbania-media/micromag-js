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
        direction: 'row',
        axisAlign: 'center',
    },
};

const TextImageSide = ({ box, ...otherProps }) => {
    return <TextImageScreen box={box} {...otherProps} />;
};

TextImageSide.propTypes = propTypes;
TextImageSide.defaultProps = defaultProps;

export default TextImageSide;
