/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextVideoScreen from '../TextVideoScreen';

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

const TextVideoTopReverse = ({ box, reverse, ...otherProps }) => {
    return <TextVideoScreen box={box} reverse={reverse} {...otherProps} />;
};

TextVideoTopReverse.propTypes = propTypes;
TextVideoTopReverse.defaultProps = defaultProps;

export default TextVideoTopReverse;
