/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextImageComponent from '../TextImageComponent';

const propTypes = {
    box: MicromagPropTypes.boxComponent,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'top',
    },
};

const TextImageTop = ({ box, ...otherProps }) => {
    return <TextImageComponent box={box} {...otherProps} />;
};

TextImageTop.propTypes = propTypes;
TextImageTop.defaultProps = defaultProps;

export default TextImageTop;
