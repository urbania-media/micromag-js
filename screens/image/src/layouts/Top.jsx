/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import ImageComponent from '../ImageComponent';

const propTypes = {
    box: PropTypes.shape({
        direction: MicromagPropTypes.flexDirection,
    }),
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'top',
    },
};

const ImageTop = ({ box, ...otherProps }) => {
    return <ImageComponent box={box} {...otherProps} />;
};

ImageTop.propTypes = propTypes;
ImageTop.defaultProps = defaultProps;

export default ImageTop;
