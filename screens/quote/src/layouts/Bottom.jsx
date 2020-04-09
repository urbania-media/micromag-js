/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import QuoteScreen from '../QuoteScreen';

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

const QuoteBottom = ({ box, ...otherProps }) => {
    return <QuoteScreen box={box} {...otherProps} />;
};

QuoteBottom.propTypes = propTypes;
QuoteBottom.defaultProps = defaultProps;

export default QuoteBottom;
