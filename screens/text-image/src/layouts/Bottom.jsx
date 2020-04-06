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
        axisAlign: 'bottom',
    },
};

const TextImageBottom = ({ box, ...otherProps }) => {
    return <TextImageComponent box={box} {...otherProps} />;
};

TextImageBottom.propTypes = propTypes;
TextImageBottom.defaultProps = defaultProps;

export default TextImageBottom;
