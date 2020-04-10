/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import ImageScreen from '../ImageScreen';

const propTypes = {
    box: PropTypes.shape({
        direction: MicromagPropTypes.flexDirection,
    }),
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'bottom',
    },
};

const ImageBottom = ({ box, ...otherProps }) => {
    return <ImageScreen box={box} {...otherProps} />;
};

ImageBottom.propTypes = propTypes;
ImageBottom.defaultProps = defaultProps;

export default ImageBottom;
