/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextImageScreen from '../TextImageScreen';

const propTypes = {
    box: MicromagPropTypes.boxElement,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'top',
    },
};

const TextImageTop = ({ box, ...otherProps }) => {
    return <TextImageScreen box={box} {...otherProps} />;
};

TextImageTop.propTypes = propTypes;
TextImageTop.defaultProps = defaultProps;

export default TextImageTop;
