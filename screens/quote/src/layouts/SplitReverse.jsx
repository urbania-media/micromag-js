/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import QuoteSplitComponent from '../QuoteSplitComponent';

const propTypes = {
    box: PropTypes.shape({
        direction: MicromagPropTypes.flexDirection,
    }),
    reverse: PropTypes.bool,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
    reverse: true,
};

const QuoteSplit = ({ box, reverse, ...otherProps }) => {
    return <QuoteSplitComponent box={box} reverse={reverse} {...otherProps} />;
};

QuoteSplit.propTypes = propTypes;
QuoteSplit.defaultProps = defaultProps;

export default QuoteSplit;
