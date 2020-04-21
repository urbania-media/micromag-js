/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextImageScreen from '../TextImageScreen';

const propTypes = {
    box: MicromagPropTypes.boxElement,
    reverse: PropTypes.bool,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'top',
    },
    reverse: true,
};

const TextImageTopReverse = ({ box, reverse, ...otherProps }) => {
    return <TextImageScreen box={box} reverse={reverse} {...otherProps} />;
};

TextImageTopReverse.propTypes = propTypes;
TextImageTopReverse.defaultProps = defaultProps;

export default TextImageTopReverse;
