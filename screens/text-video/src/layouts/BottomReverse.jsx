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
        axisAlign: 'bottom',
    },
    reverse: true,
};

const TextVideoBottomReverse = ({ box, reverse, ...otherProps }) => {
    return <TextVideoScreen box={box} reverse={reverse} {...otherProps} />;
};

TextVideoBottomReverse.propTypes = propTypes;
TextVideoBottomReverse.defaultProps = defaultProps;

export default TextVideoBottomReverse;
