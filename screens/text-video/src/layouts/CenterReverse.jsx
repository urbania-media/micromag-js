/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextVideoComponent from '../TextVideoComponent';

const propTypes = {
    box: MicromagPropTypes.boxComponent,
    reverse: PropTypes.bool,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
    reverse: true,
};

const TextVideoCenterReverse = ({ box, reverse, ...otherProps }) => {
    return <TextVideoComponent box={box} reverse={reverse} {...otherProps} />;
};

TextVideoCenterReverse.propTypes = propTypes;
TextVideoCenterReverse.defaultProps = defaultProps;

export default TextVideoCenterReverse;
