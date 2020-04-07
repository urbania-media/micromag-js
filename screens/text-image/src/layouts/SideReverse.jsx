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
        direction: 'row',
        axisAlign: 'center',
        reverse: true,
    },
};

const TextImageSideReverse = ({ box, ...otherProps }) => {
    return <TextImageComponent box={box} {...otherProps} />;
};

TextImageSideReverse.propTypes = propTypes;
TextImageSideReverse.defaultProps = defaultProps;

export default TextImageSideReverse;
