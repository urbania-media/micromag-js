/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextVideoScreen from '../TextVideoScreen';

const propTypes = {
    box: MicromagPropTypes.boxComponent,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'top',
    },
};

const TextTop = ({ box, ...otherProps }) => {
    return <TextVideoScreen box={box} {...otherProps} />;
};

TextTop.propTypes = propTypes;
TextTop.defaultProps = defaultProps;

export default TextTop;
