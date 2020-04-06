/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextVideoComponent from '../TextVideoComponent';

const propTypes = {
    box: MicromagPropTypes.boxComponent,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
};

const TextCenter = ({ box, ...otherProps }) => {
    return <TextVideoComponent box={box} {...otherProps} />;
};

TextCenter.propTypes = propTypes;
TextCenter.defaultProps = defaultProps;

export default TextCenter;
