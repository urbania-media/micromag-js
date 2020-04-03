/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextImageComponent from '../TextImageComponent';

const propTypes = {
    box: MicromagPropTypes.boxComponent,
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
    return <TextImageComponent box={box} reverse={reverse} {...otherProps} />;
};

TextImageTopReverse.propTypes = propTypes;
TextImageTopReverse.defaultProps = defaultProps;

export default TextImageTopReverse;
