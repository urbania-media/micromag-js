/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextImageScreen from '../TextImageScreen';

const propTypes = {
    box: MicromagPropTypes.box,
    reverse: PropTypes.bool,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'bottom',
    },
    reverse: true,
};

const TextImageBottomReverse = ({ box, reverse, ...otherProps }) => {
    return <TextImageScreen box={box} reverse={reverse} {...otherProps} />;
};

TextImageBottomReverse.propTypes = propTypes;
TextImageBottomReverse.defaultProps = defaultProps;

export default TextImageBottomReverse;
