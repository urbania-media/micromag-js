/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextImageScreen from '../TextImageScreen';

const propTypes = {
    box: MicromagPropTypes.boxComponent,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
};

const TextImageCenter = ({ box, ...otherProps }) => {
    return <TextImageScreen box={box} {...otherProps} />;
};

TextImageCenter.propTypes = propTypes;
TextImageCenter.defaultProps = defaultProps;

export default TextImageCenter;
