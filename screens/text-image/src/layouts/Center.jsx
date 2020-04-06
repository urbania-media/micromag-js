/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextImageComponent from '../TextImageComponent';

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
    return <TextImageComponent box={box} {...otherProps} />;
};

TextImageCenter.propTypes = propTypes;
TextImageCenter.defaultProps = defaultProps;

export default TextImageCenter;
