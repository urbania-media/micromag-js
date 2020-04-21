/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextVideoScreen from '../TextVideoScreen';

const propTypes = {
    box: MicromagPropTypes.boxElement,
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
    return <TextVideoScreen box={box} reverse={reverse} {...otherProps} />;
};

TextVideoCenterReverse.propTypes = propTypes;
TextVideoCenterReverse.defaultProps = defaultProps;

export default TextVideoCenterReverse;
